import { rest } from 'msw';

import { CassetteTape } from '@interfaces/CassetteTape';

const dummyPlaylist: CassetteTape = {
  sideA: [
    {
      source: 'youtube',
      label: 'Hit the Back',
      content: '3TYznvuRMwk',
      startSec: 6,
      endSec: 238,
    },
    {
      source: 'youtube',
      label: `If You Think It's Love`,
      content: 'XR_PWnP8-CU',
      startSec: 45,
      endSec: 56.5,
    },
  ],
  sideB: [],
};

export const handlers = [
  rest.get('/api/tape/:tapeId', (req, res, ctx) => {
    const { tapeId } = req.params;
    if (tapeId === 'dummy') {
      return res(ctx.status(200), ctx.json(dummyPlaylist));
    }
    return res(ctx.status(404), ctx.text('Tape does not exist'));
  }),
];
