import { useState } from 'react'
import PropTypes from 'prop-types'
import { captureException } from '@sentry/nextjs'
import axios from 'axios'
import fileDownload from 'js-file-download'
import getPrettyDate from '@lib/get-pretty-date'
import toSlug from '@lib/to-slug'

import { Container, ErrorMessage } from '@components/common'
import styles from './ListDashboard.module.scss'

export default function ListDashboard({
    title,
    uid,
    voting_begins,
    voting_enabled,
    voting_ends,
}) {
    const [error, setError] = useState(null)
    const containerTitle = `${title} Dashboard`
    const beginDate = getPrettyDate(voting_begins)
    const endDate = getPrettyDate(voting_ends)
    const votingEnabled = voting_enabled ? 'enabled' : 'disabled'

    const downloadCsv = async endpoint => {
        try {
            const { data } = await axios.post(
                `/api/${endpoint}`,
                {
                    poll_id: uid,
                },
                {
                    responseType: 'blob',
                }
            )

            const titleSlug = toSlug(title)
            const filename = `${titleSlug}-${endpoint}.csv`

            fileDownload(data, filename)
            setError(null)
        } catch (error) {
            captureException(error)
            setError(
                'There was an error downloading the file. Please try again later.'
            )
        }
    }

    return (
        <Container title={containerTitle}>
            <p>
                This poll runs from {beginDate} to {endDate}. Voting is
                currently {votingEnabled} for this poll.
            </p>
            <button
                className={styles.download}
                onClick={() => downloadCsv('raw-data')}
            >
                Download raw data
            </button>
            <button
                className={styles.download}
                onClick={() => downloadCsv('results')}
            >
                Download results
            </button>
            {error && <ErrorMessage message={error} />}
        </Container>
    )
}

ListDashboard.propTypes = {
    title: PropTypes.string,
    uid: PropTypes.string,
    voting_begins: PropTypes.string,
    voting_enabled: PropTypes.bool,
    voting_ends: PropTypes.string,
}
