import React, { useState } from 'react';
import clsx from 'clsx';
import Modal from 'common/blocks/modal/modal.component';
import { Checkbox } from 'common/form';
import { ModalService, PortalDialogProps } from 'app/services/modal';

export enum TypeFileOutput {
  EXCEL = 'excel',
  CSV = 'csv',
}

interface FormOutputProps {
  typeFileOutput?: string[];
}

export default function FormOutputSelect(props: PortalDialogProps<FormOutputProps>) {
  const [csvOption, setCsvOption] = useState(props.portaldata?.typeFileOutput &&
    props.portaldata?.typeFileOutput.includes(TypeFileOutput.CSV)
    && props.portaldata?.typeFileOutput.length === 1,
  )
  const [excelOption, setExcelOption] = useState(props.portaldata?.typeFileOutput &&
    props.portaldata?.typeFileOutput.includes(TypeFileOutput.EXCEL)
    && props.portaldata?.typeFileOutput.length === 1)
  const handleSubmit = () => {
    const modal = new ModalService();

    modal.openDialog({
      children: <span></span>,
      size: 's',
      submitLabel: 'BTN_OK',
      cancelLabel: 'BTN_CANCEL',
      onCancel: modal.close,
      onSubmit: () => {
        props.portalDialogRef.close({
          excel: excelOption,
          csv: csvOption,
        })
        modal.close()
      },
    })
  }

  return <>
    <Modal
      size='m'
      isOpen
      title='様式出力選択'
      cancelId='btnClose'
      cancelLabel='閉じる'
      submitId='btnDownLoad'
      submitLabel='ダウンロード開始'
      onSubmit={handleSubmit}
      onCancel={props.portalDialogRef.close}
      disabledSubmitButton={!csvOption && !excelOption}
    >
      <label>様式出力形式を選択してダウンロード開始ボタンを押してください。</label>

      <div className='h-mt-24 h-mb-20'>
        {
          (!props.portaldata?.typeFileOutput || props.portaldata?.typeFileOutput.includes(TypeFileOutput.EXCEL)) &&
          <Checkbox
            checked={excelOption}
            onChange={(e) => setExcelOption(e.target.checked)}
            label='Excel形式' value='1' />
        }

        {
          (!props.portaldata?.typeFileOutput || props.portaldata?.typeFileOutput.includes(TypeFileOutput.CSV)) &&
          <Checkbox
            checked={csvOption}
            onChange={(e) => setCsvOption(e.target.checked)}
            className={clsx({
              'h-ml-52': !props.portaldata?.typeFileOutput || props.portaldata?.typeFileOutput.length === 2,
            })}
            label='CSV形式' value='2' />
        }
      </div>

    </Modal>
  </>
}
