import React, { useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// TODO: remove export default
export default function Loading() {
  /**
   * The reason to set HTML direct into "root-loading" is to compatible with
   * current code and prevent issue with "position".
   *
   * Eg: If "Loading" display inside a element having scroll, it will not
   * display as expected.
   */
  const loadingRef = useRef()
  const loadingElmRef = useMemo(() => {
    const loadingElm = document.createElement('div')

    loadingElm.innerHTML = `
      <div class='p-loading'>
        <div class='p-loading__indicator'>
          <p class='p-loading__text' role='alert' aria-busy='true'>
            ${loadingRef.current}
          </p>
        </div>
      </div>
    `;

    document.getElementById('root-loading').appendChild(loadingElm);

    return loadingElm;
  }, [loadingRef]);

  useEffect(
    () => () => {
      (document.getElementById('root-loading') as any).removeChild(loadingElmRef)
    },
    [loadingElmRef, loadingRef],
  );

  return <>
    <Box sx={{ display: 'none' }} ref={loadingRef}>
      <CircularProgress />
    </Box>
  </>;
}
