import { faCut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classix';
import React, { FC, KeyboardEvent } from 'react';

import { clockTime } from '@util/time';

interface Props {
  length: number;
  startSec?: number;
  endSec?: number;
  isInEdit: boolean;
  onUpdate: (data: { startSec: number; endSec: number }) => void;
}

export const TimerIntervalInput: FC<Props> = ({
  length,
  startSec = 0,
  endSec = length,
  isInEdit = false,
  onUpdate,
}) => {
  const charStyle = `outline-none focus:bg-neutral-700 focus:text-neutral-100`;

  const startTime = clockTime(startSec);
  const endTime = clockTime(endSec);

  const isStartTimeVisible = (startSec > 0 && !isInEdit) || isInEdit;
  const isEndTimeVisible = (endSec < length && !isInEdit) || isInEdit;

  const handleKeyPressed = (e: KeyboardEvent<HTMLSpanElement>, element: 's' | 'e', amount: number) => {
    if (
      e.key !== 'ArrowDown' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'ArrowUp' &&
      !e.currentTarget.id
    ) {
      return;
    }

    const charPos = Number(e.currentTarget.id.split(':').pop());
    let changedValue = element === 's' ? startSec : endSec;

    if (e.key === 'ArrowDown') changedValue -= amount;
    if (e.key === 'ArrowUp') changedValue += amount;
    if (e.key === 'ArrowLeft' && charPos !== 1) document.getElementById(`${element}:${charPos - 1}`)?.focus();
    if (e.key === 'ArrowRight' && charPos !== 4) document.getElementById(`${element}:${charPos + 1}`)?.focus();

    changedValue >= 0 &&
      ((element === 's' && changedValue < endSec) || (element === 'e' && changedValue > startSec)) &&
      changedValue >= 0 &&
      changedValue <= length &&
      onUpdate({
        startSec: element === 's' ? changedValue : startSec,
        endSec: element === 'e' ? changedValue : endSec,
      });
  };

  if (!isStartTimeVisible && !isEndTimeVisible) {
    return null;
  }

  return (
    <div className="inline-block">
      <FontAwesomeIcon icon={faCut} className="mr-2" />

      {/* START_TIME */}
      {isStartTimeVisible && (
        <div className="inline-block">
          <span
            className={cx(charStyle, isInEdit && 'underline')}
            id="s:1"
            onKeyDown={(e) => handleKeyPressed(e, 's', 600)}
            role="button"
            tabIndex={-1}
          >
            {startTime.at(0)}
          </span>
          <span
            className={cx(charStyle, isInEdit && 'underline')}
            id="s:2"
            onKeyDown={(e) => handleKeyPressed(e, 's', 60)}
            role="button"
            tabIndex={-1}
          >
            {startTime.at(1)}
          </span>
          :
          <span
            className={cx(charStyle, isInEdit && 'underline')}
            id="s:3"
            onKeyDown={(e) => handleKeyPressed(e, 's', 10)}
            role="button"
            tabIndex={-1}
          >
            {startTime.at(3)}
          </span>
          <span
            className={cx(charStyle, isInEdit && 'underline')}
            id="s:4"
            onKeyDown={(e) => handleKeyPressed(e, 's', 1)}
            role="button"
            tabIndex={-1}
          >
            {startTime.at(4)}
          </span>
        </div>
      )}

      <span> - </span>

      {/* END_TIME */}
      {isEndTimeVisible && (
        <div className="inline-block">
          <span
            className={cx(charStyle, isInEdit && 'underline')}
            id="e:1"
            onKeyDown={(e) => handleKeyPressed(e, 'e', 600)}
            role="button"
            tabIndex={-1}
          >
            {endTime.at(0)}
          </span>
          <span
            className={cx(charStyle, isInEdit && 'underline')}
            id="e:2"
            onKeyDown={(e) => handleKeyPressed(e, 'e', 60)}
            role="button"
            tabIndex={-1}
          >
            {endTime.at(1)}
          </span>
          :
          <span
            className={cx(charStyle, isInEdit && 'underline')}
            id="e:3"
            onKeyDown={(e) => handleKeyPressed(e, 'e', 10)}
            role="button"
            tabIndex={-1}
          >
            {endTime.at(3)}
          </span>
          <span
            className={cx(charStyle, isInEdit && 'underline')}
            id="e:4"
            onKeyDown={(e) => handleKeyPressed(e, 'e', 1)}
            role="button"
            tabIndex={-1}
          >
            {endTime.at(4)}
          </span>
        </div>
      )}
    </div>
  );
};
