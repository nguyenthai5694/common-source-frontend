import React from 'react'
import dayjs from 'dayjs'
import { CellComponentProps } from 'common/blocks/datatable/datatable.component'

export default function DateTimeFormat({ dataItem, dataKey }: CellComponentProps) {
  let value = dayjs(dataItem[dataKey])

  return (
    <span>{value.isValid() ? value.format('YYYY/MM/DD HH:mm') : ''}</span>
  )
}
