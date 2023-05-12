import { faBackward, faForward, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { OnProgressProps } from 'react-player/base';

import { Playlist } from '@interfaces/Playlist';

import { Button } from '@ui/Button';

import { Cassette } from './Cassette';
import { Timer } from './Timer';
import { TrackNumber } from './TrackNumber';
import { YouTubePlayer } from './players/YouTubePlayer';

const playlist: Playlist = [
  {
    source: 'youtube',
    title: 'Fireflies',
    content: 'KWnH23lgHOY',
    startSec: 0,
    endSec: 5,
  },
  {
    source: 'youtube',
    title: `If You Think It's Love`,
    content: 'XR_PWnP8-CU',
    startSec: 45,
    endSec: 56.5,
  },
];

export function Root() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState<number>(playlist[0].startSec || 0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const track = playlist[currentTrackIndex];
  console.log(track);

  const setTrack = (trackIndex: number) => {
    setCurrentTrackIndex(trackIndex);
    setPlayedSeconds(playlist[trackIndex].startSec || 0);
  };

  const handlePlay = () => {
    if (isPlaying) {
      return;
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!isPlaying) {
      return;
    }
    setIsPlaying(false);
  };

  const handleForward = () => {
    if (currentTrackIndex >= playlist.length - 1) {
      return;
    }
    setTrack(currentTrackIndex + 1);
  };

  const handleRewind = () => {
    if (currentTrackIndex <= 0) {
      return;
    }
    setTrack(currentTrackIndex - 1);
  };

  const handleTrackEnd = () => {
    if (currentTrackIndex === playlist.length - 1) {
      setTrack(0);
    } else {
      handleForward();
    }
  };

  return (
    <div className="h-screen bg-neutral-300">
      <div className="flex justify-center space-x-2 bg-neutral-200 p-2">
        <TrackNumber n={currentTrackIndex + 1} />
        <Timer
          className="bg-neutral-700 px-2 text-neutral-100"
          playedSeconds={playedSeconds}
          startSec={track.startSec}
          endSec={track.endSec}
        />
        <Button isDisabled={currentTrackIndex <= 0} onClick={handleRewind} icon={faBackward} />
        <Button onClick={isPlaying ? handlePause : handlePlay} icon={faPlay} isPushedIn={isPlaying} />
        <Button isDisabled={currentTrackIndex >= playlist.length - 1} onClick={handleForward} icon={faForward} />
        <Button icon={faStop} />
        <Button icon={faPause} />
      </div>

      <div className="grid grid-cols-1 justify-items-center space-y-4">
        <div className="hidden min-w-[500px] rounded-lg bg-neutral-800 p-2">
          {track.source === 'youtube' && (
            <YouTubePlayer
              playing={isPlaying}
              track={track}
              onProgress={(progress: OnProgressProps) => {
                setPlayedSeconds(progress.playedSeconds);
              }}
              onStart={handlePlay}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleTrackEnd}
            />
          )}
        </div>
        <Cassette />
        <div className="space-y-2 bg-neutral-50 p-4 font-mono text-sm text-neutral-800">
          {playlist.map((track, i) => (
            <div key={i}>
              {`${i + 1}. ${track.title}`}
              <div className="h-1 bg-neutral-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
