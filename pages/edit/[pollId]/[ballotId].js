import { captureException } from '@sentry/nextjs'
import getSubmittedBallot from '@lib/get-submitted-ballot'
import { getSingleList } from '@lib/prismic'

import { Poll } from '@components/views'

export default function EditPage(props) {
    return <Poll {...props} />
}

export async function getServerSideProps({ params, preview = false, req }) {
    try {
        const uid = req?.cookies[`list-${params.pollId}`] || null

        if (!uid) {
            return {
                redirect: {
                    destination: `/list/${params.pollId}?noBallot=true`,
                    permanent: false,
                },
            }
        }

        const list = await getSingleList(preview, params.pollId)
        const ballot = await getSubmittedBallot(params.ballotId)

        return {
            props: {
                ...list,
                ballot,
                preview,
                uid: params.pollId,
            },
        }
    } catch (error) {
        captureException(error)
        throw error
    }
}
