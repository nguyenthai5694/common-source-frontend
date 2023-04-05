import React, { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

interface BottomSpaceProps {
  spaceObs: BehaviorSubject<any>;
}

function BottomSpace({
  spaceObs,
}: BottomSpaceProps) {
  const [bottomSpace, setBottomSpace] = useState(0);

  useEffect(() => {
    const sub = spaceObs.subscribe(newSpace => {
      setBottomSpace(newSpace[1]);
    });

    return () => sub.unsubscribe();
  }, [spaceObs])

  return <li style={{ padding: 0, border: 0, height: bottomSpace }} />
}

export const BottomSpaceMemo = React.memo(BottomSpace);
