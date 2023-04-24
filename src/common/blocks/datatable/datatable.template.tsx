import React, { useEffect, useContext, useRef } from 'react'
import clsx from 'clsx'
// import { DataTable } from './datatable.component';
import { DatatableContext } from './datatable.context'
import { HeaderLowerTemplateProps } from './datatable.type'
import HeaderLowerTemplate from './header-lower.template';
import { Table } from './table'

interface DataTableTemplateProps {
  self: any;
  totalItem: number;
  pageSize: number;
  headerMiddleData: any;
  hiddenCheck?: number
  hasUpperContent?: boolean;
  isHiddenCheckboxAll?: boolean;
  isHiddenPulldownCheckAll?: boolean;
  isHiddenTableHeader?: boolean;
  disableAllCheck?: boolean;
  isHiddenAllCheck?: boolean;
}

export default function DataTableTemplate({
  self,
  totalItem,
  pageSize,
  headerMiddleData,
  hiddenCheck,
  hasUpperContent = false,
  isHiddenCheckboxAll = false,
  isHiddenPulldownCheckAll = false,
  isHiddenTableHeader = false,
  disableAllCheck = false,
  isHiddenAllCheck = false,
}: DataTableTemplateProps) {
  const datatableProps = self.props;
  const datatableCtx = useContext(DatatableContext);
  const datatableWrapRef = useRef<HTMLElement>(null)
  const { currentPage, columnsConfig, tableConfig, isTableExpand } = datatableCtx;

  useEffect(() => {
    if (!self.props.innerRef) {
      return;
    }

    self.props.innerRef.current = datatableCtx;
  }, [datatableCtx, self.props.innerRef]);

  const lowerHeaderBlockProps: HeaderLowerTemplateProps = {
    tableConfig,
    columnsConfig,
    onPageChange: self.onPageChange,
    currentPage,
    totalItem,
    pageSize: pageSize || 20,
    changeColumns: self.onChangeColumns,
    pageSizeOptions: self.pageSizeOptions,
  };

  return (
    <section className='b-datatable' ref={datatableWrapRef} data-datatable>
      {!tableConfig?.hideHeader && <header className='b-datatable__header' data-datatable-header>
        <div className={clsx({ 'h-d_none': isTableExpand })}>
          {tableConfig.headerMiddle && (
            <tableConfig.headerMiddle
              onSearch={self.onSearch}
              setFilter={self.setFilter}
              setRef={self.setRef}
              data={headerMiddleData}
            />
          )}
        </div>

        {tableConfig.headerLower !== null && (
          tableConfig.headerLower
            ? <tableConfig.headerLower {...lowerHeaderBlockProps} />
            : <HeaderLowerTemplate {...lowerHeaderBlockProps} />
        )}
      </header>}

      <div
        data-datatable-table-list
        className={clsx(
          't-list__table-area',
          { 'h-m-0': isHiddenTableHeader },
        )}
      >
        <Table
          defaultSortedColumn={self.getDefaultSortedColumn()}
          selectedItems={datatableProps.selectedItems}
          columnsConfig={columnsConfig}
          fixedNum={datatableProps.tableConfig.disableFixedColumn ? 0 : (tableConfig.fixedColumnNumber || 1)}
          hasMiddleHeader={!!datatableProps.tableConfig.headerMiddle}
          hasCheckBox={datatableProps.selectItemType === 'checkbox'}
          hasRadio={datatableProps.selectItemType === 'radio'}
          hasDrag={datatableProps.hasDrag}
          hasUpperContent={hasUpperContent}
          isHiddenCheckboxAll={isHiddenCheckboxAll}
          isHiddenTableHeader={isHiddenTableHeader}
          items={datatableProps.dataItems}
          onRadioChange={value => datatableProps.onItemSelect([value], false)}
          onCheckboxChange={value => datatableProps.onItemSelect(value, false)}
          onCheckboxCheckedInAll={() => datatableProps.onItemSelect([], true)}
          onSortChange={self.onSort}
          rowSize={tableConfig.rowSizes}
          updateColumnsVisible={self.updateColumnsVisible}
          updateOrderRows={self.updateOrderRows}
          selectItemTitle={datatableProps.selectItemTitle}
          defaultItemSelected={datatableProps.defaultItemSelected}
          idProp={tableConfig.idProp}
          isHiddenPulldownCheckAll={isHiddenPulldownCheckAll}
          hiddenCheck={hiddenCheck}
          columnGroups={tableConfig.columnGroups}
          disableAllCheck={disableAllCheck}
          showRadio={tableConfig.showRadio}
          isHiddenAllCheck={isHiddenAllCheck}
          showCheckBox={tableConfig.showCheckBox}
        />
      </div>
    </section>
  )
}
