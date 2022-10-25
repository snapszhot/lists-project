import PropTypes from 'prop-types'

import styles from './FilmListItem.module.scss'

export default function FilmListItem({
    altEngTitle,
    altLangTitle,
    director,
    engTransTitle,
    originalTitle,
    altLangTitlePhonetic,
    originalTitlePhonetic,
}) {
    return (
        <li className={styles.film}>
            <span className={styles.titleWrapper}>
                <span className={styles.title}>{originalTitle}</span>
                {originalTitlePhonetic && (
                    <span className={styles.origTitle}>
                        [{originalTitlePhonetic}]
                    </span>
                )}
                {altLangTitle && (
                    <span className={styles.origTitle}>[{altLangTitle}]</span>
                )}
                {altLangTitlePhonetic && (
                    <span className={styles.origTitle}>
                        [{altLangTitlePhonetic}]
                    </span>
                )}
                {engTransTitle && (
                    <span className={styles.origTitle}>[{engTransTitle}]</span>
                )}
                {altEngTitle && (
                    <span className={styles.origTitle}>[{altEngTitle}]</span>
                )}
            </span>
            <span className={styles.director}>{director}</span>
        </li>
    )
}

FilmListItem.propTypes = {
    altEngTitle: PropTypes.string,
    altLangTitle: PropTypes.string,
    director: PropTypes.string,
    engTransTitle: PropTypes.string,
    originalTitle: PropTypes.string,
    altLangTitlePhonetic: PropTypes.string,
    originalTitlePhonetic: PropTypes.string,
}
