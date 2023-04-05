import React, { useEffect, useRef, useState } from 'react';
import { SoumuResponse } from 'app/services/http';

enum JobStatus {
  PROCESSING = 0,
  DONE = 1, // Thread runs from start to end
  ERROR = 2, // Exception throws, will be message
}

interface JobResponse {
  jobId: number;
  screenId: string;
  action: string;
  total: number;
  totalSuccess: number;
  processDone: number;
  status: JobStatus.PROCESSING | JobStatus.DONE | JobStatus.ERROR;
  detailOutput: string;
}

export type OnErrorResponse = {
  total: number;
  totalSuccess: number;
  errorList: any[];
  data,
};

export type OnErrorProps = {
  isSimpleError: boolean;
  response: string | OnErrorResponse;
};

type JobRequest = {
  requestUrl: string;
  requestParameters: { [key: string]: string };
};

type ProgressBarProps = {
  isImportSuccess: boolean;
  className?: string;
  request: JobRequest;
  onSuccess?: (res: OnErrorResponse) => void;
  onError?: (res: OnErrorProps) => void;
  warningMessage?: string;
  errorMessage?: string;
  onErrorForPortal?: (res?: SoumuResponse<any>) => void;
  fushoCode?: string
};

// Timer call api after each completion
// const timer = [0, 100, 200, 500, 500, 1000, 1000, 1500, 1500, 2000];

export function JobProgressBar({
  isImportSuccess,
  className,
  request,
  onSuccess,
  onError,
  onErrorForPortal,
  warningMessage = '',
  errorMessage,
  fushoCode = '',
}: ProgressBarProps) {
  const [placeHolderMessage, setPlaceHolderMessage] = useState(errorMessage || text('COMCE011'));
  const [isValid, setIsValid] = useState(true);

  const [valueProgress] = useState(0);

  const timeoutIdRef = useRef(null);

  useEffect(() => {
    if (errorMessage) {
      clearTimeout(timeoutIdRef.current);

      setPlaceHolderMessage(errorMessage);

      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errorMessage]);

  return (
    <div className='p-progress-bar-wrapper'>
      <div className={`p-progress-bar ${className || ''}`}>
        {isValid ? (
          <>
            <p className='p-progress-bar__message'>{placeHolderMessage}</p>

            <progress className='p-progress-bar__control' max={100} value={valueProgress}>
              {valueProgress}
            </progress>
          </>
        ) : (
          <>
            <p className='p-progress-bar__message -inValid' role='alert'>
              {placeHolderMessage}
            </p>

            <div className='p-progress-bar__control -inValid' />
          </>
        )}
      </div>

      <div className='p-progress-bar__warning'>{warningMessage}</div>
    </div>
  );
}
