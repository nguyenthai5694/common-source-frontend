/* eslint-disable max-lines */
/* eslint-disable complexity */
// TODO: refactor ALLLLLLLLLLL
// - nested if else
// - to many responsibility
import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react'
import clsx from 'clsx'
import xor from 'lodash/xor'
import { FormControlChildProps } from 'soumu/form'
import StarRating from 'soumu/parts/star-rating/star-rating.component';
import useOnClickOutside from 'app/hooks/use-on-click-outside.hook'
import { convertFullWidthToHalfWidth } from 'app/services/character';
import { closest } from 'app/services/dom'
import { isIE } from 'app/services/navigator'
import { requestAnimation } from 'app/modules/mim/_common/utils/request-animation.util';
import { SelectContent } from './select-content.component'

export type NormalSelectOptions<V = string | number> = ({ label: string | null, value: V })[];

/**
 * @deprecated use NormalSelectOptions instead, `any` seem bad practice.
 */
export type SelectOptions = ({ label: string | null, value: string | number } | any)[];

export interface SelectProps extends FormControlChildProps {

  placeholder?: string;

  options: SelectOptions;

  defaultValue?: string | number | any[];

  size?: 'l' | 'm' | 's';

  width?: number | string;

  defaultStatus?: undefined | 'valid' | 'inValid' | 'warn';

  defaultMessage?: string;

  /**
   * Default: false
   */
  require?: boolean;

  /**
   * Default: false
   */
  multi?: boolean;

  /**
   * Default: false
   */
  filter?: boolean;

  /**
   * Default: false
   */
  isStar?: boolean;

  value?: string | number;

  theme?: string;

  txbId?: string;

  position?: 'toBottom' | 'toTop',

  className?: string;

  shouldShowError?: boolean;

  invalidCharactersMessageKey?: Codes;

  customInvalidCharacters?: string[];

  maxBytes?: number;

  statusFilter?: string;

  defaultStatusFilter?: string;

  defaultMessageFilter?: string;

  maxLength?: number;

  // Default false
  hasBlankOption?: boolean;

  // Default { label: '', value: '' }
  blankOption?: { label: string | null, value: string | number }

  onClick?: (e: MouseEvent) => void;

  // Default false
  shouldShowInValid?: boolean

  isLoading?: boolean;
}

const CANDIDATE_CLASS_NAME = '-candidate';

