import PropTypes from 'prop-types'
import { Container, ListList } from '@components/common'

export default function ListofLists({ lists }) {
    return (
        <Container title='All Lists'>
            <ListList lists={lists} />
        </Container>
    )
}

ListofLists.propTypes = {
    lists: PropTypes.array,
}
