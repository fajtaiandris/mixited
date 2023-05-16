import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import { ErrorPage } from './pages/Error';
import { Landing } from './pages/Landing';
import { New } from './pages/New';
import { Tape, tapeLoader } from './pages/Tape';

async function prepare() {
  if (import.meta.env.DEV) {
    await import('./mocks/browser').then(({ worker }) => {
      worker.start();
    });
  }
}

const queryClient = new QueryClient();

prepare().then(() => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/tape/:tapeId',
      element: <Tape />,
      loader: tapeLoader(queryClient),
      errorElement: <ErrorPage />,
    },
    {
      path: '/new',
      element: <New />,
      errorElement: <ErrorPage />,
    },
  ]);

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
