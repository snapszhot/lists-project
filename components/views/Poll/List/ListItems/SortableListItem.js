import PropTypes from 'prop-types'
import { useSortable } from '@dnd-kit/sortable'

import ListItem from './ListItem'

export default function SortableListItem({
    id,
    index,
    item,
    number,
    onRemove,
    wrapperStyle,
}) {
    const {
        active,
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id })

    return (
        <ListItem
            ref={setNodeRef}
            data-id={id}
            data-index={index}
            dragging={isDragging}
            handleProps={{
                ref: setActivatorNodeRef,
            }}
            index={index}
            item={item}
            listeners={listeners}
            number={number}
            onRemove={() => onRemove(id)}
            transform={transform}
            transition={transition}
            wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
            {...attributes}
        />
    )
}

SortableListItem.propTypes = {
    id: PropTypes.string,
    index: PropTypes.number,
    item: PropTypes.object,
    number: PropTypes.number,
    onRemove: PropTypes.func,
    wrapperStyle: PropTypes.func,
}
