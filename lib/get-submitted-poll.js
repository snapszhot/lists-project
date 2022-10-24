import supabase from '@lib/supabase-client'

export default async function getSubmittedPoll(uid) {
    const { data, error } = await supabase
        .from('lp_vote_item')
        .select('*, prefills ( * )')
        .eq('vote_id', uid)
        .order('rank', { ascending: true })

    if (error) {
        throw error
    }

    const votes = data.map(vote => {
        return {
            ...vote.prefills,
            rank: vote.rank,
        }
    })

    return votes
}
