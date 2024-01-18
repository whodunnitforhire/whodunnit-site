"use client";

import {
  ActionIcon,
  ActionIconProps,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export default function ThemeToggleButton(props: ActionIconProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ActionIcon
      variant="default"
      size="lg"
      aria-label="Color theme toggle"
      onClick={toggleColorScheme}
      {...props}
    >
      {computedColorScheme === "dark" ? (
        <IconSunFilled size={16} />
      ) : (
        <IconMoonFilled size={16} />
      )}
    </ActionIcon>
  );
}
