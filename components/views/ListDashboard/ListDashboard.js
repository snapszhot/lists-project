import PropTypes from 'prop-types'
import axios from 'axios'
import fileDownload from 'js-file-download'
import toSlug from '@lib/to-slug'

import { Container } from '@components/common'
import styles from './ListDashboard.module.scss'

export default function ListDashboard({
    title,
    uid,
    voting_begins,
    voting_enabled,
    voting_ends,
}) {
    const containerTitle = `${title} Dashboard`

    const downloadCsv = async endpoint => {
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
    }

    return (
        <Container title={containerTitle}>
            <p>
                This poll runs from {voting_begins} to {voting_ends}.
                {voting_enabled && (
                    <> Voting is currently enabled for this poll.</>
                )}
            </p>
            <button
                className={styles.download}
                onClick={() => downloadCsv('raw-data')}
            >
                Download raw data
            </button>
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
