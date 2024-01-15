import { StackProps, Stack, Box, Title } from "@mantine/core";

function SectionTitle(props: StackProps) {
  return (
    <Stack justify="center" align="center" {...props}>
      <Box bg="var(--mantine-color-text)" w={50} h={2} />
      <Title order={4} fw="bold" tt="uppercase">
        {props.children}
      </Title>
    </Stack>
  );
}

export default SectionTitle;
