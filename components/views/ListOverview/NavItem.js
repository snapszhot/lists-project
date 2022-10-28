import PropTypes from 'prop-types'
import Link from 'next/link'
import cn from 'classnames'

import styles from './NavItem.module.scss'

export default function NavItem({ disabled, link, title }) {
    const className = cn(styles.navItemText, {
        [styles.disabled]: disabled,
    })

    return (
        <li className={styles.navItem}>
            {disabled ? (
                <span className={className}>{title}</span>
            ) : (
                <Link href={link} className={className}>
                    {title}
                </Link>
            )}
        </li>
    )
}

NavItem.propTypes = {
    disabled: PropTypes.bool,
    link: PropTypes.string,
    title: PropTypes.string,
}
