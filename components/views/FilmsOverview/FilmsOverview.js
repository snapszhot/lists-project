import PropTypes from 'prop-types'
import { Container, FilmList } from '@components/common'

export default function FilmsOverview({ films, title }) {
    return (
        <Container title={title}>
            <h2>Eligible films</h2>
            <FilmList films={films} />
        </Container>
    )
}

FilmsOverview.propTypes = {
    films: PropTypes.array,
    title: PropTypes.string,
}
