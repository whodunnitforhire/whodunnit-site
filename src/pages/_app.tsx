import '@/styles/globals.css'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css';
import '@fontsource/baskervville';
import type { AppProps } from 'next/app'
import { createTheme, MantineProvider, CSSVariablesResolver } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'violet',
  headings: { fontFamily: 'Baskervville, Times New Roman, sans-serif', fontWeight: '400' },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: { },
  light: {
    '--mantine-primary-color': 'var(--mantine-primary-color-9)',
  },
  dark: {
    '--mantine-primary-color': 'var(--mantine-primary-color-6)',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <Component {...pageProps} />
    </MantineProvider>
  ) 
}
