import PropTypes from 'prop-types'
import Link from 'next/link'
import getSubmittedPoll from '@lib/get-submitted-poll'

import { Container } from '@components/common'

export default function SuccessPage({ uid, votes }) {
    const link = `https://lists-project.vercel.app/update?uid=${uid}`
    console.log(votes) // eslint-disable-line no-console

    return (
        <Container title='Success!'>
            Thank you for voting. If you need to update or change your ballot,
            please use this link:{' '}
            <Link href={link}>
                <a>{link}</a>
            </Link>
        </Container>
    )
}

SuccessPage.propTypes = {
    uid: PropTypes.string,
    votes: PropTypes.object,
}

export async function getServerSideProps({ req }) {
    const uid = req?.cookies['list-1965'] || null

    if (!uid) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const votes = await getSubmittedPoll(uid)

    return {
        props: {
            uid,
            votes,
        },
    }
}
