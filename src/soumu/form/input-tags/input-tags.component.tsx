import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx';
import { FormControlChildProps } from 'soumu/form'

interface InputTagsProps extends FormControlChildProps {
  width?: number | string;
  value?: { label: string }[];
  enableScroll?: boolean;
}

export function InputTags({
  name,
  // パーツの幅
  width = 360,
  // 表示する値情報の配列 - {label:string}[]
  value,
  // タグ変更(削除時に発火)のイベント
  onChange,

  formik,

  enableScroll,
}: InputTagsProps) {
  const [_value, setValue] = useState(value || []);

  useEffect(() => {
    setValue(value || []);
  }, [value]);

  /**
   * タグの削除
   */
  const handleDelete = useCallback(
    (deleteIndex) => () => {
      _value.splice(deleteIndex, 1);
      const newValues = _value;

      onChange && onChange(newValues);

      !formik && setValue(newValues);
      formik && formik.setFieldValue(name, newValues);
    },
    [onChange, formik, name, _value],
  )

  return (
    <div className={clsx('p-input-tags', {
      'p-input-tags__scroll': enableScroll && _value.length > 2,
    })} style={{ width }}>
      {_value.map((item, index) => (
        <span className='p-input-tags__item' key={index}>
          {item.label}

          {/* eslint-disable-next-line */}
          <a href='javascript:void (0)' onClick={handleDelete(index)} className='class_ghost_tab'>
            <img
              src='/public/assets/images/icons/close-primary-60.svg'
              alt='閉じる'
            />
          </a>
        </span>
      ))}
    </div>
  )
}
