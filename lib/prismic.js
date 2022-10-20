import * as prismic from '@prismicio/client'

const endpoint = prismic.getEndpoint(process.env.PRISMIC_REPOSITORY_NAME)

export const Client = ref =>
    prismic.createClient(endpoint, {
        accessToken: process.env.PRISMIC_API_TOKEN,
        ref: ref || '',
    })

export async function getAllLists(previewData) {
    const results = await Client(previewData?.ref).getAllByType('list', {
        orderings: {
            field: 'my.list.uid',
            direction: 'asc',
        },
        graphQuery: `{
            list {
                uid
            }
        }`,
    })

    return results
}

export async function getSingleList(previewData, uid) {
    const { results } = await Client(previewData?.ref).getByType('list', {
        pageSize: 1,
        page: 1,
        predicates: [prismic.predicate.at('my.list.uid', uid)],
    })

    return await results?.[0]?.data
}
