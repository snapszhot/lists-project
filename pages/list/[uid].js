import { getAllLists, getSingleList } from '@lib/prismic'

import { Poll } from '@components/views'

export default function HomePage(props) {
    return <Poll {...props} />
}

export async function getStaticProps({ params, preview = false }) {
    const list = await getSingleList(preview, params.uid)

    return {
        props: {
            ...list,
            preview,
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
