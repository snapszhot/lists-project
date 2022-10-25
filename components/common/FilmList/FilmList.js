import PropTypes from 'prop-types'
import cn from 'classnames'

import FilmListItem from './FilmListItem'
import styles from './FilmList.module.scss'

export default function FilmList({ films, listType }) {
    const ElementType = listType
    const className = cn({
        [styles.list]: listType === 'ol',
    })

    return (
        <ElementType className={className}>
            {films.map(film => (
                <FilmListItem {...film} key={film.id} />
            ))}
        </ElementType>
    )
}

FilmList.defaultProps = {
    listType: 'ul',
}

FilmList.propTypes = {
    films: PropTypes.array,
    listType: PropTypes.string,
}
