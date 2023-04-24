import React, { useContext } from 'react';
import { Checkbox, TableCell, TableRow, TableBody, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import { messages } from 'app/const/message.const';
import { DatatableContext } from './datatable.context';

interface TableBodyProps {
  handleClick?: (event: any, row: any, index?: number) => void;
  /**
   * 
   * @param items 
   * all function onActionClick in Component
   */
  onActionClick?: (items: any) => void;
}

export default function DataTableBody({
  handleClick,
  onActionClick,
}: TableBodyProps) {
  const {
    dataItems,
    columnsConfig,
    tableConfig,
    selected,
    checkType,
  } = useContext(DatatableContext);

  return (
    <TableBody>
      {dataItems
        ? dataItems.map((row, index) => {
          const isItemSelected = selected.find(e =>
            row[`${tableConfig.idProp}`] === e[`${tableConfig.idProp}`])
            ? true : false
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              role='checkbox'
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={`${row.name}-${index}`}
              selected={isItemSelected}
            >
              {checkType === 'checkbox' &&
                <TableCell padding='checkbox' className='table-colunm-0 table-colunm-fixed'>
                  <Checkbox
                    color='primary'
                    checked={isItemSelected}
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                    onClick={(event) => handleClick(event, row, index)}
                  />
                </TableCell>}

              {checkType === 'radio' &&
                <TableCell
                  className='table-checkbox table-colunm-0 table-colunm-fixed'
                  padding='checkbox'
                  align='center'
                >
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                  >
                    <FormControlLabel value={index} control={<Radio />} label=''
                      onClick={(event) => handleClick(event, row)} />
                  </RadioGroup>
                </TableCell>}

              {columnsConfig && columnsConfig.map((item, i) => {
                return (
                  <TableCell
                    key={`${item.dataKey}-${i}`} align={item.align}
                    className={`${tableConfig.fixedLastColunm &&
                      columnsConfig.length - 1 === i ? 'colunm-action-item' : ''} 
                                ${tableConfig.fixedColumnNumber > i ? 'table-colunm-fixed' : ''}`}
                    width={item.width}

                  >
                    {!item.component && row[item.dataKey]}

                    {item.component && <item.component
                      dataItem={row}
                      index={index}
                      clickAction={onActionClick}
                      buttons={item.buttons}
                    />}
                  </TableCell>

                )
              })}

            </TableRow>
          );
        })
        : null}

      {dataItems.length === 0 && (
        <TableRow>
          <TableCell colSpan={columnsConfig.length} >{messages.TABLE_NODATA}</TableCell>
        </TableRow>
      )}

    </TableBody>
  );
}