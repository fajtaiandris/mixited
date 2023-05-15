import React, { FC } from 'react';

export const TrackNumber: FC<{ n: number }> = ({ n }) => {
  return <span className="bg-neutral-700 px-2 font-mono text-lg text-neutral-100">{'nr.' + n}</span>;
};
