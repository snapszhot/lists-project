import PropTypes from 'prop-types'
import styles from './ErrorMessage.module.scss'

export default function ErrorMessage({ message }) {
    return <div className={styles.error}>{message}</div>
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
}
