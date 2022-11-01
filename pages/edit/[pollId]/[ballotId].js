import { captureException } from '@sentry/nextjs'
import getSubmittedBallot from '@lib/get-submitted-ballot'
import { getSingleList } from '@lib/prismic'

import { Poll } from '@components/views'

export default function EditPage(props) {
    return <Poll {...props} />
}

export async function getServerSideProps({ params, preview = false }) {
    try {
        const list = await getSingleList(preview, params.pollId)
        const ballot = await getSubmittedBallot(params.ballotId)

        if (list.poll_closed || !ballot) {
            let url = `/list/${params.pollId}`
            if (!ballot) {
                url += '?noBallot=true'
            }

            return {
                redirect: {
                    destination: url,
                    permanent: false,
                },
            }
        }

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

        return {
            notFound: true,
        }
    }
}
