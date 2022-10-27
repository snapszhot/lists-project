import { getAllLists, getSingleList } from '@lib/prismic'
import { ListDashboard } from '@components/views'

export default function ListDashboardPage(props) {
    return <ListDashboard {...props} />
}

export async function getStaticProps({ params, preview = false }) {
    const list = await getSingleList(preview, params.uid)

    return {
        props: {
            ...list,
            preview,
            uid: params.uid,
        },
        revalidate: 60,
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
