import { captureException } from '@sentry/nextjs'
import { getSingleList } from '@lib/prismic'

import { Poll } from '@components/views'

export default function VotePage(props) {
    return <Poll {...props} />
}

export async function getServerSideProps({ params, preview = false, req }) {
    try {
        const uid = req?.cookies[`list-${params.uid}`] || null

        if (uid) {
            return {
                redirect: {
                    destination: `/vote/${params.uid}/success`,
                    permanent: false,
                },
            }
        }

        const list = await getSingleList(preview, params.uid)

        return {
            props: {
                ...list,
                preview,
                uid: params.uid,
            },
        }
    } catch (error) {
        captureException(error)
        throw error
    }
}
