/* eslint-disable max-lines */
/**
 * TODO: refactor all:
 * - use useEffect with single responsibility only!!!!!!!!!!!!!!!!!!!!!!!!!
 * - separate nested if else
 * - use small function
 */
import React, { useEffect, useCallback, useState, useRef, useContext, useLayoutEffect, useMemo } from 'react'
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import {
  ColumnConfig,
  ColumnsConfig,
  SortableQueries,
  DatatableContext,
  ColumnGroups,
} from 'soumu/blocks/datatable/datatable.component';
import { getFilterStored, removeFilterScreenList } from 'app/services/store-filter-screen';
import {
  tolerance,
} from './table.config';
import { TableContext } from './table.ctx';
import { TableTemplate } from './table.template';
import { DisplayItemsData } from './type';

export interface TableProps {
  children?: any;
  rowSize?: number[];
  columnsConfig: ColumnsConfig<any>;
  fixedNum?: number;
  hasMiddleHeader?: boolean;
  hasCheckBox?: boolean;
  hasRadio?: boolean;
  hasDrag?: boolean;
  hasUpperContent?: boolean;
  isHiddenCheckboxAll?: boolean;
  isHiddenTableHeader?: boolean;
  items?: any[];
  hiddenCheck?: number,
  onCheckboxChange?: (e: any) => void;
  onCheckboxCheckedInAll?: () => void;
  onRadioChange?: (e: any) => void;
  onSortChange?: (e: SortableQueries) => void;
  defaultSortedColumn?: any;
  selectedItems?: any[];
  updateColumnsVisible?: (columns: Array<any>) => void;
  updateOrderRows?: (e?) => void;
  selectItemTitle?: string;
  defaultItemSelected?: any;
  idProp?: string;
  isHiddenPulldownCheckAll?: boolean;
  columnGroups?: ColumnGroups;
  disableAllCheck?: boolean;
  showRadio?: (dataItem) => boolean;
  isHiddenAllCheck?: boolean;
  showCheckBox?: (dataItem) => boolean;
}

