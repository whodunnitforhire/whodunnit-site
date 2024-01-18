import {
  Box,
  Button,
  Stack,
  Title,
  Text,
  Image,
  BoxProps,
} from "@mantine/core";
import classes from "./splash.module.css";
import cover from "/public/cover-image.jpg";

function Splash(props: BoxProps) {
  return (
    <Box {...props}>
      <Stack justify="center" align="center" gap="xl">
        <Title className={classes.title}>Whodunnit for Hire</Title>
        <Text size="lg" maw={580} lh={1}>
          Murder Mystery Entertainment | Headquartered in Maryland
        </Text>
        <Button>CALL (410) 549 2722</Button>
        <Image src={cover.src} alt="Whodunnitforhire splash image" />
      </Stack>
    </Box>
  );
}

export default Splash;
