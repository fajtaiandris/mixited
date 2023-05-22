import {
  faArrowDown,
  faArrowUp,
  faCheck,
  faEdit,
  faExclamationTriangle,
  faPaste,
  faRemove,
  faTape,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import cx from 'classix';
import getYouTubeID from 'get-youtube-id';
import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

import { Track } from '@interfaces/Track';

import { Button } from '@ui/Button';

import { TimerIntervalInput } from './TimerIntervalInput';

interface TrackEditorProps {
  track: Track;
  index: number;
  isInEdit: boolean;
  isMovableDown: boolean;
  isMoveableUp: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updatedTrack: Track) => void;
  onStartEdit: (index: number) => void;
}

type Inputs = {
  label: string;
  content: string;
  startSec: number;
  endSec: number;
};

export const TrackEditor: FC<TrackEditorProps> = ({
  track,
  index,
  isInEdit,
  isMovableDown,
  isMoveableUp,
  onMoveUp,
  onMoveDown,
  onRemove,
  onUpdate,
  onStartEdit,
}) => {
  const dummyLength = 20;
  const schema: ZodType<Inputs> = z.object({
    label: z.string().min(3, `Label is too short`).max(30, `Label is too long`),
    content: z.string().min(1),
    startSec: z.number().min(0, `Minimum value is 0`).max(3599),
    endSec: z.number().min(0, `Maximum can not be higher than the length of the track`).max(3599),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onUpdate(index, {
      source: track.source,
      label: data.label,
      content: data.content,
      ...(data.startSec !== 0 && { startSec: data.startSec }),
      ...(data.endSec !== dummyLength && { endSec: data.endSec }),
    });
  };

  useEffect(() => {
    reset({ startSec: track.startSec, endSec: track.endSec });
  }, [isInEdit]);

  const handleStartEdit = () => {
    onStartEdit(index);
  };

  const handleUpdateLinkFromClipboard = async () => {
    const youTubeId = getYouTubeID(await navigator.clipboard.readText());
    if (!youTubeId) {
      return;
    }
    setValue('content', youTubeId);
  };

  const handleTimerUpdate: (data: { startSec: number; endSec: number }) => void = ({ startSec, endSec }) => {
    setValue('startSec', startSec);
    setValue('endSec', endSec);
  };

  return (
    <div className={cx(isInEdit && 'border-neutral-700', 'border-2 border-neutral-100 bg-neutral-100 p-2')}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex justify-between">
          <span>
            <span>{index + 1}. </span>
            <input
              className={cx(isInEdit && 'underline underline-offset-4', 'w-fit bg-neutral-100 outline-none')}
              defaultValue={track.label}
              disabled={!isInEdit}
              {...register('label')}
            ></input>
          </span>
          <div className="space-x-1">
            {!isInEdit && <Button icon={faEdit} onClick={handleStartEdit} />}
            {isInEdit && <Button icon={faCheck} type={'submit'} />}
            <Button
              icon={faArrowUp}
              isDisabled={isInEdit || !isMoveableUp}
              onClick={() => onMoveUp(index)}
              className="disabled:hidden"
            />
            <Button
              icon={faArrowDown}
              isDisabled={isInEdit || !isMovableDown}
              onClick={() => onMoveDown(index)}
              className="disabled:hidden"
            />
            <Button icon={faRemove} isDisabled={isInEdit} onClick={() => onRemove(index)} className="disabled:hidden" />
          </div>
        </div>
        <div className="flex space-x-2">
          <FontAwesomeIcon icon={faTape} className="pt-1" />
          <input
            className={cx(isInEdit && 'underline underline-offset-4', 'w-full bg-neutral-100 outline-none')}
            defaultValue={track.content}
            disabled={!isInEdit}
            {...register('content')}
          ></input>
          <Button
            icon={faPaste}
            isDisabled={!isInEdit}
            onClick={handleUpdateLinkFromClipboard}
            className="disabled:hidden"
          />
        </div>
        <div>
          <TimerIntervalInput
            isInEdit={isInEdit}
            startSec={watch('startSec')}
            endSec={watch('endSec')}
            length={dummyLength}
            onUpdate={handleTimerUpdate}
            onEnter={handleSubmit(onSubmit)}
          ></TimerIntervalInput>
          {!!errors.label && (
            <div className="mt-2 bg-red-400 p-2">
              <FontAwesomeIcon icon={faExclamationTriangle} /> {errors.label.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
