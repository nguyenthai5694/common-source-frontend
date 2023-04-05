import React, { useEffect, useMemo, useState } from 'react';
import { Subscription } from 'rxjs';
import Modal from 'common/blocks/modal/modal.component';
import ProgressBar from 'common/parts/progress-bar/progress-bar.components';
import { PortalDialogProps } from 'app/services/modal';

interface DownloadWaitProps {
  handleDownload: any;
  title?: string;
  shouldReturnErrorMessage?: boolean;
  errMessage?: string;
  onError?: (error) => void;
  onSuccess?: () => void;
}

export default function DownloadWait(props: PortalDialogProps<DownloadWaitProps>) {
  const [isSuccess, setIsSuccess] = useState(true);
  const [valueProgressBar, setValueProgressBar] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const subscription = useMemo(() => new Subscription(), []);
  const MIN_WAIT_TIME = 500;
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const handleDownloadSub = props.portaldata.handleDownload.subscribe({
      next(res) {
        setStartTime(Date.now());
        let percent = 0;

        if (res.originalEvent.total === 0) {
          percent = 100;
        } else {
          percent = Math.floor(res.originalEvent.loaded / res.originalEvent.total * 100);
        }

        setValueProgressBar(percent);
      },
      error(err) {
        setIsSuccess(false);
        props.portaldata.onError && props.portaldata.onError(err);

        const errorMess = props.portaldata.errMessage || err?.message || text('ERROR_UNEXPECTED');

        if (!props.portaldata.shouldReturnErrorMessage) {
          setErrorMessage(errorMess);
        } else {
          props.portalDialogRef.close({
            errorMessage: errorMess,
          });
        }
      },
    });

    subscription.add(handleDownloadSub);

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (valueProgressBar !== 100) return;

    const timeout = setTimeout(() => {
      props.portaldata.onSuccess && props.portaldata.onSuccess()
      props.portalDialogRef.close();
      clearTimeout(timeout);
    }, MIN_WAIT_TIME - (Date.now() - startTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProgressBar, startTime, props.portalDialogRef])

  return <>
    <Modal
      size='m'
      isOpen
      title={props.portaldata?.title || 'ダウンロード待機'}
      cancelId='Suspension'
      cancelLabel='中断'
      onCancel={props.portalDialogRef.close}
    >
      <ProgressBar
        value={valueProgressBar}
        defaultStatus={isSuccess ? 'valid' : '-inValid'}
        errorMessage={errorMessage} />
    </Modal>

  </>
}
