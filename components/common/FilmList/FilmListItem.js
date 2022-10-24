import PropTypes from 'prop-types'

import styles from './FilmListItem.module.scss'

export default function FilmListItem({
    alt_eng_title,
    alt_lang_title,
    director,
    eng_trans_title,
    orig_lang_title,
    phonetic_alt,
    phonetic_orig,
}) {
    return (
        <li className={styles.film}>
            <span className={styles.titleWrapper}>
                <span className={styles.title}>{orig_lang_title}</span>
                {phonetic_orig && (
                    <span className={styles.origTitle}>[{phonetic_orig}]</span>
                )}
                {alt_lang_title && (
                    <span className={styles.origTitle}>[{alt_lang_title}]</span>
                )}
                {phonetic_alt && (
                    <span className={styles.origTitle}>[{phonetic_alt}]</span>
                )}
                {eng_trans_title && (
                    <span className={styles.origTitle}>
                        [{eng_trans_title}]
                    </span>
                )}
                {alt_eng_title && (
                    <span className={styles.origTitle}>[{alt_eng_title}]</span>
                )}
            </span>
            <span className={styles.director}>{director}</span>
        </li>
    )
}

FilmListItem.propTypes = {
    alt_eng_title: PropTypes.string,
    alt_lang_title: PropTypes.string,
    director: PropTypes.string,
    eng_trans_title: PropTypes.string,
    orig_lang_title: PropTypes.string,
    phonetic_alt: PropTypes.string,
    phonetic_orig: PropTypes.string,
}
