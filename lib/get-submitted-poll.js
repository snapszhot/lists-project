import supabase from '@lib/supabase-client'

export default async function getSubmittedPoll(uid) {
    const { data, error } = await supabase
        .from('lp_votes')
        .select('*')
        .eq('id', uid)
        .limit(1)
        .single()

    if (error) {
        throw error
    }

    return data
}
