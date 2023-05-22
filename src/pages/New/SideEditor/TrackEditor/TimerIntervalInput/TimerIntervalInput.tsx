import { faCut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classix';
import React, { FC, RefObject, useRef } from 'react';

import { clockTime } from '@util/time';

interface Props {
  length: number;
  startSec?: number;
  endSec?: number;
  isInEdit: boolean;
  onUpdate: (data: { startSec: number; endSec: number }) => void;
  onEnter: () => void;
}

export const TimerIntervalInput: FC<Props> = ({
  length,
  startSec = 0,
  endSec = length,
  isInEdit = false,
  onUpdate,
  onEnter,
}) => {
  const digitRefs: Map<'s' | 'e', RefObject<HTMLSpanElement>[]> = new Map([
    [
      's',
      [
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null),
      ],
    ],
    [
      'e',
      [
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null),
      ],
    ],
  ]);

  const charStyle = cx(
    'outline-none cursor-default',
    isInEdit && 'cursor-pointer underline focus:bg-neutral-700 focus:text-neutral-100',
  );

  const startTime = clockTime(startSec);
  const endTime = clockTime(endSec);

  const isStartTimeVisible = (startSec > 0 && !isInEdit) || isInEdit;
  const isEndTimeVisible = (endSec < length && !isInEdit) || isInEdit;

  const handleKeyPressed = (key: string, element: 's' | 'e', charPos: number) => {
    if (key === 'Enter') {
      onEnter();
      return;
    }
    if (!isInEdit && key !== 'ArrowDown' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'ArrowUp') {
      return;
    }

    const amount = [600, 60, 10, 1][charPos];
    let changedValue = element === 's' ? startSec : endSec;

    if (key === 'ArrowDown') changedValue -= amount;
    if (key === 'ArrowUp') changedValue += amount;
    if (key === 'ArrowLeft' && charPos !== 0) digitRefs.get(element)?.[charPos - 1].current?.focus();
    if (key === 'ArrowRight' && charPos !== 3) digitRefs.get(element)?.[charPos + 1].current?.focus();

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
    <div className="inline-block cursor-default font-mono">
      <FontAwesomeIcon icon={faCut} className="mr-2" />

      {/* START_TIME */}
      {isStartTimeVisible && (
        <div className="inline-block">
          <span
            className={charStyle}
            ref={digitRefs.get('s')?.[0]}
            onKeyDown={(e) => handleKeyPressed(e.key, 's', 0)}
            role="button"
            tabIndex={0}
          >
            {startTime.at(0)}
          </span>
          <span
            className={charStyle}
            ref={digitRefs.get('s')?.[1]}
            onKeyDown={(e) => handleKeyPressed(e.key, 's', 1)}
            role="button"
            tabIndex={0}
          >
            {startTime.at(1)}
          </span>
          :
          <span
            className={charStyle}
            ref={digitRefs.get('s')?.[2]}
            onKeyDown={(e) => handleKeyPressed(e.key, 's', 2)}
            role="button"
            tabIndex={0}
          >
            {startTime.at(3)}
          </span>
          <span
            className={charStyle}
            ref={digitRefs.get('s')?.[3]}
            onKeyDown={(e) => handleKeyPressed(e.key, 's', 3)}
            role="button"
            tabIndex={0}
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
            className={charStyle}
            ref={digitRefs.get('e')?.[0]}
            onKeyDown={(e) => handleKeyPressed(e.key, 'e', 0)}
            role="button"
            tabIndex={0}
          >
            {endTime.at(0)}
          </span>
          <span
            className={charStyle}
            ref={digitRefs.get('e')?.[1]}
            onKeyDown={(e) => handleKeyPressed(e.key, 'e', 1)}
            role="button"
            tabIndex={0}
          >
            {endTime.at(1)}
          </span>
          :
          <span
            className={charStyle}
            ref={digitRefs.get('e')?.[2]}
            onKeyDown={(e) => handleKeyPressed(e.key, 'e', 2)}
            role="button"
            tabIndex={0}
          >
            {endTime.at(3)}
          </span>
          <span
            className={charStyle}
            ref={digitRefs.get('e')?.[3]}
            onKeyDown={(e) => handleKeyPressed(e.key, 'e', 3)}
            role="button"
            tabIndex={0}
          >
            {endTime.at(4)}
          </span>
        </div>
      )}
    </div>
  );
};
