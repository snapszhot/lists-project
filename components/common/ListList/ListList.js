import PropTypes from 'prop-types'
import Link from 'next/link'

export default function ListList({ linkSlug, lists }) {
    return (
        <ul>
            {lists.map(list => (
                <li key={list.id}>
                    <Link href={`/${linkSlug}/${list.uid}`}>
                        <a>{list.data.title}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

ListList.defaultProps = {
    linkSlug: 'list',
}

ListList.propTypes = {
    linkSlug: PropTypes.string,
    lists: PropTypes.array,
}
