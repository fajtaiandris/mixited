import { faLink, faTools } from '@fortawesome/free-solid-svg-icons';
import cx from 'classix';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@ui/Button';

export const DevTools: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="absolute bottom-16 w-fit bg-neutral-700 font-mono text-neutral-200">
      <div className="bg-neutral-500 p-1">
        <Button
          icon={faTools}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <span className={cx(!isOpen && 'hidden', 'p-2')}>Dev Tools</span>
      </div>
      <div className={cx(!isOpen && 'hidden', 'p-4')}>
        <div className="grid grid-cols-1 space-y-2">
          <Link to={'/tape/dummy'}>
            <Button icon={faLink} text={'Dummy Tape'} />
          </Link>
          <Link to={'/tape/asd'}>
            <Button icon={faLink} text={'Not Found'} />
          </Link>
        </div>
        <p className="mt-4">
          This is only present in <span className="bg-neutral-500 px-1 font-mono">dev</span> mode.
        </p>
      </div>
    </div>
  );
};
