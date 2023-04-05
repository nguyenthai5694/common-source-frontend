import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { Checkbox } from 'common/form';
import Button from 'common/parts/button/button.component';
import useOnClickOutside from 'app/hooks/use-on-click-outside.hook';

interface VisibleChangerProps {
  triggerText: string | ReactNode,
  title: string,
  list: any[],
  className?: string,
  onChange: (e?: any) => void;
  screenCd?: string;
  tableId?: number;
  removeDataSetting?: () => void;
  isCloseColumnDisplay?: boolean;
  fixedColumnNumber?: number;
}

export default function VisibleChanger({
  triggerText = '',
  title = '',
  list = [],
  className = '',
  onChange = (e?: any) => { },
  screenCd,
  tableId,
  fixedColumnNumber = 0,
  removeDataSetting = () => { },
  isCloseColumnDisplay = true,
}: VisibleChangerProps) {
  // 列の表示設定の開閉
  const columnRef = useRef(null);
  const [isColumnDisplayOpen, changeIsColumnDisplayOpen] = useState(false);

  useOnClickOutside(columnRef, () => {
    changeList(list);
    changeIsColumnDisplayOpen(false);
  }); // ボックス外クリックで閉じる

  const [_list, changeList] = useState(list);

  useEffect(() => {
    changeList(list);
  }, [list]);

  // 表示を切り替えた際の処理
  const handleToggleCheck = useCallback(
    (item) => (event) => {
      event.persist();

      changeList((list) =>
        list.map((_item) =>
          _item.label === item.label
            ? {
              ..._item,
              isVisible: event.target.checked,
            }
            : _item,
        ),
      );
    },
    [],
  );

  // キャンセルされた際の処理
  const handleCancel = useCallback(() => {
    changeList(list);
    changeIsColumnDisplayOpen(false);
  }, [list]);

  // 変更された際の処理
  const handleChange = useCallback(() => {
    removeDataSetting();

    onChange(_list);

    if (isCloseColumnDisplay) {
      changeIsColumnDisplayOpen(false);
    }
  }, [_list, onChange, removeDataSetting, isCloseColumnDisplay]);

  const normailizedFixNumber = fixedColumnNumber === -1 ? _list.length : fixedColumnNumber

  return (
    <div
      className={`p-visible-changer ${className}`}
      aria-expanded={isColumnDisplayOpen}
      ref={columnRef}
    >
      <button
        className='p-visible-changer__button'
        type='button'
        aria-haspopup='true'
        onClick={() => changeIsColumnDisplayOpen((isOpen) => !isOpen)}
      >
        {triggerText}
      </button>

      <section className='p-visible-changer__dropdown'>
        <div className='p-visible-changer__body'>
          <h2 className='p-visible-changer__title'>{title}</h2>

          {_list.map((item, index) => (
            <Checkbox
              name='column'
              checked={item.isVisible}
              label={item.label}
              disabled={item.disabled || index < normailizedFixNumber}
              onChange={handleToggleCheck(item)}
              key={index}
            />
          ))}
        </div>

        <footer className='p-visible-changer__footer'>
          <Button
            className='-half'
            theme='tertiary'
            label='キャンセル'
            size='s'
            onClick={handleCancel}
          />

          <Button
            className='-half h-ml-8'
            type='button'
            theme='primary'
            label='変更'
            size='s'
            onClick={handleChange}
          />
        </footer>
      </section>
    </div>
  );
}
