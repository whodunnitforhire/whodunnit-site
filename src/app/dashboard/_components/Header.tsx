"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  ActionIcon,
  AppShellHeader,
  AppShellHeaderProps,
  Button,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import {
  IconArrowBack,
  IconArrowNarrowLeft,
  IconLogout,
} from "@tabler/icons-react";
import Link from "next/link";

type HeaderProps = {
  userEmail: string;
};

export default function Header(props: AppShellHeaderProps & HeaderProps) {
  return (
    <AppShellHeader {...props}>
      <Group justify="space-between" h="100%">
        <Group justify="center" align="center">
          <ActionIcon variant="default" size="lg" component={Link} href="/">
            <IconArrowNarrowLeft size={16} />
          </ActionIcon>
          <Text>Dashboard</Text>
        </Group>
        <Group justify="center" align="center">
          <Text>{props.userEmail}</Text>
          <Menu width={200} shadow="md">
            <Menu.Target>
              <Button variant="default">Logout</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconArrowBack size={16} />}
                component={Link}
                href={"/"}
              >
                <Text>Return to site</Text>
              </Menu.Item>
              <Menu.Item color="red" leftSection={<IconLogout size={16} />}>
                <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </AppShellHeader>
  );
}
