import { TrackSource } from './TrackSource';

export type Track = {
  source: TrackSource;
  label: string;
  content: string;
  startSec?: number;
  endSec?: number;
};
