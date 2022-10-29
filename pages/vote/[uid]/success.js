import PropTypes from 'prop-types'
import Link from 'next/link'
import { captureException } from '@sentry/nextjs'
import getPrettyDate from '@lib/get-pretty-date'
import getSubmittedBallot from '@lib/get-submitted-ballot'
import { getSingleList } from '@lib/prismic'

import { Container, FilmList } from '@components/common'

export default function SuccessPage({
    ballotId,
    pollId,
    votes,
    voting_ends,
    ...props
}) {
    const link = `/edit/${pollId}/${ballotId}`
    const endDate = getPrettyDate(voting_ends)

    return (
        <Container title='Vote Received!'>
            <p style={{ marginBottom: 'var(--spacing-half)' }}>
                Thank you for voting. Please review your ballot, listed below.
            </p>
            <p>
                Need to update or change your ballot? No problem.{' '}
                <Link href={link}>You can update your ballot here.</Link> All
                changes must be made before voting ends on {endDate}.
            </p>
            <h2>Your ballot</h2>
            <FilmList films={votes} listType='ol' {...props} />
        </Container>
    )
}

SuccessPage.propTypes = {
    ballotId: PropTypes.string,
    pollId: PropTypes.string,
    votes: PropTypes.array,
    voting_ends: PropTypes.string,
}

export async function getServerSideProps({ params, preview = false, req }) {
    try {
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
        const list = await getSingleList(preview, params.uid)

        return {
            props: {
                ...list,
                ballotId,
                endYear: list.end_year,
                pollId: params.uid,
                startYear: list.start_year,
                votes,
            },
        }
    } catch (error) {
        captureException(error)

        return {
            notFound: true,
        }
    }
}
