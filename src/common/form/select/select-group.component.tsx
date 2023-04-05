import React, { useCallback, useState, useEffect } from 'react'
import { useFormikContext } from 'formik';
import { CommonSelect } from 'common/form';
import { FormControl } from 'common/form'
import Help from 'common/parts/help/help.component';

export interface SelectGroupProps {
  width?: number | string;

  placeholder?: string;

  labels?: {
    id: string,

    title: string,

    /**
     * Field name.
     */
    name: string,

    /**
     * Handle Hidden SelectBox
     */
    isHiddenSelectBox?: boolean,

    hasBlankOption?: boolean,

    iconInfor?: string,
  }[];

  /**
   * TODO: remove any, using better type.
   */
  options?: any;

  /**
   * Default: false.
   */
  disableAll?: boolean;

  size?: 'l' | 'm' | 's';

  className?: string;

  onChange?: (e?: any) => void;

  /**
   * Default: false
   */
  filter?: boolean;
}

/**
 * **Note**: For now, `SelectGroup` is only support `formik`.
 * Thus, you HAVE TO use `SelectGroup` inside `formik` context.
 */
export function SelectGroup({
  width,
  placeholder,
  // ラベルの配列
  labels,
  // プルダウンの初期値の配列、非活性の場合はundefinedを指定
  options,
  // セレクト変更時に実行されるイベント、新しいoptionsを返すことで新プルダウンを生成できる
  // @params value[] - 選択されているSelectのvalue値の配列、非選択の場合はundefinedを返す
  // @return options[][] - 選択されたvalueより新しいoptionを返す
  onChange,
  // セレクトの高さ
  size = 'l',
  // ラベルに付与するクラス名
  className = '',
  // 非活性化どうか
  disableAll = false,
  filter = false,

}: SelectGroupProps) {
  const [_options, changeOptions] = useState(options);
  const formik = useFormikContext();

  useEffect(() => {
    changeOptions(options);
  }, [options]);

  const handleChange = useCallback(
    (index, name) => (value) => {
      const newValues = formik.values;
      const touched = {}

      if (index + 1 < labels.length) {
        for (let i = index + 1; i < labels.length; i++) {
          newValues[labels[i].name] = '';
          touched[labels[i].name] = false;
        }
      }

      newValues[name] = value;
      const values = labels.map(item => newValues[item.name]);

      if (onChange) {
        const newOptions = onChange(values);

        changeOptions(newOptions);
      }

      formik.setValues(newValues);
      formik.setTouched(touched)
    },
    [labels, formik, onChange],
  )

  return (
    <>
      {labels.map((label, index) => {
        return (
          !label.isHiddenSelectBox &&
          <div className='u-forms__classification' key={index}>
            <span className={`u-forms__classification-text ${className}`}>{label.title}

              {
                label.iconInfor &&
                <Help text={label.iconInfor} className='h-ml-4' />
              }
            </span>

            <FormControl name={label.name}>
              <CommonSelect
                id={label.id}
                width={width}
                options={_options[index] || []}
                placeholder={placeholder}
                disabled={!_options[index] || disableAll}
                onChange={handleChange(index, label.name)}
                size={size}
                hasBlankOption={label.hasBlankOption}
                filter={filter}
              />
            </FormControl>
          </div>
        )
      })}
    </>
  );
}
