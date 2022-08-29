import PropTypes from 'prop-types'

import { Movie } from '@components/common'
import styles from './PrefillItem.module.scss'

export default function PrefillItem({ handleClick, item }) {
    const onClick = () => handleClick(item)

    return (
        <li>
            <button
                className={styles.prefillItem}
                onClick={onClick}
                type='button'
            >
                <Movie {...item} />
            </button>
        </li>
    )
}

PrefillItem.propTypes = {
    handleClick: PropTypes.func,
    item: PropTypes.object,
}
