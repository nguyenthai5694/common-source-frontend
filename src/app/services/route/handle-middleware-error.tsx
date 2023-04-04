import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

export function handleMiddlewareError(result): ReactElement {
  if (typeof result === 'function') {
    return result();
  }

  if (typeof result === 'string') {
    return <Redirect to={result} />
  }

  return null;
}