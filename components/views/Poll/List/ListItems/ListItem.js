import { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Handle, Movie, Remove } from '@components/common'
import styles from './ListItem.module.scss'

const ListItem = forwardRef(
    (
        {
            dragOverlay,
            dragging,
            handleProps,
            index,
            item,
            listeners,
            number,
            onRemove,
            transition,
            transform,
            wrapperStyle,
            ...props
        },
        ref
    ) => {
        useEffect(() => {
            if (!dragOverlay) {
                return
            }

            document.body.style.cursor = 'grabbing'

            return () => {
                document.body.style.cursor = ''
            }
        }, [dragOverlay])

        return (
            <li
                className={styles.listItemWrapper}
                style={{
                    ...wrapperStyle,
                    transition: [transition, wrapperStyle?.transition]
                        .filter(Boolean)
                        .join(', '),
                    '--translate-x': transform
                        ? `${Math.round(transform.x)}px`
                        : undefined,
                    '--translate-y': transform
                        ? `${Math.round(transform.y)}px`
                        : undefined,
                    '--scale-x': transform?.scaleX
                        ? `${transform.scaleX}`
                        : undefined,
                    '--scale-y': transform?.scaleY
                        ? `${transform.scaleY}`
                        : undefined,
                    '--index': index,
                }}
                ref={ref}
            >
                <div
                    className={cn(styles.listItem, {
                        [styles.dragging]: dragging,
                    })}
                    {...props}
                >
                    <div className={styles.listItemNum}>{number}</div>
                    <div>
                        <Movie {...item} />
                    </div>
                    <div className={styles.actions}>
                        <Remove className={styles.remove} onClick={onRemove} />
                        <div {...listeners}>
                            <Handle
                                className={styles.handle}
                                {...handleProps}
                            />
                        </div>
                    </div>
                </div>
            </li>
        )
    }
)

ListItem.displayName = 'ListItem'

ListItem.propTypes = {
    dragOverlay: PropTypes.bool,
    dragging: PropTypes.bool,
    handleProps: PropTypes.object,
    index: PropTypes.number,
    item: PropTypes.object,
    listeners: PropTypes.object,
    number: PropTypes.number,
    onRemove: PropTypes.func,
    transition: PropTypes.string,
    transform: PropTypes.object,
    wrapperStyle: PropTypes.object,
}

export default ListItem
