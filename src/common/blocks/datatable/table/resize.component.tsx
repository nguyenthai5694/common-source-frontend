import React, { useEffect, useRef } from 'react';
import { columnMinWidth } from './table.config';

export interface ColumnResizeProps {
  onResize: (index, distance: number) => void;
  onMarkerMove: (event, value) => void;
  index: number;
  size: number;
}

export default function ColumnResize({
  onResize,
  onMarkerMove,
  index,
  size,
}: ColumnResizeProps) {
  // ref type ??? dataset ???
  const resizeEleRef = useRef(null);

  /**
   * Table の列サイズの制御
   */
  useEffect(() => {
    if (!resizeEleRef.current) return

    const resizeEle = resizeEleRef.current

    const handleDragMove = (e) => {
      const start = resizeEleRef.current.dataset.start
      // 50 より小さくならないように調整
      const end =
        size + (e.clientX - start) < columnMinWidth ? start - (size - columnMinWidth) : e.clientX

      onMarkerMove('move', end)
    }

    const handleDragStart = (e) => {
      e.preventDefault()
      document.body.addEventListener('mouseup', handleDragEnd)
      document.body.addEventListener('mousemove', handleDragMove)

      const start = e.clientX

      resizeEleRef.current.dataset.start = start
      onMarkerMove('show', start)
    }

    const handleDragEnd = (e) => {
      document.body.removeEventListener('mouseup', handleDragEnd)
      document.body.removeEventListener('mousemove', handleDragMove)

      const start = resizeEleRef.current.dataset.start
      const end =
        size + (e.clientX - start) < columnMinWidth ? start - (size - columnMinWidth) : e.clientX

      const distance = end - start;

      onMarkerMove('hidden', end);

      if (distance === 0) {
        return;
      }

      onResize(index, distance);
    }

    resizeEle.addEventListener('mousedown', handleDragStart)

    return () => {
      resizeEle.removeEventListener('mousedown', handleDragStart)
    }
  }, [resizeEleRef, onMarkerMove, index, onResize, size])

  return (
    <div className='b-table__col-resize' ref={resizeEleRef} area-label={index}>
      <span className='b-table__hidden-text'>resize</span>
    </div>
  )
}
