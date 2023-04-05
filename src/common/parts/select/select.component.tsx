import React, { useState, useCallback, useRef, useEffect } from 'react'
import clsx from 'clsx'
import xor from 'lodash/xor'
import StarRating from 'common/parts/star-rating/star-rating.component';
import useOnClickOutside from 'app/hooks/use-on-click-outside.hook'

interface SelectProps {
  id?: string;

  placeholder?: string;

  options: ({ value: string, label: string } | any)[];

  disabled?: boolean;

  defaultValue?: string | any[];

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

  name?: string;
  value?: string;
  theme?: string;
  onChange?: (e?: any) => void
}

/**
 * @deprecated Use common/form/select/select.component.tsx instead
 */
export default function Select({
  id,
  name,
  placeholder,
  // INFO: option要素の値を決定するための配列
  // [{value:'value1',label:'テキスト1'}]
  // が以下のように扱われる
  //  <option value="value1">テキスト1</option>
  options,
  disabled,
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
  onChange = (e?: any) => { }, // 変更内容に親コンポーネントにemitする為の関数
}: SelectProps) {
  const selectBoxRef = useRef(null)

  // セレクトボックスの開閉状態
  const [isSelecting, changeIsSelecting] = useState(false)
  // 現在選択されているオプションの値
  const [selectedValue, changeSelectedValue] = useState(
    defaultValue ? defaultValue : multi ? [] : undefined, // multiモードでは配列になる
  )

  useEffect(() => {
    if (!value) return

    changeSelectedValue(value)
  }, [value])

  // 絞り込み文字列
  const [filterText, changeFilterText] = useState('')

  const [status, changeStatus] = useState(defaultStatus)
  const [message, changeMessage] = useState(defaultMessage)

  // 現在選択されているオプション
  const selectedOption = multi
    ? options.filter((option) => selectedValue.includes(option.value))
    : options.find((option) => option.value === selectedValue)

  // 選択済みかどうか
  const isSelected = multi ? selectedOption.length !== 0 : !!selectedOption

  // セレクトボックスのポジションを調整
  const changeSelectPosition = () => {
    const target = selectBoxRef.current

    if (!target || !target.previousSibling) return

    const rect = target.previousSibling.getBoundingClientRect()

    target.style.top = rect.top + rect.height + 'px'
    target.style.left = rect.left + 'px'
  }

  // セレクトボックスを開く
  const openSelectBox = useCallback(() => {
    if (disabled) return

    changeIsSelecting(true)

    window.addEventListener('scroll', changeSelectPosition, true)

    changeSelectPosition()
  }, [disabled])

  // セレクトボックスを閉じる
  const closeSelectBox = useCallback(() => {
    changeFilterText('')
    changeIsSelecting(false)
    window.removeEventListener('scroll', changeSelectPosition, true)
  }, [])

  // セレクトボックス外をクリックでセレクトボックスを閉じる
  useOnClickOutside(selectBoxRef, closeSelectBox)

  // セレクト選択時の挙動
  const handleSelect = useCallback(
    (value) => () => {
      if (multi) {
        const nextValue = xor(selectedValue, [value])

        onChange(nextValue)
        changeSelectedValue(nextValue)
      } else {
        changeSelectedValue(value)
        onChange(value)
      }

      closeSelectBox()
    },
    [closeSelectBox, multi, onChange, selectedValue],
  )

  const removeSelect = useCallback(
    (value) => (e) => {
      e.stopPropagation()
      changeSelectedValue((selectedValue) => {
        const nextValue = xor(selectedValue, [value])

        onChange(nextValue)

        return nextValue
      })
    },
    [onChange],
  )

  // defaultStatusの指定がない場合はrequireの項目をベースにバリデーションを行う
  const validate = useCallback(() => {
    if (defaultStatus) return

    if (require && (!selectedValue || selectedValue.length === 0)) {
      changeStatus('inValid')
      // TODO: エラーメッセージを確認
      changeMessage('必須項目です')
    } else if (defaultStatus) {
      changeStatus(defaultStatus)
    } else {
      changeStatus(undefined)
      changeMessage(undefined)
    }
  }, [defaultStatus, require, selectedValue])

  const handleKeyDown = useCallback((e) => {
    const code = e.keyCode ? e.keyCode : e.which;

    if (code === 13) {
      openSelectBox();
    }
  }, [openSelectBox])

  return (
    <div
      className={clsx('p-select', {
        '-sizeL': size === 'l',
        '-sizeM': size === 'm',
        '-sizeS': size === 's',
        '-multi': multi,
        '-dark': theme === 'dark',
      })}
      style={{ width }}
    >
      {/* UI上表示されない値を格納するためのフィールド */}

      <input type='hidden' id={id} name={name} value={selectedValue || ''} />

      <div
        onKeyDown={handleKeyDown}
        onClick={openSelectBox}
        className={clsx('p-select__field', {
          '-placeholder': !isSelected,
          '-valid': status === 'valid',
          '-inValid': status === 'inValid',
          '-warn': status === 'warn',
          '-multi': multi,
          '-focus': isSelecting,
          '-selected': isSelected,
          '-disabled': disabled,
        })}
        onBlur={validate}
      >
        {!isSelected ? (
          placeholder
        ) : multi ? (
          //multiモードの場合
          selectedOption.map((option) => (
            <span className='p-select__multiText' key={option.value}>
              {option.label}

              <img
                src='/public/assets/images/icons/close-primary-60.svg'
                onClick={removeSelect(option.value)}
                alt='閉じる'
              />
            </span>
          ))
        ) : //Singleモードの場合
          isStar ? (
            <StarRating score={selectedOption.value} />
          ) : (
            selectedOption.label
          )}
      </div>

      <ul
        className={clsx('p-select__options', { '-show': isSelecting })}
        style={{ width }}
        ref={selectBoxRef}
      >
        {filter && (
          <li className='-filter'>
            <input
              className='p-select__filter'
              type='text'
              placeholder='絞り込み'
              onChange={(e) => changeFilterText(e.currentTarget.value)}
            />
          </li>
        )}

        {options
          .filter((option) => option.label.includes(filterText))
          .map((option) => (
            <li
              onClick={handleSelect(option.value)}
              className={clsx('', {
                '-selected': multi
                  ? //multiモードの場合
                  selectedValue.includes(option.value)
                  : //Singleモードの場合
                  option.value === selectedValue,
              })}
              key={option.value}
            >
              {isStar ? <StarRating score={option.value} /> : option.label}
            </li>
          ))}
      </ul>

      {message && (
        <p
          className={clsx('p-select__message', {
            '-inValid': status === 'inValid',
            '-warn': status === 'warn',
          })}
        >
          {message}
        </p>
      )}
    </div>
  )
}
