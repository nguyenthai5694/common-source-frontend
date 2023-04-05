import React from 'react'
import dayjs from 'dayjs'
import { CellComponentProps } from 'common/blocks/datatable/datatable.type'

export function DateCell<T>(props: CellComponentProps<T>) {
  return (
    <>{props.dataItem[props.dataKey] ? dayjs(props.dataItem[props.dataKey]).format('YYYY/MM/DD') : ''}</>
  )
}