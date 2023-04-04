import React, { useState, useEffect, useCallback, useRef, ReactElement } from 'react';
import { ColumnConfig } from 'soumu/blocks/datatable/datatable.type';
import { resizeSensor } from 'app/services/dom';
import { isIE } from 'app/services/navigator';
import { checkboxWidth, radioWidth, dragWidth, calculatedScrollbarWidth, columnMinWidth } from './table.config';
import { hasLeftTableOnly } from './table.helper';

type ResizeColumnFunc = (resizedColIdx: number, value: number) => void;

type ChildProps = {
  isUseHozScroll: boolean;
  columnWidths: number[];
  handleResizeColumn: ResizeColumnFunc;
}

interface ColumnSizeProps {
  originalColWidths: number[];
  fixedColumnNumber: number;
  columnsConfig: ColumnConfig[];
  hasCheckBox: boolean;
  hasRadio: boolean;
  hasDrag: boolean;
  tableWrapRef: React.MutableRefObject<HTMLFormElement>,
  children: (props: ChildProps) => ReactElement;
}

const rightTableMinWidth = columnMinWidth + 150;

export function ColumnSize(props: ColumnSizeProps) {
  const [, updateDummyState] = useState(0);
  const markAsDirty = () => updateDummyState(n => n + 1);

  const stateRef = useRef({
    prevLastVisibleColIdx: null,
    prevLastVisibleColWidth: null,
    columnWidths: props.originalColWidths,
  });
  const debounceRef = useRef(null);
  const isUseHozScrollRef = useRef(false);

  const getVisibleColInfo = useCallback((columnWidths: number[], columnsConfig: ColumnConfig[]) => {
    const visibleColWidths = [];
    const visibleColIndexes = [];

    columnsConfig.forEach((columnCnf, idx) => {
      if (!columnCnf.isVisible) return;

      visibleColWidths.push(columnWidths[idx]);
      visibleColIndexes.push(idx);
    });

    return { visibleColWidths, visibleColIndexes };
  }, []);

  /**
   * Column that has radio/checkbox/drag is NOT resizable.
   * So, when calculating resizable container width, this column's width must be excluded.
   */
  const getResizableContainerWidth = useCallback(() => {
    if (!props.tableWrapRef.current) return 0;

    let resizableContainerWidth = props.tableWrapRef.current.clientWidth;

    if (props.hasRadio) {
      resizableContainerWidth -= radioWidth;
    }

    if (props.hasCheckBox) {
      resizableContainerWidth -= checkboxWidth;
    }

    if (props.hasDrag) {
      resizableContainerWidth -= dragWidth;
    }

    return resizableContainerWidth; // TODO: - calculatedScrollbarWidth;
  }, [
    props.tableWrapRef,
    props.hasRadio,
    props.hasCheckBox,
    props.hasDrag,
  ]);

  /**
   * Sync "columnWidths" with "originalColWidths" from client code,
   * this allow to support dynamic config for table.
   */
  useEffect(() => {
    // const originalColWidths = [...props.originalColWidths];
    // const resizableContainerWidth = getResizableContainerWidth();
    // const { visibleColIndexes, visibleColWidths } = getVisibleColInfo(props.originalColWidths, props.columnsConfig);
    // const visibleColWidth = visibleColWidths.reduce((prev, current) => current + prev, 0);

    // // arrange columns width to fit will with large container.
    // if (visibleColWidth < resizableContainerWidth) {
    //   visibleColIndexes.forEach(colIdx => {
    //     originalColWidths[colIdx] = (originalColWidths[colIdx] * resizableContainerWidth) / visibleColWidth;
    //   });
    // }

    stateRef.current.columnWidths = props.originalColWidths;
    stateRef.current.prevLastVisibleColIdx = null;
    stateRef.current.prevLastVisibleColWidth = null;
  }, [
    // getResizableContainerWidth,
    // getVisibleColInfo,
    props.originalColWidths,
    // props.columnsConfig,
  ]);

  const calculateFixedTableSize = useCallback(
    (fixedTableSizeList) => (
      fixedTableSizeList.reduce((p, c) => p + c, 0) +
      (props.hasCheckBox ? checkboxWidth : 0) +
      (props.hasRadio ? radioWidth : 0) +
      (props.hasDrag ? dragWidth : 0)
    ),
    [props.hasCheckBox, props.hasRadio, props.hasDrag],
  );

  /**
   * Calculate and manipulate direct into table HTML.
   */
  const setHtmlElementsWidth = useCallback((newColWidths: number[]) => {
    // TODO: use different name for tableWrapRef because
    // it cause a little confusion with [data-table-wrap]
    const tableWrapperEle = props.tableWrapRef.current;

    if (!tableWrapperEle) return;

    const tableWrapElement: HTMLElement = tableWrapperEle.querySelector('[data-table-wrap]');
    const tableWrapLeftEle: HTMLElement = tableWrapperEle.querySelector('[data-table-wrap-left]');
    const tableLeftEle: HTMLElement = tableWrapperEle.querySelector('[data-table-left]');
    const tableLeftHeadEle: HTMLElement = tableWrapperEle.querySelector('[data-table-left-head]');
    const tableWrapRightEle: HTMLElement = tableWrapperEle.querySelector('[data-table-wrap-right]');
    const tableRightEle: HTMLElement = tableWrapperEle.querySelector('[data-table-right]');
    const tableRightHeadEle: HTMLElement = tableWrapperEle.querySelector('[data-table-right-head]');
    const tableRightRowHeadEle: HTMLElement = tableWrapperEle.querySelector('[data-table-right-row]');

    const isDisplayLeftTableOnly = hasLeftTableOnly(props.fixedColumnNumber, props.columnsConfig);

    const leftTableWidth = calculateFixedTableSize(
      newColWidths.slice(0, props.fixedColumnNumber),
    );

    const rightTableWidth = !isDisplayLeftTableOnly
      ? newColWidths
        .filter((_, i) => i >= props.fixedColumnNumber && props.columnsConfig[i]?.isVisible)
        .reduce((p, c) => p + c, 0)
      : 0;

    const wrapTableWidth = isDisplayLeftTableOnly ? leftTableWidth : props.tableWrapRef.current.clientWidth;
    /** Whether when datatable has 2 table, right table > datatable's width or not. */
    const isLeftTableExceedMaxWidth =
      !isDisplayLeftTableOnly &&
      leftTableWidth + rightTableMinWidth >= wrapTableWidth;

    let rightTableVisibleWidth = wrapTableWidth - leftTableWidth;

    rightTableVisibleWidth < 0 && (rightTableVisibleWidth = 0)

    tableWrapLeftEle.style.width = `${leftTableWidth}px`;
    tableLeftEle.style.width = `${leftTableWidth}px`;
    tableLeftHeadEle && (tableLeftHeadEle.style.width = `${leftTableWidth}px`);

    tableWrapRightEle.style.width = `${(isLeftTableExceedMaxWidth ? rightTableWidth : rightTableVisibleWidth)}px`;
    tableRightEle.style.width = `${rightTableWidth}px`;
    tableRightHeadEle.style.width = `${isLeftTableExceedMaxWidth ? rightTableWidth : rightTableVisibleWidth}px`;
    tableRightRowHeadEle.style.width = `${rightTableWidth + calculatedScrollbarWidth}px`;

    // 左テーブルがはみ出してないかチェック ~ Check if the left table is sticking out
    const isLeftTableStickingOut = tableWrapperEle.clientWidth < leftTableWidth + rightTableMinWidth;

    if (
      // !isDisplayLeftTableOnly &&
      isLeftTableStickingOut &&
      leftTableWidth + rightTableMinWidth > tableWrapperEle.clientWidth // ?? ! isLeftTableStickingOut
    ) {
      if (isLeftTableExceedMaxWidth) {
        // allow to use hoz scroll for whole datatable
        tableWrapElement.style.width = `${leftTableWidth + rightTableWidth}px`;
      } else {
        tableWrapElement.style.width = `${wrapTableWidth}px`;
      }

      isUseHozScrollRef.current = true;
      tableWrapperEle.style.overflowX = 'auto';
      tableWrapRightEle.style.overflow = 'hidden';
      tableWrapRightEle.style.overflowY = 'auto';
    } else {
      isUseHozScrollRef.current = false;
      tableWrapElement.style.width = `${wrapTableWidth}px`;

      // For resize window
      tableWrapperEle.style.overflowX = isIE ? 'hidden' : 'initial';
      tableWrapRightEle.style.overflow = 'auto';
    }
  }, [calculateFixedTableSize, props.tableWrapRef, props.columnsConfig, props.fixedColumnNumber])

  const arrangeColumns = useCallback(() => {
    const { prevLastVisibleColIdx, prevLastVisibleColWidth } = stateRef.current;
    // const { columnWidths } = stateRef.current;
    const newColWidths: number[] = [...props.originalColWidths];

    // Temporarily reset width of previous last visible column.
    if (prevLastVisibleColIdx && prevLastVisibleColWidth) {
      // newColWidths[prevLastVisibleColIdx] = prevLastVisibleColWidth;
      stateRef.current.columnWidths = newColWidths;
    }

    const leftTableWidth = calculateFixedTableSize(
      newColWidths.filter((_, i) => i < props.fixedColumnNumber && props.columnsConfig[i]?.isVisible),
    );

    const isDisplayLeftTableOnly = hasLeftTableOnly(props.fixedColumnNumber, props.columnsConfig);

    // If table have both left and right table, left table max width
    // must be less than colSizeWrapperRef.current.clientWidth - rightTableMinWidth
    if (!isDisplayLeftTableOnly && leftTableWidth + rightTableMinWidth > props.tableWrapRef.current.clientWidth) {
      for (let i = 0; i < props.fixedColumnNumber; i++) {
        newColWidths[i] = props.originalColWidths[i];
      }
    }

    const resizableContainerWidth = getResizableContainerWidth();
    const { visibleColWidths, visibleColIndexes } = getVisibleColInfo(newColWidths, props.columnsConfig);
    const visibleRowWidth = visibleColWidths.reduce((p, c) => p + c, 0);
    const lastVisibleColIdx = visibleColIndexes[visibleColIndexes.length - 1];

    stateRef.current.prevLastVisibleColIdx = lastVisibleColIdx;
    stateRef.current.prevLastVisibleColWidth = newColWidths[lastVisibleColIdx];

    if (visibleRowWidth < resizableContainerWidth) {
      let totalWidth = 0;

      visibleColIndexes.forEach(colIndex => {
        if (colIndex < lastVisibleColIdx) {
          const newColWidth = newColWidths[colIndex] * resizableContainerWidth / visibleRowWidth;

          totalWidth += newColWidth;
          newColWidths[colIndex] = newColWidth;
        } else {
          newColWidths[colIndex] = resizableContainerWidth - totalWidth;
        }
      })

      // newColWidths[lastVisibleColIdx] = newColWidths[lastVisibleColIdx] + (resizableContainerWidth - visibleRowWidth)
    }

    stateRef.current.columnWidths = newColWidths;

    setHtmlElementsWidth(newColWidths);

    markAsDirty();
  }, [
    // Note: be careful when adding dependency to exist code, bugs = dependencies^n.
    calculateFixedTableSize,
    setHtmlElementsWidth,
    getVisibleColInfo,
    getResizableContainerWidth,
    props.tableWrapRef,
    props.fixedColumnNumber,
    props.columnsConfig,
    props.originalColWidths,
  ]);

  /**
   * @param resizedColIdx This is index of a column inside "props.columnsConfig".
   * @param distance Distance(+/-) after resizing column at "resizedColIdx".
   */
  const handleResizeColumn = useCallback<ResizeColumnFunc>((resizedColIdx, distance) => {
    const { columnWidths, prevLastVisibleColIdx, prevLastVisibleColWidth } = stateRef.current;
    const newColWidths = [...columnWidths];

    newColWidths[resizedColIdx] = newColWidths[resizedColIdx] + distance;

    // // When datatable has 2 table, below code will prevent left table from exceed max width
    // const isDisplayLeftTableOnly = hasLeftTableOnly(props.fixedColumnNumber, props.columnsConfig);
    // const leftTableWidth = calculateFixedTableSize(
    //   newColWidths.filter((_, i) => i < props.fixedColumnNumber && props.columnsConfig[i]?.isVisible),
    // );

    // // If table have both left and right table, left table max width
    // // must be less than colSizeWrapperRef.current.clientWidth - rightTableMinWidth
    // if (
    //   !isDisplayLeftTableOnly &&
    //   leftTableWidth + rightTableMinWidth > props.tableWrapRef.current.clientWidth &&
    //   distance > 0
    // ) {
    //   return;
    // }

    // Temporarily reset width of previous last visible column.
    if (prevLastVisibleColIdx) {
      newColWidths[prevLastVisibleColIdx] = prevLastVisibleColWidth;
      stateRef.current.columnWidths = newColWidths;
    }

    const resizableContainerWidth = getResizableContainerWidth();
    const { visibleColIndexes } = getVisibleColInfo(newColWidths, props.columnsConfig);
    const newVisibleRowWidth = visibleColIndexes.reduce((p, _, i) => p + newColWidths[i], 0);

    if (newVisibleRowWidth < resizableContainerWidth) {
      const lastVisibleColIdx = visibleColIndexes[visibleColIndexes.length - 1];

      newColWidths[lastVisibleColIdx] =
        newColWidths[lastVisibleColIdx] + (resizableContainerWidth - newVisibleRowWidth);
    }

    stateRef.current.columnWidths = newColWidths;

    setHtmlElementsWidth(newColWidths);

    markAsDirty();
  }, [
    // Note: be careful when adding dependency to exist code, bugs = dependencies^n.
    // calculateFixedTableSize,
    setHtmlElementsWidth,
    getResizableContainerWidth,
    getVisibleColInfo,
    // props.tableWrapRef,
    // props.fixedColumnNumber,
    props.columnsConfig,
  ]);

  const prevTableWrapWidth = useRef<number>();

  useEffect(() => {
    arrangeColumns();

    const tableWrapEle = props.tableWrapRef.current;

    prevTableWrapWidth.current = tableWrapEle.clientWidth;

    return resizeSensor(tableWrapEle, () => {
      if (prevTableWrapWidth.current === tableWrapEle.clientWidth) {
        return;
      }

      arrangeColumns();
      prevTableWrapWidth.current = tableWrapEle.clientWidth;
    });
  }, [
    arrangeColumns,
    calculateFixedTableSize,
    setHtmlElementsWidth,
    getVisibleColInfo,
    getResizableContainerWidth,
    props.fixedColumnNumber,
    props.columnsConfig,
    props.originalColWidths,
    props.tableWrapRef,
  ]);

  const handleResizeWindow = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const { columnWidths } = stateRef.current;

      setHtmlElementsWidth([...columnWidths]);
    })
  }, [setHtmlElementsWidth])

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow)

    return () => window.removeEventListener('resize', handleResizeWindow);
  }, [handleResizeWindow]);

  return (
    <form className='h-position-relative' ref={props.tableWrapRef}>
      {props.children({
        isUseHozScroll: isUseHozScrollRef.current,
        columnWidths: stateRef.current.columnWidths,
        handleResizeColumn,
      })}
    </form>
  );
}
