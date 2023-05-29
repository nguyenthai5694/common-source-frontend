import React from 'react';
import { LicenseInfo } from '@mui/x-license-pro';

export default function License(props) {
  LicenseInfo.setLicenseKey('3218574ad598192754da52675c297eb9'
    + 'S1Y9MixTPXByZW1pdW0sTE09cGVycGV0dWFsLEU9MjUzNDAyMTg5MjAwMDAw');

  return <>
    {props.children}
  </>
}
