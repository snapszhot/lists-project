import { captureException } from '@sentry/nextjs'
import { getAllLists, getSingleList } from '@lib/prismic'
import { ListDashboard } from '@components/views'

export default function ListDashboardPage(props) {
    return <ListDashboard {...props} />
}

export async function getStaticProps({ params, preview = false }) {
    try {
        const list = await getSingleList(preview, params.uid)

        return {
            props: {
                ...list,
                preview,
                uid: params.uid,
            },
            revalidate: 60,
        }
    } catch (error) {
        captureException(error)

        return {
            notFound: true,
        }
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
        fallback: 'blocking',
    }
}
