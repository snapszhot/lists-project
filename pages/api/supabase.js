import supabase from '@lib/supabase-client'

export default async function handler(req, res) {
    try {
        const isPreview =
            req?.cookies?.__next_preview_data != null &&
            req?.cookies?.__prerender_bypass != null

        if (process.env.ENVIRONMENT !== 'development' && !isPreview) {
            const { puzzle_id, won, frame_won } = req.body

            const { error } = await supabase.from('analytics').insert([
                {
                    puzzle_id,
                    won,
                    frame_won,
                },
            ])

            if (error) {
                throw error
            }
        }

        res.status(200).json({ message: 'Success!' })
    } catch (error) {
        console.log(error) // eslint-disable-line no-console

        res.status(500).json({ error: 'Error updating return' })
    }
}
