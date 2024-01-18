import { Box, SimpleGrid, Text, Button, Stack, BoxProps } from "@mantine/core";
import SectionTitle from "./section-title";

function Contact(props: BoxProps) {
  return (
    <Box {...props}>
      <SectionTitle>Contact Us</SectionTitle>
      <SimpleGrid mt={30} cols={2}>
        <Stack align="flex-start">
          <Text fw={600} fz="xl">
            Contact
          </Text>
          <Button
            component="a"
            href="tel:+1-410-549-2722"
            size="lg"
            color="var(--mantine-primary-color)"
          >
            CALL NOW
          </Button>
          <Text>(410) 549 2722</Text>
        </Stack>
        <Stack>
          <Text fw={600} fz="xl">
            Business Hours
          </Text>
          <Stack gap={6}>
            <Text>Mon: 7:30 AM-4:30 PM</Text>
            <Text>Tue: 7:30 AM-4:30 PM</Text>
            <Text>Wed: 7:30 AM-4:30 PM</Text>
            <Text>Thu: 7:30 AM-4:30 PM</Text>
            <Text>Fri: 7:30 AM-4:30 PM</Text>
            <Text>Sat: Closed</Text>
            <Text>Sun: Closed</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}

export default Contact;
