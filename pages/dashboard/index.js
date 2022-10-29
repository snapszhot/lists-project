import { captureException } from '@sentry/nextjs'
import { getAllLists } from '@lib/prismic'

import { DashboardOverview } from '@components/views'

export default function DashboardOverviewPage(props) {
    return <DashboardOverview {...props} />
}

export async function getStaticProps({ preview = false }) {
    try {
        const lists = await getAllLists(preview)

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
