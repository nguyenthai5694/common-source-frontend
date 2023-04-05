import React from 'react';
// import { useSessionLog } from 'app/hooks/use-session-log.hook'
import { MatchRoutes, normalizeRoutes } from 'app/services/route'
import { appRoutes } from 'app/modules/routes';

export default function Bootstrap() {
  // send request for logging user session.
  // useSessionLog();

  return <MatchRoutes routes={normalizeRoutes(appRoutes, '/')} />
}
