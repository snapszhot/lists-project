import PropTypes from 'prop-types'
import styles from './Movie.module.scss'

export default function Movie({
    altEngTitle,
    altLangTitle,
    altLangTitlePhonetic,
    director,
    endYear,
    engTransTitle,
    originalTitle,
    originalTitlePhonetic,
    releaseYear,
    startYear,
}) {
    // These vars are in case you need to add "aka" and "or" in the future
    // const hasAlternateTitle = altLangTitle || engTransTitle || altEngTitle
    // const hasFirstOr = altLangTitle && engTransTitle
    // const hasSecondOr = engTransTitle && altEngTitle
    const hasYearRange =
        (!endYear || endYear === startYear) &&
        releaseYear !== startYear.toString()

    return (
        <>
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
            <span className={styles.director}>
                {director} {hasYearRange && <>({releaseYear})</>}
            </span>
        </>
    )
}

Movie.propTypes = {
    altEngTitle: PropTypes.string,
    altLangTitle: PropTypes.string,
    altLangTitlePhonetic: PropTypes.string,
    director: PropTypes.string,
    endYear: PropTypes.number,
    engTransTitle: PropTypes.string,
    originalTitle: PropTypes.string,
    originalTitlePhonetic: PropTypes.string,
    releaseYear: PropTypes.string,
    startYear: PropTypes.number,
}
