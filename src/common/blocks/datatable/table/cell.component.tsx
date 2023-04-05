import React from 'react';
import { ColumnConfig } from '../datatable.type';

interface CellProps {
  dataItem,
  rowIndex: number;
  colConfig: ColumnConfig;
  hasDrag: boolean;
  width: number;
}

export function Cell({ dataItem, rowIndex, colConfig, hasDrag, width = 0 }: CellProps) {
  if (!colConfig.component) {
    return (hasDrag) ?
      <td className='b-table__cell -px-0' style={{ width }}>
        <div className='b-table__row-border'>
          <span className='position-relative t-8'>{dataItem[colConfig.dataKey]}</span>
        </div>
      </td>
      : <td className='b-table__cell' style={{ width }}>{dataItem[colConfig.dataKey]}</td>
  }

  if (hasDrag) {
    return (
      <td className='b-table__cell -px-0' style={{ width }}>
        <div className='b-table__row-border'>
          <colConfig.component
            customData={colConfig.customData}
            dataItem={dataItem}
            dataKey={colConfig.dataKey}
            index={rowIndex}
          />
        </div>
      </td>
    )
  }

  return (
    <td className='b-table__cell' style={{ width }}>
      <colConfig.component
        customData={colConfig.customData}
        dataItem={dataItem}
        dataKey={colConfig.dataKey}
        index={rowIndex}
      />
    </td>
  )
}