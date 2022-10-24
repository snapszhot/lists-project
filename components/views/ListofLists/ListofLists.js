import PropTypes from 'prop-types'
import Link from 'next/link'

import { Container } from '@components/common'

export default function ListofLists({ lists }) {
    return (
        <Container title='All Lists'>
            <ul>
                {lists.map(list => (
                    <li key={list.id}>
                        <Link href={`/list/${list.uid}`}>
                            <a>{list.data.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Container>
    )
}

ListofLists.propTypes = {
    lists: PropTypes.array,
}
