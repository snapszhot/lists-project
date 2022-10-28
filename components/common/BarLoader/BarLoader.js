import PropTypes from 'prop-types'
import styles from './BarLoader.module.scss'

export default function BarLoader({ fill }) {
    const inlineContainerStyles = {
        backgroundColor: 'var(--color-light-grey)',
    }

    const inlineBarStyles = {
        backgroundColor: fill,
    }

    return (
        <div className={styles.container}>
            <span className={styles.loader} style={inlineContainerStyles}>
                <span className={styles.bar1} style={inlineBarStyles} />
                <span className={styles.bar2} style={inlineBarStyles} />
            </span>
        </div>
    )
}

BarLoader.defaultProps = {
    fill: 'var(--color-dark-grey)',
}

BarLoader.propTypes = {
    fill: PropTypes.string,
}
