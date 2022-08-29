import PropTypes from 'prop-types'

import { Movie } from '@components/common'
import styles from './ListItems.module.scss'

export default function ListItems({ list }) {
    return (
        <ol className={styles.list}>
            {list.map((item, index) => (
                <li className={styles.listItem} key={index}>
                    <div className={styles.listItemNum}>{index + 1}</div>
                    <div>
                        <Movie {...item} />
                    </div>
                </li>
            ))}
        </ol>
    )
}

ListItems.propTypes = {
    list: PropTypes.array,
}
