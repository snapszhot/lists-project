import { getSingleList } from '@lib/prismic'

import { ListOverview } from '@components/views'

export default function ListOverviewPage(props) {
    return <ListOverview {...props} />
}

export async function getServerSideProps({ params, preview = false, req }) {
    const ballotUid = req?.cookies[`list-${params.uid}`] || null
    const list = await getSingleList(preview, params.uid)

    return {
        props: {
            ...list,
            ballotUid,
            preview,
            slug: params.uid,
        },
    }
}