/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable perfectionist/sort-imports */

import { createTheme } from '@mui/material/styles';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useState } from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import 'src/global.css';
import 'react-toastify/dist/ReactToastify.css';



const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function App() {
  useScrollToTop();
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
