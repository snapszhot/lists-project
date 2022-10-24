import { serialize } from 'cookie'
import supabase from '@lib/supabase-client'

export default async function handler(req, res) {
    try {
        const { poll_id, username, votes } = req.body
        const { data, error: ballotError } = await supabase
            .from('lp_votes')
            .insert([
                {
                    poll_id,
                    username,
                },
            ])
            .select()

        if (ballotError) {
            throw ballotError
        }

        const listId = `list-${poll_id}`
        const uid = data[0].id
        const votesToInsert = votes.map((vote, index) => {
            return {
                film_id: vote.id,
                rank: index + 1,
                vote_id: uid,
            }
        })

        const { error: itemError } = await supabase
            .from('lp_vote_item')
            .insert(votesToInsert)

        if (itemError) {
            throw itemError
        }

        res.setHeader(
            'set-cookie',
            serialize(listId, String(uid), {
                httpOnly: true,
                sameSite: true,
                path: '/',
            })
        )
        res.status(200).json({ message: 'Success!' })
    } catch (error) {
        console.log('Error adding vote to Lists Project', error) // eslint-disable-line no-console

        res.status(500).json({ error: 'Error recording vote' })
    }
}
