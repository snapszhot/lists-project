import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import styles from './Container.module.scss'

export default function Container({ children, title }) {
    return (
        <div className={styles.container}>
            <NextSeo title={title} />
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
