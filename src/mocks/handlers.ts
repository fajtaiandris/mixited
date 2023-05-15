import { rest } from 'msw';

import { Playlist } from '@interfaces/Playlist';

const dummyPlaylist: Playlist = [
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

export const handlers = [
  rest.get('/api/tape/:tapeId', (req, res, ctx) => {
    const { tapeId } = req.params;
    if (tapeId === 'dummy') {
      return res(ctx.status(200), ctx.json(dummyPlaylist));
    }
    return res(ctx.status(404), ctx.text('Tape does not exist'));
  }),
];
