import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'
import { DateTime } from 'luxon'

import { Container } from '@components/common'
import NavItem from './NavItem'

export default function ListOverview({
    description,
    slug,
    show_results,
    title,
    voting_begins,
    voting_enabled,
}) {
    const dt = DateTime.fromISO(voting_begins)
    const votingBegins = dt.toLocaleString({ month: 'long', day: 'numeric' })
    const votingTitle = voting_enabled
        ? 'Vote'
        : `Vote (begins ${votingBegins})`

    return (
        <Container title={title}>
            <PrismicRichText field={description} />
            <ul>
                <NavItem
                    link={`/films/${slug}`}
                    title='View the eligible films'
                />
                <NavItem
                    link={`/vote/${slug}`}
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
    description: PropTypes.object,
    slug: PropTypes.string,
    show_results: PropTypes.bool,
    title: PropTypes.string,
    voting_begins: PropTypes.string,
    voting_enabled: PropTypes.string,
}
