import { captureException } from '@sentry/nextjs'
import { serialize } from 'cookie'
import supabase from '@lib/supabase-client'

async function createBallot(ballot) {
    const { data, error } = await supabase
        .from('lp_ballots')
        .insert(ballot)
        .select()

    if (error) {
        throw error
    }

    return data[0].id
}

async function updateBallot(ballotUid) {
    const { error } = await supabase
        .from('lp_ballots')
        .update({ updated_at: new Date() })
        .eq('id', ballotUid)

    if (error) {
        throw error
    }

    return ballotUid
}

function getBallotItems(items, id) {
    return items.map((item, index) => {
        return {
            film_id: item.id,
            rank: index + 1,
            ballot_id: id,
        }
    })
}

async function createBallotItems(ballot_items, ballotUid) {
    const ballotItems = getBallotItems(ballot_items, ballotUid)

    const { error } = await supabase.from('lp_ballot_item').insert(ballotItems)

    if (error) {
        throw error
    }
}

async function deleteBallotItems(ballotUid) {
    const { error } = await supabase.rpc('delete_ballot_rows', {
        id: ballotUid,
    })

    if (error) {
        throw error
    }
}

async function updateBallotItems(ballot_items, ballotUid) {
    await deleteBallotItems(ballotUid)

    const payload = getBallotItems(ballot_items, ballotUid)

    const { error } = await supabase.rpc('update_ballot_rows', {
        payload,
    })

    if (error) {
        throw error
    }
}

export default async function handler(req, res) {
    try {
        const { ballot_id, ballot_items, poll_id, username } = req.body
        const ballotUid = ballot_id
            ? await updateBallot(ballot_id)
            : await createBallot([
                  {
                      poll_id,
                      username,
                  },
              ])

        if (ballot_id) {
            await updateBallotItems(ballot_items, ballotUid)
        } else {
            await createBallotItems(ballot_items, ballotUid)
        }

        res.setHeader(
            'set-cookie',
            serialize(`list-${poll_id}`, String(ballotUid), {
                httpOnly: true,
                sameSite: true,
                path: '/',
            })
        )
        res.status(200).json({ message: 'Success!' })
    } catch (error) {
        captureException(error)

        res.status(500).json({ error: 'Error recording vote' })
    }
}
