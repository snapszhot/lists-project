import PropTypes from 'prop-types'
import Link from 'next/link'
import getSubmittedBallot from '@lib/get-submitted-ballot'

import { Container, FilmList } from '@components/common'

export default function SuccessPage({ ballotId, pollId, votes }) {
    const link = `/edit/${pollId}/${ballotId}`

    return (
        <Container title='Vote Received!'>
            <p>
                Thank you for voting. Please review your ballot, listed below.
                Voting closes TK.
            </p>
            <p>Need to update or change your ballot? No problem.</p>
            <Link href={link}>Update my ballot</Link>
            <h2>Your ballot</h2>
            <FilmList films={votes} listType='ol' />
        </Container>
    )
}

SuccessPage.propTypes = {
    ballotId: PropTypes.string,
    pollId: PropTypes.string,
    votes: PropTypes.array,
}

export async function getServerSideProps({ params, req }) {
    const ballotId = req?.cookies[`list-${params.uid}`] || null

    if (!ballotId) {
        return {
            redirect: {
                destination: `/list/${params.uid}`,
                permanent: false,
            },
        }
    }

    const { votes } = await getSubmittedBallot(ballotId)

    return {
        props: {
            ballotId,
            pollId: params.uid,
            votes,
        },
    }
}
