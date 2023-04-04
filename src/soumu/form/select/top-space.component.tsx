import React, { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

interface TopSpaceProps {
  spaceObs: BehaviorSubject<any>;
}

function TopSpace({
  spaceObs,
}: TopSpaceProps) {
  const [topSpace, setTopSpace] = useState(0);

  useEffect(() => {
    const sub = spaceObs.subscribe(newSpace => {
      setTopSpace(newSpace[0]);
    });

    return () => sub.unsubscribe();
  }, [spaceObs])

  return <li style={{ padding: 0, border: 0, height: topSpace }} />
}

export const TopSpaceMemo = React.memo(TopSpace);
