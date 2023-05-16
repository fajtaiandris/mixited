import cx from 'classix';
import React, { FC } from 'react';

import { Track } from '@interfaces/Track';

import { clockTime } from '@util/time';

type ProgressBarProps = Pick<Track, 'startSec' | 'endSec'> & { playedSeconds: number; className?: string | undefined };

export const Timer: FC<ProgressBarProps> = ({ playedSeconds, startSec, className }) => {
  const elapsedSec = playedSeconds === 0 ? 0 : playedSeconds - (startSec || 0);
  return (
    <div className={cx('bg-neutral-700 px-2 font-mono text-lg text-neutral-100', className)}>
      {clockTime(elapsedSec)}
    </div>
  );
};
