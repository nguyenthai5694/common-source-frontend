import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import clsx from 'clsx'
import useOnClickOutside from 'app/hooks/use-on-click-outside.hook'
import ColumnResize from './resize.component'

// TODO: add type
export function TableHeader({
  allItemsRef,
  selectItemSubject,
  handleTableScroll,
  hasCheckBox,
  isHiddenCheckboxAll,
  handleHeadCheckClick,
  disableAllCheck,
  items,
  hiddenCheck,
  menuRef,
  addAllCheckInAll,
  addAllCheckInPage,
  hasRadio,
  hasDrag,
  selectItemTitle,
  columnsConfig,
  fixedNum,
  sortedColumn,
  sortChange,
  handleRowResize,
  handleMarkerMove,
  rowSizeList,
  isHiddenPulldownCheckAll,
  isHiddenAllCheck,
  showCheckBox,
}) {
  const [isMenuOpen, changeIsMenuOpen] = useState(false)
  const [ariaChecked, setAriaChecked] = useState<boolean | 'false' | 'mixed' | 'true'>('false');
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedAllInPage, setIsCheckedAllInPage] = useState(false);
  const checkAllTarget = useRef(null)
  const menuDomRec = useRef({} as DOMRect);

  useOnClickOutside(menuRef, () => changeIsMenuOpen(false)) // ボックス外クリックで閉じる

  useEffect(() => {
    selectItemSubject.subscribe(data => {
      const { checkedList, isSelectedAllItems } = data;

      if (showCheckBox) {
        const allItemsRefListFilter = allItemsRef.current.filter((item) => showCheckBox(item));
        const checkedListFilter = checkedList.filter((item) => showCheckBox(item));
        const ariaChecked = ((allItemsRefListFilter.length &&
          allItemsRefListFilter.length === checkedListFilter.length) ||
          (hiddenCheck > 0 && allItemsRefListFilter.length === checkedListFilter.length + 1) || isSelectedAllItems)
          ? 'true'
          : checkedListFilter.length !== 0
            ? 'mixed'
            : 'false';

        setAriaChecked(ariaChecked);
        setIsChecked(allItemsRef.current.length === checkedList.length || isSelectedAllItems);
        setIsCheckedAllInPage(allItemsRef.current.length === checkedList.length)
        changeIsMenuOpen(false)
      } else {
        const ariaChecked = ((allItemsRef.current.length && allItemsRef.current.length === checkedList.length) ||
          (hiddenCheck > 0 && allItemsRef.current.length === checkedList.length + 1) || isSelectedAllItems)
          ? 'true'
          : checkedList.length !== 0
            ? 'mixed'
            : 'false';

        setAriaChecked(ariaChecked);
        setIsChecked(allItemsRef.current.length === checkedList.length || isSelectedAllItems);
        setIsCheckedAllInPage(allItemsRef.current.length === checkedList.length)
        changeIsMenuOpen(false)
      }
    });
    // return () => sub.unsubscribe();
    //                  unsubscribe
    // eslint-disable-next-line
  }, [items])

  useLayoutEffect(() => {
    const closeSelectBoxScrolling = (event) => {
      if (!isMenuOpen) return;

      changeIsMenuOpen(false)
    }

    document.addEventListener('scroll', closeSelectBoxScrolling, true);

    return () => document.removeEventListener('scroll', closeSelectBoxScrolling, true)
  }, [changeIsMenuOpen, isMenuOpen])

  const checkHead = () => {
    const { checkedList, isSelectedAllItems } = selectItemSubject.value;

    let newCheckedList = checkedList;

    if (showCheckBox) {
      newCheckedList = newCheckedList?.filter((item) => showCheckBox(item))
    }

    if (disableAllCheck) {
      return;
    }

    if (allItemsRef.current.length === newCheckedList.length || newCheckedList.length !== 0 || isSelectedAllItems
      || isHiddenPulldownCheckAll) {
      handleHeadCheckClick();
    } else {
      menuDomRec.current = (menuRef.current as HTMLElement).getBoundingClientRect();
      changeIsMenuOpen(true)
    }
  }

  const handleKeyUpCheckAll = (event) => {
    const ENTER = 13;
    const SPACE = 32;

    if (disableAllCheck) return;

    if (![ENTER, SPACE].includes(event.keyCode)) return;

    checkHead();

    const listItem = (checkAllTarget.current as HTMLElement).firstElementChild;
    const item = (listItem as HTMLElement).querySelector('input');

    if (item !== null) {
      setTimeout(function () {
        item.focus();
      }, 10);
    }

    return;
  }

  const handleKeyUpSelected = (event) => {
    const UP = 38;
    const DOWN = 40;
    const ENTER = 13;

    if (![UP, DOWN, ENTER].includes(event.keyCode)) return;

    const inputFocus = checkAllTarget.current.querySelector('input:focus');
    const previous = inputFocus.parentElement.parentElement.previousElementSibling;

    if (event.keyCode === UP && previous !== null) {
      previous.querySelector('input').focus();

      return;
    }

    const next = inputFocus.parentElement.parentElement.nextElementSibling;

    if (event.keyCode === DOWN && next !== null) {
      next.querySelector('input').focus();

      return;
    }

    if (event.keyCode === ENTER && inputFocus) {
      switch (inputFocus?.value) {
        case 'all':
          addAllCheckInAll();
          break;
        case 'inPage':
          addAllCheckInPage();
          break;
      }

      return;
    }
  }

  const handleTabCloseMenuCheckAll = (event) => {
    if (event.key !== 'Tab') return;

    /** :V */
    let element = event.currentTarget.querySelector(':focus');
    const conditionFirst = event.shiftKey && element !== null && element.tagName === 'SPAN';
    const conditionLast = !event.shiftKey && element !== null && element.tagName === 'INPUT';

    if (conditionFirst || conditionLast) {
      changeIsMenuOpen(false);

      return;
    }
  }

  const handleTableHeaderCheckBox = (event) => {
    const SPACE = 32;

    if (event.keyCode === SPACE) {
      event.preventDefault();
    }

    handleTabCloseMenuCheckAll(event)
  }

  return (
    <thead
      className='b-table__header'
      data-table-left-head
      onScroll={e => {
        e.stopPropagation()
        handleTableScroll(e)
      }}
    >
      <tr className='b-table__row' data-table-left-row>
        {!isHiddenAllCheck && hasCheckBox && !isHiddenCheckboxAll && (
          <th className='b-table__cell -checkbox'>
            <label
              className='b-table__checkbox'
              onClick={checkHead} style={disableAllCheck ? { pointerEvents: 'none' } : {}}
              onKeyUp={(e) => handleKeyUpCheckAll(e)}
              onKeyDown={(e) => handleTableHeaderCheckBox(e)}
            >
              {/* aria-checked: true | false | mixed */}

              <span
                role='checkbox'
                aria-checked={ariaChecked}
                tabIndex={0}
              />

              <span className='b-table__check-label-text'>
                <span className='b-table__hidden-text'>選択解除</span>
              </span>
            </label>

            <div
              className='b-table__check-target'
              aria-expanded={isMenuOpen}
              ref={menuRef}
            >
              <div
                className='b-table__check-target-menu'
                aria-hidden={!isMenuOpen}
                style={{ top: menuDomRec.current.top }}
              >
                <ul onKeyUp={(e) => handleKeyUpSelected(e)} ref={checkAllTarget}>
                  <li className='b-table__check-target-item'>
                    <label className='b-table__check-target-label'>
                      <input
                        type='checkbox'
                        value='all'
                        checked={isChecked}
                        onChange={addAllCheckInAll}
                      />

                      <span>すべて</span>
                    </label>
                  </li>

                  <li className='b-table__check-target-item'>
                    <label className='b-table__check-target-label' onKeyDown={(e) => handleTabCloseMenuCheckAll(e)}>
                      <input
                        type='checkbox'
                        value='inPage'
                        checked={isCheckedAllInPage}
                        onChange={addAllCheckInPage}
                      />

                      <span>このページのみ</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </th>
        )}

        {(isHiddenAllCheck || (hasCheckBox && isHiddenCheckboxAll)) && (
          <th className='b-table__cell -checkbox'></th>
        )}

        {hasRadio && <th className='b-table__cell -radio'>{selectItemTitle}</th>}

        {hasDrag && <th className='b-table__cell -drag'>{selectItemTitle}</th>}

        {columnsConfig.map((column, i) =>
          i < fixedNum && columnsConfig[i].isVisible ? (
            <th className={clsx('b-table__cell', {
              'border-right': (fixedNum < rowSizeList.length && fixedNum === i + 1),
            })} key={i} style={{ width: rowSizeList[i] }}>
              <div className='b-table__col-resize'>
                <span className='b-table__hidden-text'>resize</span>
              </div>

              <span className='b-table__header-label'>{column.label}</span>

              {(column.isSorted === undefined || column.isSorted) && <button
                type='button'
                className='b-table__sort'
                onClick={sortChange(column)}
              >
                <img
                  src={`/public/assets/images/icons/sort${sortedColumn && sortedColumn.type
                    && column.dataKey === sortedColumn.dataKey
                    ? sortedColumn.type === 'asc'
                      ? '-asc'
                      : '-desc'
                    : '-primary-36'
                    }.svg`}
                  alt='Sort'
                />
              </button>}

              <ColumnResize
                onResize={handleRowResize}
                onMarkerMove={handleMarkerMove}
                index={i}
                size={rowSizeList[i]}
              />
            </th>
          ) : null,
        )}
      </tr>
    </thead>
  )
}