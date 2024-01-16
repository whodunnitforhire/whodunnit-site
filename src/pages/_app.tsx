import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@fontsource/baskervville";
import type { AppProps } from "next/app";
import {
  createTheme,
  MantineProvider,
  CSSVariablesResolver,
  Button,
} from "@mantine/core";
import buttons from "@/styles/buttons.module.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export const theme = createTheme({
  primaryColor: "violet",
  headings: {
    fontFamily: "Baskervville, Times New Roman, sans-serif",
    fontWeight: "400",
  },
  components: {
    Button: Button.extend({
      classNames: buttons,
    }),
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-primary-color": "var(--mantine-primary-color-9)",
  },
  dark: {
    "--mantine-primary-color": "var(--mantine-primary-color-6)",
  },
});

export default function App({ Component, pageProps }: AppProps, session: Session) {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
}
