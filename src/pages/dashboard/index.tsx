import BackToSiteButton from "@/components/dashboard/back-to-site";
import ThemeButton from "@/components/theme-button";
import { AppShell, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";
import { useSession, signOut } from "next-auth/react";
import React from "react";

function Dashboard() {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure();

  if (!session) {
    return <p>Loading...</p>;
  }

  function SignOutModalContent() {
    return (
      <Stack justify="center" align="center" gap="lg">
        <Text>Are you sure you want to sign out?</Text>
        <Group justify="center">
          <Button onClick={() => signOut()} variant="filled" color="red">
            Sign out
          </Button>
          <Button onClick={close} variant="default">
            Cancel
          </Button>
        </Group>
      </Stack>
    );
  }

  return (
    <AppShell header={{ height: 60 }} mx={100}>
      <AppShell.Header>
        <Group h="100%" justify="space-between">
          <Group px="xl" preventGrowOverflow={false}>
            <BackToSiteButton />
          </Group>
          <Group px="xl" preventGrowOverflow={false}>
            <Text>{session.user?.email}</Text>
            <Modal opened={opened} onClose={close} title="Sign out" centered>
              <SignOutModalContent />
            </Modal>
            <Button
              onClick={open}
              variant="default"
              leftSection={<IconLogout size={16} />}
            >
              Sign out
            </Button>
            <ThemeButton />
          </Group>
        </Group>
      </AppShell.Header>
    </AppShell>
  );
}

export default Dashboard;
