import "@/styles/globals.css";
import '@fontsource/baskervville';

import { Inter as FontSans } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
