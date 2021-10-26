import { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

import { Provider as NextAuthProvider } from 'next-auth/client';
import { SpotifyDataProvider } from '../contexts/SpotifyDataContext';

import '../styles/waves.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>share your best!</title>
      </Head>
      <NextAuthProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <SpotifyDataProvider>
            <Component {...pageProps} />
          </SpotifyDataProvider>
        </ChakraProvider>
      </NextAuthProvider>
    </>
  );
}

export default MyApp;
