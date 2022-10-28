import supabase from '@lib/supabase-client'

export default async function getPollResults(poll_id) {
    const { data, error } = await supabase
        .from('lp_ballots')
        .select(
            `*,
            lp_ballot_item(
                *,
                prefills( * )
            )`
        )
        .eq('poll_id', poll_id)

    if (error) {
        throw error
    }

    return data
}
