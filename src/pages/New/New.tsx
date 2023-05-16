import React, { FC, useState } from 'react';

import { CassetteTape } from '@interfaces/CassetteTape';
import { Track } from '@interfaces/Track';

import { SideEditor } from './SideEditor';

export type Side = 'A' | 'B';

export const New: FC = () => {
  const [sideInEdit, setSideInEdit] = useState<Side | null>(null);
  const [tape, setTape] = useState<CassetteTape>({
    sideA: [
      {
        source: 'youtube',
        label: 'Hit the Back',
        content: '3TYznvuRMwk',
        startSec: 6,
        endSec: 238,
      },
      {
        source: 'youtube',
        label: `If You Think It's Love`,
        content: 'XR_PWnP8-CU',
        startSec: 45,
        endSec: 56.5,
      },
    ],
    sideB: [],
  });

  const handleSideUpdate = (trackList: Track[], side: Side) => {
    if (side === 'A') {
      setTape({ ...tape, sideA: trackList });
    }
    if (side === 'B') {
      setTape({ ...tape, sideB: trackList });
    }
    setSideInEdit(null);
  };

  return (
    <div className="h-screen space-y-2 bg-neutral-200 p-4">
      <h1 className="font-mono text-2xl">Mix Tape Creator</h1>
      <div className="grid lg:grid-cols-2">
        {(['A', 'B'] as Side[]).map((side) => (
          <SideEditor
            key={side}
            side={side}
            trackList={side === 'A' ? tape.sideA : tape.sideB}
            isInEdit={sideInEdit === side}
            onStartEdit={() => {
              setSideInEdit(side);
            }}
            onUpdate={(trackList) => handleSideUpdate(trackList, side)}
          />
        ))}
      </div>
    </div>
  );
};
