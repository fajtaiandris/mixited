import { faBackward, faForward, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { QueryClient, useQuery } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { OnProgressProps } from 'react-player/base';
import { useParams } from 'react-router-dom';

import { Playlist } from '@interfaces/Playlist';

import { Button } from '@ui/Button';

import { Cassette } from './Cassette';
import { Timer } from './Timer';
import { TrackNumber } from './TrackNumber';
import { YouTubePlayer } from './players/YouTubePlayer';

const tapeQuery = (id: string) => ({
  queryKey: ['tape', id],
  queryFn: async () => {
    const response = await fetch(`/api/tape/${id}`);
    if (!response.ok) {
      throw new Response('', {
        status: response.status,
        statusText: (await response.text()) || response.statusText,
      });
    }
    const tape: Playlist = await response.json();
    return tape;
  },
});

export const tapeLoader =
  (queryClient: QueryClient) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ params }: any) => {
    const query = tapeQuery(params.tapeId);
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };

type PlayerState = 'playing' | 'pausing' | 'stopped';

export const Tape: FC = () => {
  const { tapeId } = useParams();
  const { data } = useQuery(tapeQuery(tapeId as string));
  const tape = data || [];
  const [playerState, setPlayerState] = useState<PlayerState>('stopped');
  const [playedSeconds, setPlayedSeconds] = useState<number>(tape[0].startSec || 0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const track = tape[currentTrackIndex];

  const setTrack = (trackIndex: number) => {
    setPlayedSeconds(tape[trackIndex].startSec || 0);
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
    if (currentTrackIndex >= tape.length - 1) {
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
    if (currentTrackIndex === tape.length - 1) {
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
          {tape.map((track, i) => (
            <div key={i}>
              {`${i + 1}. ${track.title}`}
              <div className="h-1 bg-neutral-200"></div>
            </div>
          ))}
        </div>

        {/* Unhide this for debugging */}
        <div className="hidden">
          {tape.map((track, i) => {
            return currentTrackIndex === i ? (
              track.source === 'youtube' && (
                <div key={`player-${i}`} className="min-w-[500px] rounded-lg bg-neutral-800 p-2">
                  <YouTubePlayer
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
};
