import React, { useState, useEffect, useLayoutEffect, useMemo, useContext, useCallback, useRef } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';
import { closest } from 'app/services/dom'
import { getFilterStored, removeFilterScreenList, updateScrollTable } from 'app/services/store-filter-screen';
import { DatatableContext } from '../datatable.context';
import { ColumnsConfig } from '../datatable.type';
import { RightTableRow } from './right-table-row.template';
import { calculatedScrollbarWidth, normalTableHeaderHeight, tableMinHeight } from './table.config';
import { hasLeftTableOnly } from './table.helper';
import { DisplayItemsData, DatatablePosition } from './type';

interface RightTableContentProps {
  displayItemsSubject: BehaviorSubject<DisplayItemsData>,
  selectItemSubject: Subject<any>,
  columnsConfig: ColumnsConfig,
  fixedNum: number,
  rowSizeList: number[],
  idProp: string,
  hasDrag: boolean,
  tableWrapEle: HTMLDivElement,
  /** Index */
  hiddenCheck: number,
  defaultItemSelected,
  isUseHozScroll: boolean,
  tbWrapLeftRef: {
    height: number,
    scrollTop: number,
  },
}

// TODO: add type
export function RightTableContent({
  displayItemsSubject,
  selectItemSubject,
  columnsConfig,
  fixedNum,
  rowSizeList,
  idProp,
  hasDrag,
  tableWrapEle,
  hiddenCheck,
  defaultItemSelected,
  isUseHozScroll,
  tbWrapLeftRef,
}: RightTableContentProps) {
  const datatableCtx = useContext(DatatableContext);
  const [items, setItems] = useState([]);
  const tableScrollStored = useRef<DatatablePosition>(null)
  const isLazyRenderItems = useRef<boolean>(true)
  const isUsingD2D = useRef<boolean>(false);
  const isRestoringScrollPosition = useRef<boolean>(false);

  // use observer to get new display items.
  useEffect(() => {
    const selectItemSub = displayItemsSubject.subscribe(data => {
      isLazyRenderItems.current = data.isLazy;
      isUsingD2D.current = data.isD2D;
      setItems(data.items);
    });

    return () => selectItemSub.unsubscribe();
  }, [displayItemsSubject]);

  // save previous table position
  useEffect(() => {
    // debt: IOC.
    const filterStored = getFilterStored();

    if (!filterStored) {
      return;
    }

    tableScrollStored.current = {
      top: filterStored.table?.top || 0,
      tableLeftScroll: filterStored.table?.tableLeftScroll || 0,
      tableRightScroll: filterStored.table?.tableRightScroll || 0,
    };

    removeFilterScreenList();
  }, [])

  const setHeight = useCallback(() => {
    const tableWrapperEle = tableWrapEle;
    const tableLeftRowElements: NodeListOf<HTMLDivElement> =
      tableWrapperEle.querySelectorAll('[data-table-left-row].-left');
    const tableRightRowElements: NodeListOf<HTMLDivElement> =
      tableWrapperEle.querySelectorAll('[data-table-right-row].-right');

    if (tableLeftRowElements.length !== items.length) return;

    for (let i = 0; i < tableLeftRowElements.length; i++) {
      tableLeftRowElements[i].style.height = 'auto';
      tableRightRowElements[i].style.height = 'auto';

      const leftHeight = tableLeftRowElements[i].clientHeight;
      const rightHeight = tableRightRowElements[i].clientHeight;
      const maxHeight = Math.max(leftHeight, rightHeight);

      tableLeftRowElements[i].style.height = maxHeight + 'px';
      tableRightRowElements[i].style.height = maxHeight + 'px';
    }

    const tableWrap = tableWrapperEle.querySelector('[data-table-wrap]');
    const tableWrapRightEle = tableWrapperEle.querySelector('[data-table-wrap-right]');
    const hasHozScroll = tableWrapRightEle.scrollHeight > tableWrap.clientHeight;
    const isDisplayLeftTableOnly = hasLeftTableOnly(fixedNum, columnsConfig)
    const tableRightWrapElement: HTMLElement = tableWrapperEle.querySelector('[data-table-wrap-right]');
    const tableLeftWrapElement: HTMLElement = tableWrapperEle.querySelector('[data-table-wrap-left]')

    /**
     * THIS - document.querySelector, is TEMPORARY solution, it MUST be removed if there is other solution!!!
     */
    const footerFixedMenu: HTMLElement = document.querySelector('.u-footer-fixed-menu')
    const modalWrapTable = closest(tableWrap, '.b-modal__inner');

    if (hasHozScroll) {
      tableWrap.classList.add('-has-scroll')
    } else {
      tableWrap.classList.remove('-has-scroll')
    }

    // tbWrapLeftRef: case drop, exist data when end drag else case normal
    tableLeftWrapElement.style.height = tbWrapLeftRef.height ? `${tbWrapLeftRef.height}px` : '';
    tableRightWrapElement.style.height = tbWrapLeftRef.height ? `${tbWrapLeftRef.height}px` : '';

    if (tbWrapLeftRef.height) {
      tableWrapperEle.querySelector('[data-table-wrap-left]').scrollTop = tbWrapLeftRef.scrollTop;
    }

    let maxHeight;

    if (modalWrapTable) {
      maxHeight = window.innerHeight
        - tableWrapperEle.getBoundingClientRect().top
        - normalTableHeaderHeight
        - (modalWrapTable.querySelector('.b-modal__footer') ? 64 : 0) // modal footer
        - 20 // margin content modal to bottom modal
        - 40; // margin bottom modal to bottom window browser

      if (modalWrapTable.querySelectorAll('[data-table-wrap]').length > 1) {
        maxHeight = tableMinHeight;
      }
    } else {
      maxHeight =
        window.innerHeight -
        (document.documentElement.scrollTop
          ? tableWrapperEle.getBoundingClientRect().top + document.documentElement.scrollTop
          : tableWrapperEle.getBoundingClientRect().top
        ) - 12 // 余白
        - normalTableHeaderHeight // table header height
        - (footerFixedMenu?.offsetHeight || 0) // action bar height
        - (isUseHozScroll ? 16 : 0);
    }

    // Note: above maxHeight will NOT correct when table is not displayed above the fold.
    if (maxHeight < tableMinHeight) {
      maxHeight = tableMinHeight;
    }

    let tableHeight = maxHeight;

    const isTableRightHasHozScroll = tableRightWrapElement.scrollWidth > tableRightWrapElement.clientWidth;

    if (isTableRightHasHozScroll) {
      tableHeight += calculatedScrollbarWidth;
    }

    tableHeight = Math.min(maxHeight, tableHeight);

    if (datatableCtx.maxHeight && tableHeight > datatableCtx.maxHeight) {
      tableHeight = datatableCtx.maxHeight;
    }

    if (tableHeight < tableMinHeight) {
      tableHeight = tableMinHeight;
    }

    if (tableRightWrapElement.scrollHeight < tableHeight) {
      tableHeight = tableRightWrapElement.scrollHeight + calculatedScrollbarWidth;
    }

    if (!isDisplayLeftTableOnly) {
      tableRightWrapElement.style.height = tableHeight + 'px'
      tableLeftWrapElement.style.height = tableRightWrapElement.clientHeight + 'px';
    } else {
      tableRightWrapElement.style.height = tableHeight + 'px'
      tableLeftWrapElement.style.height = tableHeight + 'px';
    }

    const handleOffsetTable = () => {
      if (!footerFixedMenu || !footerFixedMenu.offsetHeight) return;

      const latestTable = footerFixedMenu.previousElementSibling.hasAttribute('data-datatable') ?
        footerFixedMenu.previousElementSibling :
        null;

      if (latestTable && maxHeight <= tableMinHeight) {
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight,
        );

        if (
          documentHeight >= (window.innerHeight - footerFixedMenu.offsetHeight) &&
          documentHeight <= window.innerHeight
        ) {
          (latestTable as HTMLElement).style.marginBottom =
            `${footerFixedMenu.offsetHeight - (window.innerHeight - documentHeight) + 12}px`; // 12 余白
        } else if (documentHeight > window.innerHeight) {
          (latestTable as HTMLElement).style.marginBottom = `${footerFixedMenu.offsetHeight + 12}px`; // 12 余白
        }
      } else if (latestTable && (latestTable as HTMLElement).style.marginBottom) {
        (latestTable as HTMLElement).style.marginBottom = '0px';
      }
    }

    handleOffsetTable();
  }, [
    tableWrapEle, items.length, fixedNum, columnsConfig, tbWrapLeftRef.height, tbWrapLeftRef.scrollTop,
    datatableCtx.maxHeight, isUseHozScroll,
  ])

  useLayoutEffect(() => {
    if (!tableWrapEle) return;

    // prevent rerun after restoring datatable position.
    if (isRestoringScrollPosition.current) {
      isRestoringScrollPosition.current = false;

      return;
    }

    if (isLazyRenderItems.current) {
      const tableWrapRightEle = tableWrapEle.querySelector('[data-table-wrap-right]');
      const shouldSetHeighImmediately = tableWrapRightEle.scrollTop === 0;

      if (!shouldSetHeighImmediately) return;
    }

    // prevent scroll to top when using drag&drop
    if (isUsingD2D.current) {
      return;
    }

    setHeight();
  }, [rowSizeList, tableWrapEle, items, setHeight]);

  // restore datatable position.
  useLayoutEffect(() => {
    const shouldNotRestoreScroll =
      !tableWrapEle || items.length === 0 ||
      isLazyRenderItems.current || !tableScrollStored.current;

    if (shouldNotRestoreScroll) return;

    updateScrollTable(tableWrapEle, tableScrollStored.current);

    isRestoringScrollPosition.current = !!tableScrollStored.current;
    isLazyRenderItems.current = true;
    tableScrollStored.current = null;
  }, [tableWrapEle, items]);

  useLayoutEffect(() => {
    if (!tableWrapEle || !items.length) return;

    const tableWrapperEle = tableWrapEle;
    const tableRight = tableWrapperEle.querySelector('[data-table-wrap-right]');
    const tableHeadRight = tableWrapperEle.querySelector('[data-table-right-head]')

    if (tableRight.scrollLeft !== tableHeadRight.scrollLeft) {
      tableRight.scrollLeft = tableHeadRight.scrollLeft
    }
  }, [items, tableWrapEle])

  const [rightTableDisplayColumns, rightTableRowSize] = useMemo(
    () => {
      if (rowSizeList.length !== columnsConfig.length) {
        return [[], []];
      }

      const rightTableDisplayColumns = columnsConfig
        .slice(fixedNum)
        .filter((conf) => conf.isVisible);

      const rightTableRowSize = rowSizeList
        .slice(fixedNum)
        .filter((_, index) => columnsConfig[fixedNum + index].isVisible);

      return [rightTableDisplayColumns, rightTableRowSize];
    }, [columnsConfig, fixedNum, rowSizeList],
  )

  return (
    <>
      {items.map((item, i) => (
        <RightTableRow
          // Adding "i" to make sure key will be unique no matter people use fa ke "idProp".
          key={`${i}.${item[idProp]}`}
          rowClassCb={datatableCtx.rowClass}
          displayColumns={rightTableDisplayColumns}
          rightTableRowSize={rightTableRowSize}
          rowSizeList={rowSizeList}
          hasDrag={hasDrag}
          selectItemSubject={selectItemSubject}
          columnsConfig={columnsConfig}
          fixedNum={fixedNum}
          idProp={idProp}
          item={item}
          index={i}
          tableWrapEle={tableWrapEle}
          hiddenCheck={hiddenCheck}
          defaultItemSelected={defaultItemSelected}
        />
      ))}
    </>
  )
}
