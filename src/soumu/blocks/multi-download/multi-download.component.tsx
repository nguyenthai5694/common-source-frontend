import React from 'react';
import clsx from 'clsx';
import { FormControlChildProps } from 'soumu/form';
import Button from 'soumu/parts/button/button.component';
import Help from 'soumu/parts/help/help.component';

interface MultiDownload extends FormControlChildProps {
  id?: string;
  title?: string;
  attachInfo?: string;
  onClick?: () => void;
  disabled?: boolean;
  tabIndexTooltip?: 0 | -1;
  isDisableMultiDowloadBtn?: boolean;
}

export default function MultiDownload({
  id = 'btnDownloadMultiPDF',
  title = '添付のファイルをまとめてダウンロードできます',
  attachInfo = '複数の追加ドキュメントを同時にダウンロードできます',
  onClick = () => { },
  disabled = false,
  tabIndexTooltip = 0,
  isDisableMultiDowloadBtn = false,
}: MultiDownload) {
  return (
    <section className='u-forms'>
      <div className='u-forms__header'></div>

      <div className='u-forms__body'>
        <dl className='u-forms__list'>
          <div className='u-forms__item'>
            <dd className='u-forms__value'>{title}

              <Help text={attachInfo} tabIndex={tabIndexTooltip}></Help>
            </dd>

            <dd>
              <Button
                id={id}
                onClick={onClick}
                label='まとめてPDFダウンロード'
                size='m'
                theme='secondary'
                icon='download'
                disabled={disabled || isDisableMultiDowloadBtn}
                className={clsx({ '-tooltip': isDisableMultiDowloadBtn })}
              >
                まとめてPDFダウンロード
                {isDisableMultiDowloadBtn && <span className='b-table__help-text'>ダウロード中</span>}
              </Button>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
