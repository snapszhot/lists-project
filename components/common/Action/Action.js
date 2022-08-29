import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './Action.module.scss'

const Action = forwardRef(({ className, cursor, ...props }, ref) => {
    return (
        <button
            ref={ref}
            {...props}
            className={cn(styles.action, className)}
            tabIndex={0}
            style={{ cursor }}
        />
    )
})

Action.displayName = 'Action'

Action.propTypes = {
    className: PropTypes.string,
    cursor: PropTypes.string,
}

export default Action
