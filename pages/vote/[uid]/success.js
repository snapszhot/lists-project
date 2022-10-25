import PropTypes from 'prop-types'
import Link from 'next/link'
import getSubmittedPoll from '@lib/get-submitted-poll'

import { Container, FilmList } from '@components/common'

export default function SuccessPage({ uid, votes }) {
    const link = `/update?uid=${uid}`

    return (
        <Container title='Vote Received!'>
            <p>
                Thank you for voting. Please review your ballot, listed below.
                Voting closes TK.
            </p>
            <p>Need to update or change your ballot? No problem.</p>
            <Link href={link}>
                <a>Update my ballot</a>
            </Link>
            <h2>Your ballot</h2>
            <FilmList films={votes} listType='ol' />
        </Container>
    )
}

SuccessPage.propTypes = {
    uid: PropTypes.string,
    votes: PropTypes.array,
}

export async function getServerSideProps({ params, req }) {
    const uid = req?.cookies[`list-${params.uid}`] || null

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
