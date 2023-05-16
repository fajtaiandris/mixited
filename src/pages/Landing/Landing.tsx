import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@ui/Button';

import { DevTools } from './DevTools';

export const Landing: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-neutral-200 p-5">
      <h2 className="mb-4 font-mono text-3xl text-black dark:text-white">
        <span className="block">Mixited</span>
        <span className="text-neutral-500">Your digital mix tapes</span>
      </h2>
      <Button icon={faPlay} text="Play" className="mr-2" />
      <Button icon={faPlus} text="Create" onClick={() => navigate('/new')} />
      {import.meta.env.DEV && (
        <div className="mt-10">
          <DevTools />
        </div>
      )}
    </div>
  );
};
