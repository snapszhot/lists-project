import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { PrismicRichText } from '@prismicio/react'
import getPrettyDate from '@lib/get-pretty-date'

import { Container, ErrorMessage } from '@components/common'
import NavItem from './NavItem'

export default function ListOverview({
    ballotUid,
    description,
    poll_closed,
    slug,
    title,
    voting_begins,
    voting_enabled,
}) {
    const { query } = useRouter()
    const hasNoBallot = query?.noBallot === 'true'

    const votingBegins = getPrettyDate(voting_begins)
    let votingLink = `/vote/${slug}`
    let votingTitle = `Vote (begins ${votingBegins})`

    if (voting_enabled) {
        votingTitle = 'Vote'
    }
    if (ballotUid) {
        votingLink = `/edit/${slug}/${ballotUid}`
        votingTitle = 'Update my ballot'
    }

    if (poll_closed) {
        return (
            <Container title={title}>
                <p>
                    Voting has closed for this poll. Thank you to everyone who
                    participated.
                </p>
            </Container>
        )
    }

    return (
        <Container title={title}>
            {hasNoBallot && (
                <div style={{ marginBottom: 'var(--spacing-single)' }}>
                    <ErrorMessage message='We could not find that ballot. Please contact swo17 or skilar on criterionforum.org.' />
                </div>
            )}
            <PrismicRichText field={description} />
            <ul>
                <NavItem
                    link={`/films/${slug}`}
                    title='View the eligible films'
                />
                <NavItem
                    link={votingLink}
                    title={votingTitle}
                    disabled={!voting_enabled}
                />
            </ul>
        </Container>
    )
}

ListOverview.propTypes = {
    ballotUid: PropTypes.string,
    description: PropTypes.array,
    poll_closed: PropTypes.bool,
    slug: PropTypes.string,
    title: PropTypes.string,
    voting_begins: PropTypes.string,
    voting_enabled: PropTypes.bool,
}
