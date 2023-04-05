import React, { useEffect, useState } from 'react';
import { FormControlChildProps } from 'common/form'

export interface ErrorProps extends FormControlChildProps {
  display?: any;
  errorMessageClass?: string,
}

export function Readonly({
  formik,
  name,
  status,
  display,
  errorMessageClass = '',
}: ErrorProps) {
  const [_status, changeStatus] = useState(status);

  useEffect(() => {
    changeStatus(status);
  }, [status])

  return (
    <div>
      {display}

      {(_status === 'inValid' || _status === 'warn') ? (
        <div className={`p-input__message -inValid ${errorMessageClass}`}>
          {/* {formik ? formik.getFieldMeta(name).error : message} */}
        </div>
      ) : null}
    </div>
  )
}
