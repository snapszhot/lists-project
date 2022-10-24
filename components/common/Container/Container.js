import PropTypes from 'prop-types'
import styles from './Container.module.scss'

export default function Container({ children, title }) {
    return (
        <div className={styles.container}>
            <main>
                <h1 className={styles.title}>{title}</h1>
                {children}
            </main>
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
}
