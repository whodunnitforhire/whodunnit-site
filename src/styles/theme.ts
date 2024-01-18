"use client";

import { Button, createTheme } from "@mantine/core";
import "@fontsource/baskervville";
import buttons from "./buttons.module.css";

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
