import { TrackSource } from './TrackSource';

export type Track = {
  source: TrackSource;
  title: string;
  content: string;
  startSec?: number;
  endSec?: number;
};
