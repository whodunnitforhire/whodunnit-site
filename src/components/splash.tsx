import { Box, Button, Stack, Title, Text, Image, BoxProps } from "@mantine/core";
import classes from "./splash.module.css"

function Splash(props: BoxProps) {
  return (
    <Box {...props}>
      <Stack justify="center" align="center" gap="xl">
        <Title className={classes.title}>Whodunnit for Hire</Title>
        <Text size="lg" maw={580} lh={1}>
          Murder Mystery Entertainment | Headquartered in Maryland
        </Text>
        <Button>CALL (410) 549 2722</Button>
        <Image
          src="https://lh3.googleusercontent.com/p/AF1QipOAK-3NDFsQaydhIDih4kSwG-e-5yq4NUw1z1jz=w1080-h608-p-no-v0"
          alt="Whodunnitforhire splash image"
        />
      </Stack>
    </Box>
  );
}

export default Splash;
