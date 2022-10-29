import { captureException } from '@sentry/nextjs'
import formatFilm from '@lib/format-film'
import supabase from '@lib/supabase-client'

export default async function handler(req, res) {
    const { endYear, query, startYear } = req.query
    const cleanQuery =
        query.trim() !== '' ? `${query.trim().replace(/ /g, '+')}:*` : ''

    const { data, error } = await supabase
        .rpc('lp_search', {
            query: cleanQuery,
        })
        .gte('newyear', startYear)
        .lte('newyear', endYear)

    if (error) {
        captureException(error)
        throw error
    }

    const formattedData = data.map(item => formatFilm(item))

    res.status(200).json(formattedData)
}
