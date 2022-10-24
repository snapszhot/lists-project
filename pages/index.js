import { getAllLists } from '@lib/prismic'
import { ListofLists } from '@components/views'

export default function HomePage(props) {
    return <ListofLists {...props} />
}

export async function getStaticProps({ preview = false }) {
    const lists = await getAllLists()

    return {
        props: {
            lists,
            preview,
        },
        revalidate: 60,
    }
}
