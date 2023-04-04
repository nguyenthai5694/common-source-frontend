import React, { useContext } from 'react'
import VisibleChanger from 'soumu/parts/visible-changer/visible-changer.component'
import { DatatableContext } from './datatable.component'
import { HeaderLowerTemplateProps } from './datatable.type'

export default function HeaderLowerTemplate(props: HeaderLowerTemplateProps) {
  const datatableCtx = useContext(DatatableContext);
  const { enableTableExpand, isTableExpand, toggleTableExpand, removeDataSetting, disableConfigHeader } = datatableCtx;

  return (
    <div className='t-list__header-lower'>
      {/* <Pagination
        totalItem={props.totalItem}
        currentPage={props.currentPage}
        pageSize={props.pageSize}
        onPageChange={props.onPageChange}
        pageSizeOptions={props.pageSizeOptions}
      /> */}

      <div className='t-list__column-layout'>
        {enableTableExpand && (
          <>
            {isTableExpand ? (
              <button
                className='t-list__expand-button -contract h-mr-6'
                type='button'
                onClick={toggleTableExpand}
              >
                元に戻す
              </button>
            ) : (
              <button
                className='t-list__expand-button h-mr-6'
                type='button'
                onClick={toggleTableExpand}
              >
                一覧を広げる
              </button>
            )}
          </>
        )}

        {!disableConfigHeader && (
          <VisibleChanger
            triggerText='列の表示設定'
            title='表示列の変更'
            list={props.columnsConfig}
            fixedColumnNumber={props.tableConfig.fixedColumnNumber}
            onChange={(columns) => props.changeColumns(columns)}
            screenCd={props.tableConfig.screenCd}
            tableId={props.tableConfig.tableId}
            removeDataSetting={removeDataSetting}
          />
        )}
      </div>
    </div >
  );
}