export function Select({
  id,
  name,
  placeholder,
  formik,
  // INFO: option要素の値を決定するための配列
  // [{value:'value1',label:'テキスト1'}]
  // が以下のように扱われる
  //  <option value="value1">テキスト1</option>
  options,
  disabled = false,
  value,
  defaultValue, // シングルモードではテキスト、multiモードでは配列
  size = 'l',
  width = 520,
  defaultStatus = undefined, // undefined or valid or inValid or warn
  defaultMessage,
  require = false,
  multi = false, // 複数選択可能かどうか
  filter = false, // 絞り込みを行うかどうか
  isStar = false,
  theme = 'none',
  status,
  txbId,
  position = 'toBottom',
  className,
  onChange = (e?: any) => { }, // 変更内容に親コンポーネントにemitする為の関数
  shouldShowError = true,
  invalidCharactersMessageKey = 'DAECE204',
  customInvalidCharacters = undefined,
  maxBytes,
  statusFilter,
  defaultStatusFilter,
  defaultMessageFilter = '',
  maxLength = 1000,
  hasBlankOption = false,
  blankOption = { label: '', value: '' },
  onClick,
  shouldShowInValid = false,
  isLoading = false,
}: SelectProps) {
  const firstSelectedBox = useRef({
    opened: false,
    closed: true,
  })
  const selectBoxRef = useRef(null)
  const selectBoxWrapRef = useRef(null)
  const buttonBoxRef = useRef(null)
  const textBoxRef = useRef(null)
  const timerOpen = useRef(null)
  const timerClose = useRef(null)
  const timerClosePressKeyEnter = useRef(null)
  const fromToRef = useRef([0, 0])
  const isUpdating = useRef(false)

  // Update candidate
  const candidateIndex = useRef<number>(-1)

  // const filteredOptions = options.map(option => {
  //   option.value = `${option.value}`;
  //   return option;
  // })
  // Keeping origin value (string, number)
  // const filteredOptions = options;
  const filteredOptions = hasBlankOption ? [
    blankOption,
    ...options,
  ] : options;

  // セレクトボックスの開閉状態
  const [isSelecting, changeIsSelecting] = useState(false)
  // 現在選択されているオプションの値

  const [selectedValue, changeSelectedValue] = useState(
    formik
      ? multi
        ? formik.getFieldProps(name).value || []
        : formik.getFieldProps(name).value
      : defaultValue
        ? defaultValue
        : multi ? [] : undefined, // multiモードでは配列になる
  );

  useEffect(() => {
    return () => {
      timerOpen.current && clearTimeout(timerOpen.current)
      timerClose.current && clearTimeout(timerClose.current)
      timerClosePressKeyEnter.current && clearTimeout(timerClosePressKeyEnter.current)
    }
  }, [])

  useEffect(() => {
    if (selectedValue === value || value === undefined) return;

    changeSelectedValue(value);
  }, [selectedValue, value])

  // Fix error display select if set percent width for select box
  useEffect(() => {
    const target = selectBoxRef.current;

    if (!target || !selectBoxWrapRef.current.clientWidth) return;

    target.style.width = selectBoxWrapRef.current.clientWidth + 'px';
  }, [options])

  // 絞り込み文字列
  const [filterText, changeFilterText] = useState('')

  const [_status, changeStatus] = useState(status || defaultStatus);
  const [_statusfilter, changeStatusFilter] = useState(statusFilter || defaultStatusFilter)
  const [_messageFilter, changeMessageFilter] = useState(defaultMessageFilter)
  const maxLengthInputValue = useRef(null)

  useEffect(() => {
    if (!firstSelectedBox.current.closed && isSelecting) {
      changeStatus(undefined);

      return;
    }

    changeStatus(status);
  }, [status, isSelecting]);

  // Calculate ghosting close buttons' positions after UI is painted on DOM and screen
  useEffect(() => {
    setTimeout(() => {
      requestAnimation(() => {
        // IE: Handle ghost remove selected value in multiple
        if (!isIE || !multi) return;

        const rootSelectBox = selectBoxWrapRef.current as HTMLElement;
        const removeSelectedEl = rootSelectBox?.querySelectorAll('.p-select__multi-remove');

        if (!removeSelectedEl || !removeSelectedEl.length) return;

        const rootRect = rootSelectBox.getBoundingClientRect();

        removeSelectedEl.forEach((el, index) => {
          const rect = el.getBoundingClientRect();
          const ghost = rootSelectBox.getElementsByClassName('p-select__multi-remove__ghost' + index)[0] as HTMLElement;

          ghost.style.top = rect.top - rootRect.top + 'px';
          ghost.style.right = rootRect.right - rect.right + 'px';
          ghost.style.opacity = '1';
        });
      });
    }, 0);
  });

  const [message, changeMessage] = useState(defaultMessage)

  // 現在選択されているオプション
  const selectedOption = multi
    ? filteredOptions.filter((option) => selectedValue?.includes(option.value))
    : filteredOptions.find((option) => `${option.value}` === `${selectedValue}`)

  // 選択済みかどうか
  const isSelected = multi ? selectedOption.length !== 0 : !!selectedOption;

  // セレクトボックスのポジションを調整
  const changeSelectPosition = useCallback(() => {
    const selectBox = selectBoxRef.current;
    const buttonBox = buttonBoxRef.current;

    if (selectBox === null || buttonBox === null) return;

    const buttonBoxRect = buttonBox.getBoundingClientRect();
    const selectBoxRect = selectBox.getBoundingClientRect();

    const distanceBottom = window.innerHeight;

    const buttonBoxTop = buttonBoxRect.top;
    const buttonBoxHeight = buttonBoxRect.height;

    selectBox.style.left = buttonBoxRect.left + 'px';
    selectBox.style.top = (buttonBoxRect.top + buttonBoxRect.height) + 'px';

    const heightSelect = selectBoxRect.height;

    let HEIGHT_FOOTER = 60;

    if (closest(selectBox, '[data-modal-root]')) {
      HEIGHT_FOOTER = 5;
    }

    if (buttonBoxTop + buttonBoxHeight + heightSelect + HEIGHT_FOOTER > distanceBottom) {
      selectBox.style.top = buttonBoxRect.top - heightSelect - 15 + 'px';
    }

    return false;
  }, [])

  // セレクトボックスを開く
  const openSelectBox = useCallback(() => {
    if (disabled) return

    if (filter) {
      timerOpen.current = setTimeout(() => {
        textBoxRef.current.focus()
      }, 100)
    }

    firstSelectedBox.current.opened = true;
    firstSelectedBox.current.closed = false;

    formik &&
      !formik.getFieldMeta(name).touched &&
      formik.setFieldTouched(name, true);

    changeIsSelecting(true)
  }, [disabled, filter, formik, name])

  const handleClick = useCallback((e) => {
    openSelectBox();
    onClick && onClick(e);
  }, [openSelectBox, onClick])

  // セレクトボックスを閉じる
  const closeSelectBox = useCallback(() => {
    if (firstSelectedBox.current?.opened) {
      firstSelectedBox.current.closed = true;
    }

    changeFilterText('')
    changeStatusFilter(undefined)
    changeMessageFilter(undefined)
    candidateIndex.current = -1;

    if (filter && isSelecting) {
      timerClose.current = setTimeout(() => {
        buttonBoxRef.current?.focus()

        if (textBoxRef.current) {
          textBoxRef.current.value = ''
        }
      }, 100)
    }

    changeIsSelecting(false)
  }, [filter, isSelecting])

  useLayoutEffect(() => {
    const closeSelectBoxScrolling = (event) => {
      if (isSelecting && selectBoxRef.current !== event.target && textBoxRef.current !== event.target)
        closeSelectBox();
    }

    if (isSelecting) changeSelectPosition();

    setTimeout(() => window.addEventListener('scroll', closeSelectBoxScrolling, true), 100);

    return () => window.removeEventListener('scroll', closeSelectBoxScrolling, true)
  }, [changeSelectPosition, closeSelectBox, isSelecting])

  // セレクトボックス外をクリックでセレクトボックスを閉じる
  useOnClickOutside(selectBoxRef, closeSelectBox)

  // セレクト選択時の挙動
  const handleSelect = useCallback(
    (value, withClose = true) => () => {
      if (multi) {
        const nextValue = xor(selectedValue, [value])

        changeSelectedValue(nextValue);

        onChange && onChange(nextValue);

        formik && formik.setFieldValue(name, nextValue);
      } else if (value !== selectedValue) { // Check new value changed
        changeSelectedValue(value);

        onChange && onChange(value);

        formik && formik.setFieldValue(name, value);

        if (value === '' && require && hasBlankOption) {
          setTimeout(() => requestAnimationFrame(() => {
            formik && !formik.getFieldMeta(name).touched && formik.setFieldTouched(name, true);
            changeStatus('inValid')
            // TODO: エラーメッセージを確認
            changeMessage('必須項目です')
          }), 1000 / 60)
        }
      }

      if (withClose) closeSelectBox()
    },
    [closeSelectBox, formik, multi, name, onChange, selectedValue, require, hasBlankOption],
  )

  const removeSelect = useCallback(
    (value) => (e) => {
      e.stopPropagation()
      changeSelectedValue((selectedValue) => {
        const nextValue = xor(selectedValue, [value])

        onChange && onChange(nextValue);
        formik && formik.setFieldValue(name, nextValue);

        return nextValue
      })
    },
    [formik, name, onChange],
  )

  // defaultStatusの指定がない場合はrequireの項目をベースにバリデーションを行う
  const validate = useCallback(() => {
    if (!firstSelectedBox.current.closed) return;

    formik &&
      !formik.getFieldMeta(name).touched &&
      formik.setFieldTouched(name, true);

    if (defaultStatus) return

    if (require && (!selectedValue || selectedValue.length === 0)) {
      changeStatus('inValid')
      // TODO: エラーメッセージを確認
      changeMessage('必須項目です')
    } else if (defaultStatus) {
      changeStatus(defaultStatus)
    } else if (status === 'inValid'
      && formik?.getFieldMeta(name).error
      && formik?.getFieldMeta(name).touched
      // && (!selectedValue || selectedValue.length === 0)
    ) {
      // Fix inValid on IE11
      changeStatus(status)
    } else {
      changeStatus(undefined)
      changeMessage(undefined)
    }
  }, [status, defaultStatus, require, selectedValue, formik, name])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteredOption = hasBlankOption ? [
    blankOption,
    ...options.filter((option) => {
      if (option.label === null) option.label = '';

      return convertFullWidthToHalfWidth((option.label || '').toLowerCase())
        .includes(convertFullWidthToHalfWidth(filterText.toLowerCase()));
    }),
  ] : options.filter((option) => {
    if (option.label === null) option.label = '';

    return convertFullWidthToHalfWidth((option.label || '').toLowerCase())
      .includes(convertFullWidthToHalfWidth(filterText.toLowerCase()));
  });

  const UP_KEYCODE = 38
  const DOWN_KEYCODE = 40
  const ESC_KEYCODE = 27
  const ENTER_KEYCODE = 13
  const TAB_KEYCODE = 9

  const updateCandidateKeyPress = useCallback(indexItem => {
    if (typeof indexItem === 'undefined') return;

    const [fromIndex] = fromToRef.current;
    // const childNodes = (selectBoxRef.current as HTMLUListElement).childNodes;
    const childNodes = (selectBoxRef.current as HTMLUListElement).querySelectorAll('.item-pulldown');

    childNodes.forEach(item => {
      (item as HTMLLIElement).classList.remove(CANDIDATE_CLASS_NAME);
    });

    candidateIndex.current = indexItem;

    const virtualIndexItem = indexItem - fromIndex;

    if (virtualIndexItem >= 0) {
      (childNodes[virtualIndexItem] as HTMLLIElement)?.classList?.add(CANDIDATE_CLASS_NAME);
      /*if (filter) {
        // Child node first is li filter node
        childNodes[virtualIndexItem + 1] &&
        (childNodes[virtualIndexItem + 1] as HTMLLIElement).classList.add(CANDIDATE_CLASS_NAME);
      } else if (childNodes[virtualIndexItem]) {
        (childNodes[virtualIndexItem] as HTMLLIElement).classList.add(CANDIDATE_CLASS_NAME);
      }*/
    }
  }, [])

  const updateCandidateMouseOver = useCallback((evt, index) => {
    (selectBoxRef.current as HTMLUListElement).childNodes.forEach(item => {
      (item as HTMLLIElement).classList.remove(CANDIDATE_CLASS_NAME);
    });

    (evt.target as HTMLLIElement).classList.add(CANDIDATE_CLASS_NAME);

    candidateIndex.current = index;
  }, [])

  const updateScrollIntoView = useCallback((nextItemIndex: number, type: number) => {
    const childNodes = (selectBoxRef.current as HTMLUListElement).querySelectorAll('.item-pulldown');

    const [fromIndex] = fromToRef.current;
    /*const itemEl = (selectBoxRef.current as HTMLUListElement)
      .childNodes[filter ? (nextItemIndex - fromIndex) + 1 : (nextItemIndex - fromIndex)];*/
    const itemEl = childNodes[nextItemIndex - fromIndex];

    if (!itemEl) return;

    const selectBoxScrollTop = (selectBoxRef.current as HTMLUListElement).scrollTop;
    const itemRec = (itemEl as HTMLLIElement).getBoundingClientRect();

    if (type === UP_KEYCODE) {
      if (selectBoxScrollTop > (itemEl as HTMLLIElement).offsetTop) {
        (selectBoxRef.current as HTMLUListElement).scrollTop = (itemEl as HTMLLIElement).offsetTop;
      } else if (itemRec.bottom > (selectBoxRef.current as HTMLUListElement).getBoundingClientRect().bottom) {
        (selectBoxRef.current as HTMLUListElement).scrollTop =
          (itemEl as HTMLLIElement).offsetTop
          - (selectBoxRef.current as HTMLUListElement).getBoundingClientRect().height
          + itemRec.height;
      }
    } else if (type === DOWN_KEYCODE) {
      if (
        (selectBoxScrollTop +
          (selectBoxRef.current as HTMLUListElement).getBoundingClientRect().height - itemRec.height)
        < (itemEl as HTMLLIElement).offsetTop
      ) {
        (selectBoxRef.current as HTMLUListElement).scrollTop =
          (itemEl as HTMLLIElement).offsetTop
          - (selectBoxRef.current as HTMLUListElement).getBoundingClientRect().height
          + itemRec.height;
      } else if (itemRec.top < (selectBoxRef.current as HTMLUListElement).getBoundingClientRect().top) {
        (selectBoxRef.current as HTMLUListElement).scrollTop = (itemEl as HTMLLIElement).offsetTop;
      }
    }

    if (filter && !nextItemIndex) (selectBoxRef.current as HTMLUListElement).scrollTop = 0;
  }, [filter])

  const handleKeyDown = useCallback(
    (e) => {
      if (isUpdating.current) return;

      // Prevents React from resetting its properties
      e.persist();

      // ↓キーの場合(未展開)
      if (!multi && !isSelecting && e.keyCode === DOWN_KEYCODE) {
        const currentIndex = filteredOption.findIndex(
          (option) => option.value === selectedValue,
        )

        if (currentIndex === filteredOption.length - 1 || currentIndex === -1) {
          handleSelect(filteredOption[0].value)()
        } else {
          handleSelect(filteredOption[currentIndex + 1].value)()
        }
      }

      // ↑キーの場合(未展開)
      if (!multi && !isSelecting && e.keyCode === UP_KEYCODE) {
        const currentIndex = filteredOption.findIndex(
          (option) => option.value === selectedValue,
        )

        if (currentIndex === 0 || currentIndex === -1) {
          handleSelect(filteredOption[filteredOption.length - 1].value)()
        } else {
          handleSelect(filteredOption[currentIndex - 1].value)()
        }
      }

      // ↓キーの場合(展開、マルチ)
      if (e.keyCode === DOWN_KEYCODE) {
        e.preventDefault();

        if (multi && !isSelecting) openSelectBox()

        if (multi || isSelecting) {
          const getCandidateValue = () => {
            const currentIndex = filteredOption.findIndex(
              (option, index) => index === candidateIndex.current,
            )

            if (filteredOption.length === 0) {
              // updateScrollIntoView nextItemIndex is first
              updateScrollIntoView(0, e.keyCode);

              return -1
            } else if (
              currentIndex === filteredOption.length - 1 ||
              currentIndex === -1
            ) {
              const selectBoxEl = (selectBoxRef.current as HTMLUListElement);
              const timerDelayScroll = 200;

              isUpdating.current = true;
              selectBoxEl.scrollTop = 0;
              new Promise(resolve => {
                const timer = setTimeout(() => {
                  clearTimeout(timer);
                  resolve(true);
                }, timerDelayScroll);
              }).then(() => {
                isUpdating.current = false;
                updateScrollIntoView(0, e.keyCode);
                updateCandidateKeyPress(0);
              });
            } else {
              updateScrollIntoView(currentIndex + 1, e.keyCode);

              return currentIndex + 1
            }
          }

          updateCandidateKeyPress(getCandidateValue());
        }
      }

      // ↑キーの場合(展開、マルチ)
      if (e.keyCode === UP_KEYCODE) {
        e.preventDefault();

        if (multi && !isSelecting) openSelectBox()

        if (multi || isSelecting) {
          const getCandidateValue = () => {
            const currentIndex = filteredOption.findIndex(
              (option, index) => index === candidateIndex.current,
            )

            if (filteredOption.length === 0) {
              // updateScrollIntoView nextItemIndex is first
              updateScrollIntoView(0, e.keyCode);

              return -1;
            } else if (currentIndex === 0 || currentIndex === -1) {
              const selectBoxEl = (selectBoxRef.current as HTMLUListElement);
              const timerDelayScroll = 150;

              isUpdating.current = true;
              selectBoxEl.scrollTop = selectBoxEl.scrollHeight * 10;
              new Promise(resolve => {
                // Used setInterval scroll: because height of pulldown item dynamic (height of selectBoxEl is not fixed)
                const timerInterval = setInterval(() => {
                  selectBoxEl.scrollTop = selectBoxEl.scrollHeight * 10;
                }, 5);
                const timerTimeout = setTimeout(() => {
                  clearInterval(timerInterval);
                  clearTimeout(timerTimeout);
                  resolve(true);
                }, timerDelayScroll * 3);
              }).then(() => {
                isUpdating.current = false;
                updateScrollIntoView(filteredOption.length - 1, e.keyCode);
                updateCandidateKeyPress(filteredOption.length - 1);
              });
            } else {
              updateScrollIntoView(currentIndex - 1, e.keyCode);

              return currentIndex - 1
            }
          }

          updateCandidateKeyPress(getCandidateValue());
        }
      }

      if (isSelecting && e.keyCode === ENTER_KEYCODE) e.preventDefault();

      // エンター押下時
      if (isSelecting && candidateIndex.current >= 0 &&
        e.keyCode === ENTER_KEYCODE &&
        filteredOption[candidateIndex.current]?.value !== undefined
      ) {
        if (multi) {
          handleSelect(filteredOption[candidateIndex.current]?.value, false)()
        } else {
          handleSelect(filteredOption[candidateIndex.current]?.value)()
        }

        // Add timeout because event onclick of button called after enter key press
        timerClosePressKeyEnter.current = setTimeout(() => {
          changeIsSelecting(false);
        }, 50)

        return
      }

      // メニュー閉じる
      if (
        isSelecting &&
        (e.keyCode === ESC_KEYCODE || e.keyCode === TAB_KEYCODE)
      ) {
        e.preventDefault()
        closeSelectBox()

        return
      }
    },
    [
      closeSelectBox,
      filteredOption,
      handleSelect,
      isSelecting,
      multi,
      openSelectBox,
      selectedValue,
      updateCandidateKeyPress,
      updateScrollIntoView,
    ],
  )

  const handleKeyUp = useCallback(() => {
    changeSelectPosition();
  }, [changeSelectPosition])

  const mapOptionItem = (option, index) => {
    return (
      <li
        onClick={handleSelect(option.value)}
        className={clsx('item-pulldown', {
          '-selected': multi
            ? //multiモードの場合
            selectedValue?.includes(option.value)
            : //Singleモードの場合
            `${option.value}` === `${selectedValue}` && option.label,
        })}
        onMouseOver={(evt) => updateCandidateMouseOver(evt, option._actualIndex || index)}
        key={`${option.value || 'empty'}_${option._actualIndex || index}`}
      >
        {isStar ? <StarRating score={option.value} /> : option.label}
      </li>
    )
  }

  return (
    <div
      className={clsx(`p-select ${className}`, {
        '-sizeL': size === 'l',
        '-sizeM': size === 'm',
        '-sizeS': size === 's',
        '-multi': multi,
        '-dark':
          (selectedOption && selectedOption.theme === 'dark') ||
          theme === 'dark',
        '-outline-dark':
          (selectedOption && selectedOption.theme === 'outline-dark') ||
          theme === 'outline-dark',
        '-inValid': ((!formik && _status === 'inValid')
          || (firstSelectedBox.current.closed &&
            formik && formik?.getFieldMeta(name).touched &&
            formik?.getFieldMeta(name).error))
          && shouldShowError,
      })}
      style={{ width }}
      ref={selectBoxWrapRef}
    >
      {/* UI上表示されない値を格納するためのフィールド */}

      <input type='hidden' id={id} name={name} value={selectedValue || ''} />

      {(isIE && isSelected && multi) && <>
        {selectedOption.map((option, index) => (
          <img
            key={option.value + index}
            className={'p-select__multi-remove__ghost p-select__multi-remove__ghost' + index}
            src='/public/assets/images/icons/close-primary-60.svg'
            onClick={removeSelect(option.value)}
            alt='閉じる'
          />
        ))}
      </>}

      <button
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        className={clsx('p-select__field', {
          '-placeholder': !isSelected,
          '-valid': _status === 'valid',
          '-inValid': _status === 'inValid' || shouldShowInValid,
          '-warn': _status === 'warn',
          '-multi': multi,
          '-focus': isSelecting,
          '-selected': isSelected,
          '-disabled': disabled,
        })}
        disabled={disabled}
        onBlur={validate}
        onChange={validate}
        ref={buttonBoxRef}
        type='button'
      >
        {!isSelected ? (
          placeholder
        ) : multi ? (
          //multiモードの場合
          selectedOption.map((option) => (
            <span className='p-select__multiText' key={option.value}>
              {option.label}

              <img
                className={clsx('p-select__multi-remove', {
                  '-ie': isIE,
                })}
                src='/public/assets/images/icons/close-primary-60.svg'
                onClick={removeSelect(option.value)}
                alt='閉じる'
              />
            </span>
          ))
        ) : //Singleモードの場合
          isStar
            ? <StarRating score={selectedOption.value} />
            : selectedOption.label
        }
      </button>

      <SelectContent
        isSelecting={isSelecting}
        width={width}
        selectBoxRef={selectBoxRef}
        mapOptionItem={mapOptionItem}
        filteredOption={filteredOption}
        fromToRef={fromToRef}
        isLoading={isLoading}
      >
        {filter && (
          <li className={clsx('-filter', {
            '-inValid': !!_messageFilter,
          })}>
            <input
              id={txbId}
              className={clsx('p-select__filter', {
                '-inValid': _statusfilter === 'inValid',
                '-warn': _statusfilter === 'warn',
              })}
              type='text'
              placeholder='絞り込み'
              value={filterText}
              onChange={(e) => {
                if (e.currentTarget.value.length === maxLength) {
                  maxLengthInputValue.current = e.currentTarget.value
                  changeFilterText(e.currentTarget.value)
                }

                if (e.currentTarget.value.length > maxLength) {
                  changeFilterText(maxLengthInputValue.current)
                }

                if (e.currentTarget.value.length < maxLength) {
                  changeFilterText(e.currentTarget.value)
                }

                // changeFilterText(e.currentTarget.value)
              }}
              ref={textBoxRef}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
            />

            {_messageFilter && (
              <p className={'p-select__message -inValid'}>
                {_messageFilter}
              </p>
            )}
          </li>
        )}
      </SelectContent>

      {formik && _status === 'inValid' && shouldShowError && (
        <p className={'p-select__message -inValid'}>
          {formik.getFieldMeta(name).error}
        </p>
      )}

      {!formik && (_status === 'inValid' || _status === 'warn') && (
        <p
          className={clsx('p-select__message', {
            '-inValid': _status === 'inValid',
            '-warn': _status === 'warn',
          })}
        >
          {message}
        </p>
      )}

    </div>
  )
}
