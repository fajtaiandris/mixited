import React, { FC } from 'react';

export const Cassette: FC = () => {
  return (
    <div className="relative h-32 w-56 bg-neutral-400">
      <div className="absolute top-10 left-10 h-10 w-10 rounded-full bg-neutral-500"></div>
      <div className="absolute top-10 right-10 h-10 w-10 rounded-full bg-neutral-500"></div>
      <div className="absolute top-28 left-20 h-4 w-16 bg-neutral-500"></div>
    </div>
  );
};
