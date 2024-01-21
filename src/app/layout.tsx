import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import '@mantine/tiptap/styles.css';

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { TRPCReactProvider } from "@/trpc/react";
import { theme } from "@/styles/theme";

export const metadata = {
  title: "Whodunnit for Hire",
  description:
    "Whodunnit for Hire turns ordinary events into fun, engaging and interactive murder mystery parties. Have a blast! But watch out. This is so much fun you might die laughing.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
