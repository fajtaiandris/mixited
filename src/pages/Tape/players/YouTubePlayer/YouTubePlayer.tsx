import React, { FC } from 'react';
import ReactPlayer from 'react-player/youtube';

import { PlayerProps } from '../PlayerProps';

export const YouTubePlayer: FC<PlayerProps> = (props) => {
  const startQuery = props.track.startSec ? `&start=${props.track.startSec}` : '';
  const endQuery = props.track.endSec ? `&end=${props.track.endSec}` : '';
  return (
    <ReactPlayer {...props} url={`https://www.youtube.com/watch?v=${props.track.content}${startQuery}${endQuery}`} />
  );
};
