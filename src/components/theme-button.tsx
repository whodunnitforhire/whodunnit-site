import {
  ActionIcon,
  ActionIconProps,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

function ThemeButton(props: ActionIconProps) {
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
        <IconSunFilled style={{ width: "50%", height: "50%" }} />
      ) : (
        <IconMoonFilled style={{ width: "50%", height: "50%" }} />
      )}
    </ActionIcon>
  );
}

export default ThemeButton;
