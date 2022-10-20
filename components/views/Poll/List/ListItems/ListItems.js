import { useState } from 'react'
import PropTypes from 'prop-types'
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import ListItem from './ListItem'
import SortableListItem from './SortableListItem'
import styles from './ListItems.module.scss'

export default function ListItems({
    getItemStyles = () => ({}),
    list,
    setList,
    wrapperStyle = () => ({}),
}) {
    const [activeId, setActiveId] = useState(null)
    const getIndex = activeId => list.findIndex(it => it.id === activeId)
    const activeIndex = activeId ? getIndex(activeId) : -1
    const itemIds = list.map(item => item.id)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleRemove = id =>
        setList(items => items.filter(item => item.id !== id))

    const handleDragStart = ({ active }) => {
        if (!active) return

        setActiveId(active.id)
    }

    const handleDragEnd = ({ active, over }) => {
        if (active.id !== over.id) {
            setList(items => {
                const oldIndex = items.findIndex(it => it.id === active.id)
                const newIndex = items.findIndex(it => it.id === over.id)

                return arrayMove(items, oldIndex, newIndex)
            })

            setActiveId(null)
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={itemIds}
                strategy={verticalListSortingStrategy}
            >
                <ol className={styles.list}>
                    {list.map((item, index) => (
                        <SortableListItem
                            item={item}
                            number={index + 1}
                            key={index}
                            id={item.id}
                            index={index}
                            style={getItemStyles}
                            wrapperStyle={wrapperStyle}
                            onRemove={handleRemove}
                        />
                    ))}
                </ol>
            </SortableContext>
            <DragOverlay>
                {activeId && (
                    <ListItem
                        item={list[activeIndex]}
                        number={activeIndex + 1}
                        wrapperStyle={wrapperStyle({
                            active: { id: activeId },
                            index: activeIndex,
                            isDragging: true,
                            id: itemIds[activeIndex],
                        })}
                        style={getItemStyles({
                            id: itemIds[activeIndex],
                            index: activeIndex,
                            isSorting: activeId !== null,
                            isDragging: true,
                            overIndex: -1,
                            isDragOverlay: true,
                        })}
                        dragOverlay
                    />
                )}
            </DragOverlay>
        </DndContext>
    )
}

ListItems.propTypes = {
    getItemStyles: PropTypes.func,
    list: PropTypes.array,
    setList: PropTypes.func,
    wrapperStyle: PropTypes.func,
}
