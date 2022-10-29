import { captureException } from '@sentry/nextjs'
import { getAllLists, getSingleList } from '@lib/prismic'
import getFilmsByYear from '@lib/get-films-by-year'

import { FilmsOverview } from '@components/views'

export default function FilmsOverviewPage(props) {
    return <FilmsOverview {...props} />
}

export async function getStaticProps({ params, preview = false }) {
    try {
        const list = await getSingleList(preview, params.uid)
        const films = await getFilmsByYear(
            list.start_year,
            list.end_year || list.start_year
        )

        return {
            props: {
                ...list,
                endYear: list.end_year,
                films,
                preview,
                startYear: list.start_year,
            },
            revalidate: 60,
        }
    } catch (error) {
        captureException(error)
        throw error
    }
}

export async function getStaticPaths() {
    const posts = await getAllLists()
    const paths = posts.map(post => {
        return {
            params: {
                uid: post.uid,
            },
        }
    })

    return {
        paths,
        fallback: false,
    }
}
