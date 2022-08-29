import PropTypes from 'prop-types'
import styles from './InputLabel.module.scss'

export default function InputLabel({ htmlFor, title }) {
    return (
        <label className={styles.label} htmlFor={htmlFor}>
            {title}
        </label>
    )
}

InputLabel.propTypes = {
    htmlFor: PropTypes.string,
    title: PropTypes.string,
}
