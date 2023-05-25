/* eslint-disable max-lines */
/* eslint-disable complexity */
// TODO: refactor ALLLLLLLLLLL
// - nested if else
// - to many responsibility
import React, { useState, useRef, useEffect } from 'react'
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import { FormControlChildProps } from 'common/form'
import { Box } from '@mui/system';

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
  isBlank?: boolean;

  // Default { label: '', value: '' }
  blankOption?: { label: string | null, value: string | number }

  onClick?: (e: MouseEvent) => void;

  // Default false
  shouldShowInValid?: boolean

  isLoading?: boolean;

  label?: string;
}

export function CommonSelect({
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
  customInvalidCharacters = undefined,
  maxBytes,
  statusFilter,
  defaultStatusFilter,
  defaultMessageFilter = '',
  maxLength = 1000,
  isBlank = false,
  blankOption = { label: '', value: '' },
  onClick,
  shouldShowInValid = false,
  isLoading = false,
  label = '',
}: SelectProps) {
  const selectBoxRef = useRef(null)
  const selectBoxWrapRef = useRef(null)

  // Update candidate

  // セレクトボックスの開閉状態
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
    if (selectedValue === value || value === undefined) return;

    changeSelectedValue(value);
  }, [selectedValue, value])

  // Fix error display select if set percent width for select box
  useEffect(() => {
    const target = selectBoxRef.current;

    if (!target || !selectBoxWrapRef.current.clientWidth) return;

    target.style.width = selectBoxWrapRef.current.clientWidth + 'px';
  }, [options])

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    formik.setFieldValue(`${name}`, event.target.value)
  };

  return (
    <Box component={'div'} sx={{ minWidth: 120 }} className='p-select'>
      <FormControl fullWidth size='small'>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>

        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={age}
          label={label}
          onChange={handleChange}
          name={name}
        >
          {isBlank && !blankOption && <MenuItem key={'blank'} sx={{ height: '36px' }} >&nbsp;</MenuItem>}

          {isBlank && blankOption &&
            <MenuItem sx={{ height: '36px' }} key={'blank'} value={blankOption.value}>{blankOption.label}</MenuItem>
          }

          {options && options.map((item) => {
            return (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
          })}

        </Select>
      </FormControl>
    </Box>
  )
}
