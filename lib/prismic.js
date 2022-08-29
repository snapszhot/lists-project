import * as prismic from '@prismicio/client'
import formatPrismicPost from '@lib/format-prismic-post'

const endpoint = prismic.getEndpoint(process.env.PRISMIC_REPOSITORY_NAME)

export const Client = ref =>
    prismic.createClient(endpoint, {
        accessToken: process.env.PRISMIC_API_TOKEN,
        ref: ref || '',
    })

export async function getAllMovies(previewData) {
    const results = await Client(previewData?.ref).getAllByType('movie', {
        orderings: {
            field: 'my.movie.day',
            direction: 'asc',
        },
        graphQuery: `{
            movie {
                day
                subtitle
            }
        }`,
    })

    return results
}

export async function getSingleMovie(previewData, day) {
    const predicates = day ? [prismic.predicate.at('my.movie.day', day)] : null

    const { results } = await Client(previewData?.ref).getByType('movie', {
        orderings: {
            field: 'my.movie.day',
            direction: 'desc',
        },
        pageSize: 1,
        page: 1,
        predicates,
    })

    return await formatPrismicPost(results?.[0]?.data)
}
