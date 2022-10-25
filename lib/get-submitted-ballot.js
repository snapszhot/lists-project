import formatFilm from '@lib/format-film'
import supabase from '@lib/supabase-client'

export default async function getSubmittedBallot(ballotId) {
    const { data: ballotData, error: ballotError } = await supabase
        .from('lp_ballots')
        .select('*')
        .eq('id', ballotId)
        .limit(1)
        .single()

    const { data: itemData, error: itemError } = await supabase
        .from('lp_ballot_item')
        .select('*, prefills ( * )')
        .eq('ballot_id', ballotId)
        .order('rank', { ascending: true })

    if (ballotError) {
        throw ballotError
    }
    if (itemError) {
        throw itemError
    }

    const votes = itemData.map(vote => {
        const film = formatFilm(vote.prefills)

        return {
            ...film,
            rank: vote.rank,
        }
    })

    return {
        ...ballotData,
        votes,
    }
}
