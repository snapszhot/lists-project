import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { PrismicRichText } from '@prismicio/react'
import { DateTime } from 'luxon'

import { Container, ErrorMessage } from '@components/common'
import NavItem from './NavItem'

export default function ListOverview({
    ballotUid,
    description,
    slug,
    show_results,
    title,
    voting_begins,
    voting_enabled,
}) {
    const { query } = useRouter()
    const hasNoBallot = query?.noBallot === 'true'

    const dt = DateTime.fromISO(voting_begins)
    const votingBegins = dt.toLocaleString({ month: 'long', day: 'numeric' })
    let votingLink = `/vote/${slug}`
    let votingTitle = `Vote (begins ${votingBegins})`

    if (voting_enabled) {
        votingTitle = 'Vote'
    }
    if (ballotUid) {
        votingLink = `/edit/${slug}/${ballotUid}`
        votingTitle = 'Update my ballot'
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
                <NavItem
                    link={`/results/${slug}`}
                    title='View the results'
                    disabled={!show_results}
                />
            </ul>
        </Container>
    )
}

ListOverview.propTypes = {
    ballotUid: PropTypes.string,
    description: PropTypes.array,
    slug: PropTypes.string,
    show_results: PropTypes.bool,
    title: PropTypes.string,
    voting_begins: PropTypes.string,
    voting_enabled: PropTypes.bool,
}
