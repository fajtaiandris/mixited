import { faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { FC, useState } from 'react';

import { CassetteTape } from '@interfaces/CassetteTape';
import { Track } from '@interfaces/Track';

import { Button } from '@ui/Button';

import { InsertEditor } from './InsertEditor';
import { SideEditor } from './SideEditor';

export type Side = 'A' | 'B';

export const New: FC = () => {
  const [sideInEdit, setSideInEdit] = useState<Side | null>(null);
  const [tape, setTape] = useState<CassetteTape>({
    sideA: [],
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

  const handleSave = () => {
    console.log(tape);
  };

  return (
    <div className="h-screen space-y-4 bg-neutral-200 p-4">
      <div className="flex space-x-4">
        <h1 className="font-mono text-2xl">Mix Tape Creator</h1>
        <Button icon={faCheck} text="Save" className="text-lg" onClick={handleSave} />
      </div>

      <InsertEditor />

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
