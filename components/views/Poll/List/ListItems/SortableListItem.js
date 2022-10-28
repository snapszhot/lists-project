import PropTypes from 'prop-types'
import { useSortable } from '@dnd-kit/sortable'

import ListItem from './ListItem'

export default function SortableListItem({
    endYear,
    id,
    index,
    item,
    number,
    onRemove,
    startYear,
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
            endYear={endYear}
            handleProps={{
                ref: setActivatorNodeRef,
            }}
            index={index}
            item={item}
            listeners={listeners}
            number={number}
            onRemove={() => onRemove(id)}
            startYear={startYear}
            transform={transform}
            transition={transition}
            wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
            {...attributes}
        />
    )
}

SortableListItem.propTypes = {
    endYear: PropTypes.number,
    id: PropTypes.number,
    index: PropTypes.number,
    item: PropTypes.object,
    number: PropTypes.number,
    onRemove: PropTypes.func,
    startYear: PropTypes.number,
    wrapperStyle: PropTypes.func,
}
