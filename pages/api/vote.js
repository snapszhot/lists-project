import { serialize } from 'cookie'
import supabase from '@lib/supabase-client'

export default async function handler(req, res) {
    try {
        const { poll_id, username, votes } = req.body
        const { data, error } = await supabase
            .from('votes')
            .insert([
                {
                    poll_id,
                    username,
                    votes,
                },
            ])
            .select()

        if (error) {
            throw error
        }

        const listId = `list-${poll_id}`
        const uid = data[0].id

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

        res.status(500).json({ error: 'Error adding vote' })
    }
}
