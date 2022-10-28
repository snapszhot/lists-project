import PropTypes from 'prop-types'
import cn from 'classnames'

import { Movie } from '@components/common'
import styles from './FilmList.module.scss'

export default function FilmList({ films, listType, ...props }) {
    const ElementType = listType
    const className = cn({
        [styles.list]: listType === 'ol',
    })

    return (
        <ElementType className={className}>
            {films.map(film => (
                <li className={styles.film} key={film.id}>
                    <Movie {...film} {...props} />
                </li>
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
