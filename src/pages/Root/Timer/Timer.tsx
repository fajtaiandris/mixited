import cx from 'classix';
import React, { FC } from 'react';

import { Track } from '@interfaces/Track';

type ProgressBarProps = Pick<Track, 'startSec' | 'endSec'> & { playedSeconds: number; className?: string | undefined };

export const Timer: FC<ProgressBarProps> = ({ playedSeconds, startSec, className }) => {
  const elapsedSec = playedSeconds === 0 ? 0 : playedSeconds - (startSec || 0);
  const sec = Math.round(elapsedSec % 60);
  const min = Math.floor(elapsedSec / 60);
  return (
    <div className={cx('bg-neutral-700 px-2 font-mono text-lg text-neutral-100', className)}>
      {min < 10 ? '0' + min : min}
      {':'}
      {sec < 10 ? '0' + sec : sec}
    </div>
  );
};
