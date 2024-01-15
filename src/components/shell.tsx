import {
  AppShell,
  Burger,
  Group,
  Title,
  Stack,
  Button,
  } from "@mantine/core";
import { PropsWithChildren } from "react";
import { IconCalendarEvent, IconPhone } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ThemeButton from "./theme-button";

type ShellProps = {};

type HeaderProps = {
  navBarOpened: boolean;
  toggleNavBar: () => void;
};

function Shell(props: PropsWithChildren<ShellProps>) {
  const [opened, handler] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      mx={100}
    >
      <AppShell.Navbar p="lg">
        <Stack align="stretch">
          <Button
            variant="subtle"
            color="var(--mantine-color-text)"
            size="xl"
            fw="normal"
          >
            Updates
          </Button>
          <Button
            variant="subtle"
            color="var(--mantine-color-text)"
            size="xl"
            fw="normal"
          >
            Testimonials
          </Button>
          <Button
            variant="subtle"
            color="var(--mantine-color-text)"
            size="xl"
            fw="normal"
          >
            About us
          </Button>
          <Button
            variant="subtle"
            color="var(--mantine-color-text)"
            size="xl"
            fw="normal"
          >
            Gallery
          </Button>
          <Button
            variant="subtle"
            color="var(--mantine-color-text)"
            size="xl"
            fw="normal"
          >
            Contact
          </Button>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Header>
        <Group
          h="100%"
          px="xl"
          justify="space-between"
          preventGrowOverflow={false}
        >
          <Group>
            <Burger opened={opened} onClick={handler.toggle} size="sm" />
            <Title order={3} lineClamp={1}>
              Whodunnit for Hire
            </Title>
          </Group>
          <Group visibleFrom="xs" gap={0}>
            <Button
              component="a"
              href="tel:+1-410-549-2722"
              variant="transparent"
              color="var(--mantine-color-text)"
              fw="normal"
              leftSection={<IconPhone size={14} />}
            >
              Call Now
            </Button>
            <Button
              component="a"
              href="https://whodunnit-for-hire.eventbrite.com/"
              target="_blank"
              variant="transparent"
              color="var(--mantine-color-text)"
              fw="normal"
              leftSection={<IconCalendarEvent size={14} />}
            >
              Make Appointment
            </Button>
            <ThemeButton variant="subtle" color="var(--mantine-color-text)" radius="xl" />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main px={0} mx="auto" mb={250} mt={50} maw={1100}>
        {props.children}
      </AppShell.Main>
    </AppShell>
  );
}

export default Shell;
