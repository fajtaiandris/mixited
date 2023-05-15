import { OnProgressProps } from 'react-player/base';

import { Track } from '@interfaces/Track';

export interface PlayerProps {
  playing: boolean;
  track: Track;
  onProgress: (state: OnProgressProps) => void;
  onStart: () => void;
  onPlay: () => void;
  onPause: () => void;
  onEnded: () => void;
}
