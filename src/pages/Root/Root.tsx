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
    endSec: 5,
  },
  {
    source: 'youtube',
    title: 'sweet dreams cover',
    content: 'jMfe7j-iMzI',
    startSec: 98,
    endSec: 150,
  },
  {
    source: 'youtube',
    title: `If You Think It's Love`,
    content: 'XR_PWnP8-CU',
    startSec: 45,
    endSec: 56.5,
  },
];

type PlayerState = 'playing' | 'pausing' | 'stopped';

export function Root() {
  const [playerState, setPlayerState] = useState<PlayerState>('stopped');
  const [playedSeconds, setPlayedSeconds] = useState<number>(playlist[0].startSec || 0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const track = playlist[currentTrackIndex];

  const setTrack = (trackIndex: number) => {
    setPlayedSeconds(playlist[trackIndex].startSec || 0);
    setCurrentTrackIndex(trackIndex);
  };

  const handlePlay = () => {
    if (playerState === 'playing') {
      return;
    }
    setPlayerState('playing');
  };

  const handlePause = () => {
    if (playerState !== 'playing') {
      return;
    }
    setPlayerState('pausing');
  };

  const handleStop = () => {
    if (playerState === 'stopped') {
      return;
    }
    setPlayerState('stopped');
    setTrack(0);
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
      handleStop();
      return;
    }
    handleForward();
  };

  return (
    <div className="h-screen bg-neutral-300">
      <div className="flex justify-center space-x-2 bg-neutral-200 p-2">
        <TrackNumber n={currentTrackIndex + 1} />
        <Timer playedSeconds={playedSeconds} startSec={track.startSec} endSec={track.endSec} />
        <Button icon={faBackward} onClick={handleRewind} />
        <Button icon={faPlay} onClick={handlePlay} isPushedIn={playerState === 'playing'} />
        <Button icon={faForward} onClick={handleForward} />
        <Button icon={faStop} onClick={handleStop} />
        <Button icon={faPause} onClick={handlePause} isPushedIn={playerState === 'pausing'} />
      </div>

      <div className="grid grid-cols-1 justify-items-center space-y-4 pt-4">
        <Cassette />
        <div className="space-y-2 bg-neutral-50 p-4 font-mono text-sm text-neutral-800">
          {playlist.map((track, i) => (
            <div key={i}>
              {`${i + 1}. ${track.title}`}
              <div className="h-1 bg-neutral-200"></div>
            </div>
          ))}
        </div>

        {/* Unhide this for debugging */}
        <div className="hidden">
          {playlist.map((track, i) => {
            return currentTrackIndex === i ? (
              track.source === 'youtube' && (
                <div className="min-w-[500px] rounded-lg bg-neutral-800 p-2">
                  <YouTubePlayer
                    key={`player-${i}`}
                    playing={currentTrackIndex === i && playerState === 'playing'}
                    track={track}
                    onProgress={(progress: OnProgressProps) => {
                      if (playerState !== 'playing' || currentTrackIndex !== i) {
                        return;
                      }
                      setPlayedSeconds(progress.playedSeconds);
                    }}
                    onStart={() => currentTrackIndex === i && handlePlay()}
                    onPlay={() => currentTrackIndex === i && handlePlay()}
                    onPause={() => currentTrackIndex === i && handlePause()}
                    onEnded={() => currentTrackIndex === i && handleTrackEnd()}
                  />
                </div>
              )
            ) : (
              <div key={`player-${i}`}>{`Freezed: ${track.title}`}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
