import PropTypes from 'prop-types'
import { Container, ListList } from '@components/common'

export default function DashboardOverview({ lists }) {
    return (
        <Container title='Dashboard'>
            <ListList linkSlug='/dashboard' lists={lists} />
        </Container>
    )
}

DashboardOverview.propTypes = {
    lists: PropTypes.array,
}
