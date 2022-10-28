import PropTypes from 'prop-types'
import { Container, FilmList } from '@components/common'
import styles from './FilmsOverview.module.scss'

export default function FilmsOverview({ films, title, ...props }) {
    return (
        <Container title={title}>
            <p>
                Below is a list of films you can vote for from this year. If you
                want to be able to vote for something that isn’t listed here,
                you need to ask me to add it to the list. The only reason I
                won’t do so is if I deem that it belongs in another year. I have
                my own curious system for assigning films to years, but rest
                assured that I will never let a film miss its chance to qualify
                in one year or another. I am the ultimate arbiter of year
                assignments.
            </p>
            <h2 className={styles.subtitle}>Eligible films</h2>
            <p className={styles.subtitleCaption}>
                Sorted alphabetically by director’s name as written
            </p>
            <FilmList films={films} {...props} />
        </Container>
    )
}

FilmsOverview.propTypes = {
    films: PropTypes.array,
    title: PropTypes.string,
}
