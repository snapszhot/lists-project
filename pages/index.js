import { captureException } from '@sentry/nextjs'
import { getAllLists } from '@lib/prismic'
import { ListofLists } from '@components/views'

export default function HomePage(props) {
    return <ListofLists {...props} />
}

export async function getStaticProps({ preview = false }) {
    try {
        const lists = await getAllLists()

        return {
            props: {
                lists,
                preview,
            },
            revalidate: 60,
        }
    } catch (error) {
        captureException(error)
        throw error
    }
}
