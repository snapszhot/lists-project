import formatFilm from '@lib/format-film'
import supabase from '@lib/supabase-client'

export default async function getFilmsByYear(startYear, endYear) {
    const { data, error } = await supabase
        .from('prefills_with_years_as_ints')
        .select('*')
        .gte('newyear', startYear)
        .lte('newyear', endYear)

    if (error) {
        throw error
    }

    return data.map(film => formatFilm(film))
}