export function Table({
  // 列の幅 - number[]
  rowSize,

  // 列の見出し - string[]
  columnsConfig,
  // 固定する列の個数(チェックボックス、ラジオを除く) - number
  fixedNum = 0,
  // table has middle header
  hasCheckBox,
  // ラジオボタンが必要か - boolean
  hasRadio,
  //  ドラッグボタンが必要ですか -boolean
  hasDrag,
  // does the datatable have upper content
  hasUpperContent = false,
  // check show/hide checkbox all in table header template
  isHiddenCheckboxAll = false,
  // check show/hide header table template - boolean
  isHiddenTableHeader = false,
  // 表示するデータ
  items,
  // チェックボックスを非表示にする行番号 - number
  hiddenCheck,
  // チェックボックス変更時のイベント
  onCheckboxChange = (e?: any) => undefined,
  // すべてにチェックを選択された際のイベント
  onCheckboxCheckedInAll = () => undefined,
  // ラジオボタン変更時のイベント
  onRadioChange = (e?: any) => undefined,
  // ソード変更時のイベント
  onSortChange = (sort: SortableQueries) => undefined,
  // order rows
  updateOrderRows = (e?: any) => undefined,
  // ソートの初期値 - {label:string,direction:'asc'|'desc'}
  defaultSortedColumn,
  // update columns visible after go back
  updateColumnsVisible = (columnsVisible: Array<any>) => undefined,
  selectItemTitle = '',
  defaultItemSelected,
  idProp,
  isHiddenPulldownCheckAll = false,
  columnGroups,
  disableAllCheck = false,
  showRadio,
  isHiddenAllCheck,
  showCheckBox,
}: TableProps) {
  const dragIdxSubject = useMemo(() => new BehaviorSubject(null), []);
  const [sortedColumn, changeSortedColumn] = useState<SortableQueries>(defaultSortedColumn)
  const [hasColumnGroups, changeHasColumnGroups] = useState(false)
  const [hiddenCheckItemId, setHiddenCheckItemId] = useState(null)
  const datatableCtx = useContext(DatatableContext)
  const isItemsUpdateByDragDrop = useRef(false);
  const tbWrapLeftRef = useRef<{
    height: number,
    scrollTop: number,
  }>({
    height: 0,
    scrollTop: 0,
  });
  const selectItemSubject = datatableCtx.selectItemSubject;
  const displayItemsSubject = useMemo(() => new BehaviorSubject<DisplayItemsData>({ items: [], isLazy: true }), []);
  // TODO: rename to something like tableRefs
  const datatableRef = useRef({
    items,
    columnsConfig,
    currentPage: null,
    pageSize: null,
  });

  useEffect(() => {
    changeSortedColumn(defaultSortedColumn)
  }, [defaultSortedColumn])

  useEffect(() => {
    if (!isEqual(datatableRef.current.columnsConfig, datatableCtx.columnsConfig)
      && selectItemSubject.value.isSelectedAllItems) {
      datatableRef.current = {
        ...datatableRef.current,
        columnsConfig: datatableCtx.columnsConfig,
      }
      selectItemSubject.next({
        ...selectItemSubject.value,
      })
    }
  }, [datatableCtx.columnsConfig, selectItemSubject])

  useEffect(() => {
    if (
      (!isEqual(datatableRef.current.items, items)
        || !isEqual(datatableRef.current.currentPage, datatableCtx.currentPage)
        || !isEqual(datatableRef.current.pageSize, datatableCtx.pageSize)
      )
      && selectItemSubject.value.isSelectedAllItems
    ) {
      datatableRef.current = {
        ...datatableRef.current,
        items,
        currentPage: datatableCtx.currentPage,
        pageSize: datatableCtx.pageSize,
      }
      selectItemSubject.next({
        ...selectItemSubject.value,
        isSelectedAllItems: false,
      })
    }
  }, [items, datatableCtx.currentPage, datatableCtx.pageSize, selectItemSubject]);

  // 選択メニューの開閉 ~ Opening and closing the selection menu.
  const menuRef = useRef(null)

  // store scroll table
  const tableScrollStored = useRef(null)

  const tableWrapRef = useRef<HTMLElement>(null)

  useEffect(() => {
    selectItemSubject.next({
      ...selectItemSubject.value,
      checkedList: [],
      isSelectedAllItems: false,
    });
  }, [items, selectItemSubject])

  useEffect(() => {
    // Hande usecase exist value of defaultItemSelected and record contain checkbox
    if (hasCheckBox && Array.isArray(defaultItemSelected) && defaultItemSelected.length > 0) {
      const newCheckedList = items.filter(item => {
        return defaultItemSelected.findIndex(data => data[idProp] === item[idProp]) > -1;
      });

      // Handle usecase select all record in all page
      if (defaultItemSelected.length === datatableCtx.totalItem) {
        datatableRef.current = {
          items,
          columnsConfig: datatableCtx.columnsConfig,
          currentPage: datatableCtx.currentPage,
          pageSize: datatableCtx.pageSize,
        };

        selectItemSubject.next({
          ...selectItemSubject.value,
          isSelectedAllItems: false,
        });
      } else {
        selectItemSubject.next({
          ...selectItemSubject.value,
          checkedList: newCheckedList,
        });
      }
    }

    const filterStored = getFilterStored();

    if (filterStored) {
      filterStored.columnsVisible && updateColumnsVisible(filterStored.columnsVisible)

      tableScrollStored.current = {
        top: filterStored.table?.top || 0,
        tableLeftScroll: filterStored.table?.tableLeftScroll || 0,
        tableRightScroll: filterStored.table?.tableRightScroll || 0,
      }
      removeFilterScreenList()
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    defaultItemSelected,
    hasCheckBox,
    datatableCtx.totalItem,
    items,
    updateColumnsVisible,
  ])

  // scroll to top when there is new items
  useLayoutEffect(() => {
    const tableWrapperEle = tableWrapRef.current;

    if (items.length === 0) return;

    if (!tableWrapperEle) return

    tbWrapLeftRef.current = {
      height: 0,
      scrollTop: 0,
    };

    if (isItemsUpdateByDragDrop.current) {
      tbWrapLeftRef.current = {
        height: tableWrapperEle.querySelector('[data-table-wrap-left]').clientHeight,
        scrollTop: tableWrapperEle.querySelector('[data-table-wrap-left]').scrollTop,
      }

      isItemsUpdateByDragDrop.current = false;

      return;
    }

    tableWrapperEle.querySelector('[data-table-wrap-left]').scrollTop = 0
    tableWrapperEle.querySelector('[data-table-wrap-right]').scrollTop = 0
  }, [items])

  /**
   * convert item to DtItems
   */
  useEffect(() => {
    const newDtItems = items.map((_item, _i) => ({ ..._item, _actualIndex: _i }))

    loadDislayItems(newDtItems)
  }, [items])

  const lazyLoadTimer = useRef(null)

  const loadDislayItems = (dtItems) => {
    lazyLoadTimer.current && clearTimeout(lazyLoadTimer.current)
    prevScrollTop.current = 0;
    displayItemsSubject.next({ items: dtItems.slice(0, tolerance), isLazy: true });
    allItemsRef.current = dtItems;
    lazyLoadDisplayItems()
  }

  const lazyLoadDisplayItems = () => {
    lazyLoadTimer.current = setTimeout(() => {
      displayItemsSubject.next({ items: allItemsRef.current, isLazy: false });
    }, 0)
  }

  /**
   * TODO: refactor.
   * グルーピングの処理
   */
  useEffect(() => {
    if (!columnGroups) return

    const cellRange = (start, end, elements) =>
      elements.filter(
        (x, i) => {
          const index = hasRadio || hasCheckBox || hasDrag ? i - 1 : i;

          x.dataset.tableCellIndex = index

          return start <= index && index <= end
        },
      )

    const cells = Array.from(
      tableWrapRef.current.querySelectorAll('th.b-table__cell'),
    )

    // グルーピングの初期化
    cells.forEach((x) => {
      const label = x.querySelector('.b-table__cell-label')

      if (label) x.removeChild(label)

      x.classList.remove('.-has-label')
      x.classList.remove('.-last-has-label')
    })

    const duplicateFlags = []

    const groups = columnGroups
      .filter((x) => {
        // 固定列と非固定列にまたがるグルーピング
        if (x.startColumn < fixedNum && fixedNum <= x.endColumn) return false

        // start より end が若い
        if (x.endColumn < x.startColumn) return false

        return true
      })
      .map((x) => {
        let startRange = null
        let totalVisible = 0
        let totalInVisibleBefore = 0

        for (let i = x.startColumn; i <= x.endColumn; i++) {
          if (startRange === null && columnsConfig[i].isVisible) startRange = i

          if (!columnsConfig[i].isVisible) totalVisible++
        }

        if (startRange) {
          startRange = x.startColumn

          for (let i = 0; i < startRange; i++) {
            if (!columnsConfig[i].isVisible) totalInVisibleBefore++
          }
        }

        return {
          ...x,
          startRange: startRange - totalInVisibleBefore,
          endRange: x.endColumn - totalVisible - totalInVisibleBefore,
        }
      })
      .filter((x, i, arr) => {
        // グルーピングの重複（indexが後ろのものを除去する)
        if (duplicateFlags.includes(i) || (x.startRange < fixedNum && fixedNum <= x.endRange)) return false

        const duplicated = arr
          .map((y, j) =>
            i < j &&
              !duplicateFlags.includes(j) &&
              y.startRange <= x.endRange &&
              x.startRange <= y.endRange
              ? j
              : null,
          )
          .filter((y) => y !== null)

        duplicateFlags.push(...duplicated)

        return true
      })

    // ラベルの配置&クラスの変更
    groups.forEach((x) => {
      const targetCells = cellRange(x.startRange, x.endRange, cells);

      if (!targetCells.length) return

      changeHasColumnGroups(true)

      // add label
      const label = document.createElement('span')

      label.classList.add('b-table__cell-label')
      label.textContent = x.label

      let width = 0

      for (let i = 0; i < targetCells.length; i++) {
        width += (targetCells[i] as HTMLElement).clientWidth
      }

      label.style.width = `${width}px`

      targetCells[0].insertBefore(label, targetCells[0].firstChild)

      // add class
      targetCells.forEach((y) => y.classList.add('-has-label'))
      targetCells[targetCells.length - 1].classList.add('-last-has-label')
    })
  }, [columnsConfig, fixedNum, columnGroups])

  /**
   * スクロールの制御
   */
  let tbLeftWrapElement = undefined
  let tbLeftHeadElement = undefined
  let tbRightWrapElement = undefined
  let tbRightHeadElement = undefined
  let tbLeftScrollTop = 0
  let tbLeftScrollLeft = 0
  let tbRightScrollTop = 0
  let tbRightScrollLeft = 0

  // TODO: add these ref to datatableRef
  const prevScrollTop = useRef(0);
  const allItemsRef = useRef<any[]>([]);

  const handleTableScroll = (e: {
    target: {
      hasAttribute: (arg0: string) => any;
      scrollTop: number;
      scrollLeft: number
    }
  }) => {
    if (!e?.target) return

    (e as any).persist()

    // REMOVE
    const tableWrapperEle = tableWrapRef.current;
    const { scrollLeft: x, scrollTop: y } = e.target

    if (!tbLeftWrapElement) {
      tbLeftWrapElement = tableWrapperEle.querySelector('[data-table-wrap-left]')
    }

    if (!tbRightWrapElement) {
      tbRightWrapElement = tableWrapperEle.querySelector('[data-table-wrap-right]')
    }

    if (!tbRightHeadElement) {
      tbRightHeadElement = tableWrapperEle.querySelector('[data-table-right-head]')
    }

    if (!tbLeftHeadElement && !isHiddenTableHeader) {
      tbLeftHeadElement = tableWrapperEle.querySelector('[data-table-left-head]')
    }

    // Handle vertical scroll
    if (
      ((e.target.hasAttribute('data-table-wrap-left') && tbLeftScrollTop !== y)
        || (e.target.hasAttribute('data-table-wrap-right') && tbRightScrollTop !== y)) &&
      tbLeftWrapElement
    ) {
      tbLeftWrapElement.scrollTop = y
      tbRightWrapElement.scrollTop = y
      tbLeftScrollTop = y
      tbRightScrollTop = y
    }

    // Handle horizontal scroll for table left
    if ((e.target.hasAttribute('data-table-wrap-left') || e.target.hasAttribute('data-table-left-head'))
      && tbLeftScrollLeft !== x) {
      tbLeftHeadElement.scrollLeft = x
      tbLeftWrapElement.scrollLeft = x
      tbLeftScrollLeft = x
    }

    // Handle horizontal scroll for table right

    const hasRightTable =
      e.target.hasAttribute('data-table-wrap-right') ||
      e.target.hasAttribute('data-table-right-head');

    if (hasRightTable && tbRightScrollLeft !== x) {
      tbRightHeadElement.scrollLeft = x
      tbRightWrapElement.scrollLeft = x
      tbRightScrollLeft = x
    }

    if (hasRightTable && !tbRightWrapElement.scrollLeft) {
      tbRightHeadElement.scrollLeft = 0
      tbRightScrollLeft = 0
    }
  }

  const handleMarkerMove = useCallback(
    (event, value) => {
      const tableWrapEle = tableWrapRef.current;
      const marker: HTMLElement = tableWrapEle.querySelector('.b-table-drag-marker')
      const left = tableWrapEle
        ? tableWrapEle.getBoundingClientRect().left
        : 0

      marker.style.left = `${value - left}px`
      marker.style.display = event !== 'hidden' ? 'block' : 'none'
    },
    [tableWrapRef],
  )

  // ラジオボタンのチェックを変更
  const changeRadio = useCallback(
    (item) => () => {
      selectItemSubject.next({
        ...selectItemSubject.value,
        checkedList: [item],
      })
      onRadioChange(item)
    },
    [onRadioChange],
  )

  // チェックボックスのチェックのつけ外し
  const toggleCheck = (item) => () => {
    let newCheckedList;
    const { isSelectedAllItems } = selectItemSubject.value;

    // ???
    if (isSelectedAllItems) {
      newCheckedList = items.filter(data => {
        return data[idProp] !== item[idProp] && data[idProp] !== hiddenCheckItemId && !data?.disabled;
      })

      selectItemSubject.next({
        ...selectItemSubject.value,
        isSelectedAllItems: false,
        checkedList: newCheckedList,
      });
      onCheckboxChange(newCheckedList)

      return
    }

    const { checkedList } = selectItemSubject.value;

    newCheckedList = checkedList.filter(data => data[idProp] !== item[idProp] && data[idProp] !== hiddenCheckItemId)

    if (newCheckedList.length === checkedList.length) {
      newCheckedList.push(item);
    }

    selectItemSubject.next({
      ...selectItemSubject.value,
      isSelectedAllItems: false,
      checkedList: newCheckedList,
    });

    onCheckboxChange(newCheckedList)
  }

  // すべてのチェックボックスをチェック
  const addAllCheckInPage = useCallback(() => {
    const newItems = items.filter((value) => {
      return !value?.disabled;
    });

    selectItemSubject.next({
      ...selectItemSubject.value,
      checkedList: [...newItems.filter((_, i) => i !== hiddenCheck)],
      isSelectedAllItems: false,
    });

    onCheckboxChange([...newItems.filter((_, i) => i !== hiddenCheck)])
  }, [items, hiddenCheck, onCheckboxChange])

  // すべてのチェックボックスをチェック
  const addAllCheckInAll = useCallback(() => {
    datatableRef.current = {
      items,
      columnsConfig: datatableCtx.columnsConfig,
      currentPage: datatableCtx.currentPage,
      pageSize: datatableCtx.pageSize,
    }

    onCheckboxCheckedInAll()

    if (hiddenCheck > -1) {
      setHiddenCheckItemId(items[hiddenCheck][idProp])
    }

    selectItemSubject.next({
      ...selectItemSubject.value,
      isSelectedAllItems: true,
    });
  }, [items, onCheckboxCheckedInAll, datatableCtx.columnsConfig, datatableCtx.currentPage, datatableCtx.pageSize])

  // すべてのチェックボックスをクリア
  const clearAllCheck = useCallback(() => {
    selectItemSubject.next({
      ...selectItemSubject.value,
      checkedList: [],
      isSelectedAllItems: false,
    });
    onCheckboxChange([])
  }, [onCheckboxChange])

  // theadのチェックボックスがクリックされた際の挙動を制御
  const handleHeadCheckClick = useCallback(() => {
    const { checkedList, isSelectedAllItems } = selectItemSubject.value;

    if (disableAllCheck) {
      return;
    }

    if (items.length === checkedList.length || checkedList.length !== 0 || isSelectedAllItems) {
      clearAllCheck()
    } else if (isHiddenPulldownCheckAll) {
      addAllCheckInAll()
    }
  }, [clearAllCheck, items.length])

  // ソート変更時のイベント
  const sortChange = useCallback(
    (column: ColumnConfig) => () => {
      const direction = (!sortedColumn || sortedColumn.dataKey !== column.dataKey)
        ? 'desc' : (sortedColumn.type === 'desc' ? 'asc' : 'desc');

      changeSortedColumn({ dataKey: column.dataKey, type: direction });
      onSortChange({ dataKey: column.dataKey, type: direction });
    },
    [onSortChange, sortedColumn],
  )

  // handle when drag item
  const handleMoveItems = useCallback((oldDragIndex, hoverIndex, itemId) => {
    /**
     * IMPORTANT NOTE: use "dragIndex" base on "itemId" instead of "oldDragIndex" from
     * react-dnd because when moving item too fast, "oldDragIndex" will not refer to
     * correct current drag item.
     */
    let dragIndex;

    const itemValues = displayItemsSubject.getValue();
    const dtItems = itemValues.items;

    const dragCard = dtItems.find((item, idx) => {
      const found = item[idProp] === itemId;

      if (found) dragIndex = idx;

      return found;
    });

    isItemsUpdateByDragDrop.current = true;

    const newDtItems = update(dtItems, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    })

    // loadDislayItems(newDtItems);
    isItemsUpdateByDragDrop.current = true;
    displayItemsSubject.next({ items: newDtItems, isD2D: true, isLazy: false });
  }, [])

  const onRowDrop = useCallback(() => setTimeout(() => {
    isItemsUpdateByDragDrop.current = true;
    tbWrapLeftRef.current = {
      height: tableWrapRef.current.querySelector('[data-table-wrap-left]').clientHeight,
      scrollTop: tableWrapRef.current.querySelector('[data-table-wrap-left]').scrollTop,
    }
    updateOrderRows && updateOrderRows(displayItemsSubject.getValue().items)
  }), []);

  const startDragIdx = useRef(null);
  const currentDragIdx = useRef(null);
  const prevAction = useRef(null);

  return (
    <TableContext.Provider value={{
      dragIdxSubject,
      startDragIdx,
      currentDragIdx,
      prevAction,
    }}>
      <TableTemplate
        allItemsRef={allItemsRef}
        hasCheckBox={hasCheckBox}
        handleHeadCheckClick={handleHeadCheckClick}
        displayItemsSubject={displayItemsSubject}
        selectItemSubject={selectItemSubject}
        menuRef={menuRef}
        addAllCheckInAll={addAllCheckInAll}
        addAllCheckInPage={addAllCheckInPage}
        hasRadio={hasRadio}
        hasDrag={hasDrag}
        columnsConfig={columnsConfig}
        fixedNum={fixedNum}
        sortChange={sortChange}
        sortedColumn={sortedColumn}
        toggleCheck={toggleCheck}
        changeRadio={changeRadio}
        handleTableScroll={handleTableScroll}
        rowSizeList={rowSize}
        tableWrapRef={tableWrapRef}
        handleMarkerMove={handleMarkerMove}
        selectItemTitle={selectItemTitle}
        defaultItemSelected={defaultItemSelected}
        idProp={idProp}
        handleMoveItems={handleMoveItems}
        onRowDrop={onRowDrop}
        isHiddenCheckboxAll={isHiddenCheckboxAll}
        isHiddenTableHeader={isHiddenTableHeader}
        hiddenCheck={hiddenCheck}
        hasColumnGroups={hasColumnGroups}
        disableAllCheck={disableAllCheck}
        showRadio={showRadio}
        isHiddenPulldownCheckAll={isHiddenPulldownCheckAll}
        isHiddenAllCheck={isHiddenAllCheck}
        showCheckBox={showCheckBox}
        tbWrapLeftRef={tbWrapLeftRef.current}
      />
    </TableContext.Provider>
  )
}
