import PropTypes from 'prop-types'
import { Container } from '@components/common'
import styles from './FilmsOverview.module.scss'

export default function FilmsOverview({ films, title }) {
    return (
        <Container title={title}>
            <h2>Eligible films</h2>
            <ol className={styles.list}>
                {films.map(film => (
                    <li className={styles.film} key={film.id}>
                        <span className={styles.titleWrapper}>
                            <span className={styles.title}>
                                {film.orig_lang_title}
                            </span>
                            {film.phonetic_orig && (
                                <span className={styles.origTitle}>
                                    [{film.phonetic_orig}]
                                </span>
                            )}
                            {film.alt_lang_title && (
                                <span className={styles.origTitle}>
                                    [{film.alt_lang_title}]
                                </span>
                            )}
                            {film.phonetic_alt && (
                                <span className={styles.origTitle}>
                                    [{film.phonetic_alt}]
                                </span>
                            )}
                            {film.eng_trans_title && (
                                <span className={styles.origTitle}>
                                    [{film.eng_trans_title}]
                                </span>
                            )}
                            {film.alt_eng_title && (
                                <span className={styles.origTitle}>
                                    [{film.alt_eng_title}]
                                </span>
                            )}
                        </span>
                        <span className={styles.director}>{film.director}</span>
                    </li>
                ))}
            </ol>
        </Container>
    )
}

FilmsOverview.propTypes = {
    films: PropTypes.array,
    title: PropTypes.string,
}
