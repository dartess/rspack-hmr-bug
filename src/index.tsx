import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Header } from './Header/Header';

const BotAnalyticsPageLazy = lazy(() => import('./Page/Page'));

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <>
    <Header />
    <Suspense fallback={null}>
      <BotAnalyticsPageLazy />
    </Suspense>
  </>,
);
