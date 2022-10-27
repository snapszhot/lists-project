import { getAllLists } from '@lib/prismic'

import { DashboardOverview } from '@components/views'

export default function DashboardOverviewPage(props) {
    return <DashboardOverview {...props} />
}

export async function getStaticProps({ preview = false }) {
    const lists = await getAllLists(preview)

    return {
        props: {
            lists,
            preview,
        },
        revalidate: 60,
    }
}
