import PropTypes from 'prop-types'

import FilmListItem from './FilmListItem'
import styles from './FilmList.module.scss'

export default function FilmList({ films }) {
    return (
        <ol className={styles.list}>
            {films.map(film => (
                <FilmListItem {...film} key={film.id} />
            ))}
        </ol>
    )
}

FilmList.propTypes = {
    films: PropTypes.array,
}
