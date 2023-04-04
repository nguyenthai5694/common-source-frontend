import { ReactElement, useEffect, useState } from 'react';

interface LazyProps {
  promise: Promise<any>;
  onComplete: (result: any) => ReactElement;
}

export function Lazy(props: LazyProps) {
  const [result, setResult] = useState('running');

  // @ts-ignore
  useEffect(() => {
    let isSubscribed = true

    props.promise.then(result => {
      if (isSubscribed) {
        setResult(result);
      }
    });

    return () => { isSubscribed = false }
  });

  return props.onComplete(result);
}
