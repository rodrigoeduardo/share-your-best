import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '300px',
  md: '900px',
  lg: '1080px',
  xl: '1300px',
});

export const theme = extendTheme({
  breakpoints,
  colors: {
    gray: {
      500: '#181818',
    },
    green: {
      600: '#1ed760',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      html: {
        fontSize: {
          base: '62.5%',
          md: '75%',
          xl: '100%',
        },
        overflowX: 'hidden',
      },
      body: {
        bg: 'gray.500',
        color: 'white',
      },
    },
  },
});
