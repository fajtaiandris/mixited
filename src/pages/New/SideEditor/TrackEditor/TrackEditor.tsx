import {
  faArrowDown,
  faArrowUp,
  faCheck,
  faCut,
  faEdit,
  faExclamationTriangle,
  faRemove,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import cx from 'classix';
import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

import { Track } from '@interfaces/Track';

import { Button } from '@ui/Button';

import { clockTime } from '@util/time';

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
  console.log(index + 1 + track.label);
  const schema: ZodType<Inputs> = z.object({
    label: z.string().min(3, `Label is too short`).max(30, `Label is too long`),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onUpdate(index, { ...track, label: data.label });
  };

  useEffect(() => {
    reset();
  }, [isInEdit]);

  const handleStartEdit = () => {
    onStartEdit(index);
  };

  return (
    <div className={cx(isInEdit && 'border-neutral-700', 'border-2 border-neutral-100 bg-neutral-100 p-2')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between ">
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
            <Button icon={faArrowUp} isDisabled={isInEdit || !isMoveableUp} onClick={() => onMoveUp(index)} />
            <Button icon={faArrowDown} isDisabled={isInEdit || !isMovableDown} onClick={() => onMoveDown(index)} />
            <Button icon={faRemove} isDisabled={isInEdit} onClick={() => onRemove(index)} />
          </div>
        </div>
        {(track.startSec || track.endSec) && (
          <span>
            <FontAwesomeIcon icon={faCut} className="mr-2" />
            {track.startSec && clockTime(track.startSec)} - {track.endSec && clockTime(track.endSec)}
          </span>
        )}
        {!!errors.label && (
          <div className="mt-2 bg-red-400 p-2">
            <FontAwesomeIcon icon={faExclamationTriangle} /> {errors.label.message}
          </div>
        )}
      </form>
    </div>
  );
};
