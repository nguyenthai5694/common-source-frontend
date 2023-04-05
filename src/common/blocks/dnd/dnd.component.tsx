/**
 * DnDサンプル
 */
import React, { useState, useRef, useEffect } from 'react'
import { useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const ItemTypes = {
  CARD: 'card',
}

interface ItemProps {
  item: DndItem;
  index: number;
  moveItems: (dragIndex: number, hoverIndex: number) => void;
  onDrop?: () => void;
  isCanDrop?: (from, to) => boolean;
}

const Item = ({ item, index, moveItems, onDrop, isCanDrop = () => true }: ItemProps) => {
  const ref = useRef(null) as any;
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Add custiom condition for drop item or not
      if (isCanDrop && !isCanDrop(dragIndex, hoverIndex)) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveItems(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
    drop(item: any, monitor: any) {
      onDrop();
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <li ref={ref} style={{ opacity: isDragging ? 0.6 : 1 }} key={item.id}>
      {item.content}
    </li>
  )
}

interface DndItem {
  id: string | number;
  content: any;
  data?: any;
}

interface DndProps {
  items: DndItem[];

  onDrop?: () => void;

  handleChangeData?: any;

  isCanDrop?: (from, to) => boolean;
}

export default function DnD({ items: itemData, onDrop, handleChangeData, isCanDrop }: DndProps) {
  const [items, changeItems] = useState(itemData);

  const moveItems = useCallback(
    (dragIndex, hoverIndex) => {

    },
    [],
  )

  useEffect(() => {
    changeItems(itemData)
  }, [itemData])

  const onDropHandle = () => {
    onDrop && onDrop();
    handleChangeData && handleChangeData(items.map(item => item.data))
  }

  return (

    <ul>
      {items.map((item, index) => (
        <Item
          key={item.id}
          item={item}
          index={index}
          moveItems={moveItems}
          onDrop={onDropHandle}
          isCanDrop={isCanDrop} />
      ))}
    </ul>
  )
}
