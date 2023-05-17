import { faPlus } from '@fortawesome/free-solid-svg-icons';
import getYouTubeID from 'get-youtube-id';
import React, { FC, useState } from 'react';

import { Track } from '@interfaces/Track';

import { Button } from '@ui/Button';

import { Side } from '../New';
import { TrackEditor } from './TrackEditor/TrackEditor';

interface SideEditorProps {
  side: Side;
  trackList: Track[];
  isInEdit: boolean;
  onStartEdit: () => void;
  onUpdate: (trackList: Track[]) => void;
}

export const SideEditor: FC<SideEditorProps> = ({ side, isInEdit, onStartEdit, onUpdate, trackList }) => {
  const [trackInEdit, setTrackInEdit] = useState<number | null>(null);

  const handleTrackUpdate = (index: number, track: Track) => {
    onUpdate([...trackList.slice(0, index), track, ...trackList.slice(index + 1)]);
    setTrackInEdit(null);
  };

  const handleTrackStartEdit = (index: number) => {
    onStartEdit();
    setTrackInEdit(index);
  };

  const handleTrackMoveUp = (index: number) => {
    onUpdate([...trackList.slice(0, index - 1), trackList[index], trackList[index - 1], ...trackList.slice(index + 1)]);
  };

  const handleTrackMoveDown = (index: number) => {
    onUpdate([...trackList.slice(0, index), trackList[index + 1], trackList[index], ...trackList.slice(index + 2)]);
  };

  const handleTrackRemove = (index: number) => {
    onUpdate([...trackList.slice(0, index), ...trackList.slice(index + 1)]);
  };

  const handleTrackPaste = async () => {
    const youTubeId = getYouTubeID(await navigator.clipboard.readText());
    if (!youTubeId) {
      return;
    }
    onUpdate([...trackList, { label: 'untitled', content: youTubeId, source: 'youtube', startSec: 10, endSec: 20 }]);
  };

  return (
    <div className="p-1 font-mono">
      <div className="grid grid-cols-1 space-y-2 bg-neutral-300 p-2">
        <h2 className="text-xl">Side {side}</h2>
        {trackList.map((track, i) => (
          <TrackEditor
            key={side + i}
            track={track}
            index={i}
            isInEdit={isInEdit && trackInEdit === i}
            isMovableDown={i < trackList.length - 1}
            isMoveableUp={i > 0}
            onMoveUp={handleTrackMoveUp}
            onMoveDown={handleTrackMoveDown}
            onRemove={handleTrackRemove}
            onUpdate={handleTrackUpdate}
            onStartEdit={handleTrackStartEdit}
          />
        ))}
        <div className="flex justify-center">
          <Button icon={faPlus} text={'Click to paste link'} onClick={handleTrackPaste} />
        </div>
      </div>
    </div>
  );
};
