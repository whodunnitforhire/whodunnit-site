"use client";
import {
  AppShell,
  AppShellMain,
  AppShellMainProps,
  Box,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import Header from "./Header";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import ReviewEditor from "./ReviewEditor";
import { api } from "@/trpc/react";
import { IconInfoCircle, IconNews, IconStar } from "@tabler/icons-react";

type PageContentProps = {
  user: KindeUser;
};

export default function PageContent(
  props: AppShellMainProps & PageContentProps
) {
  const reviews = api.review.getAll.useQuery().data;

  return (
    <AppShell>
      <Header userEmail={props.user?.email || "unkown"} h={60} px="xl" />
      <AppShellMain pt={110} px={50}>
        <Box maw={1600} mx="auto">
          <Tabs defaultValue="updates">
            <Tabs.List>
              <Tabs.Tab value="updates" leftSection={<IconNews size={16} />}>
                Updates
              </Tabs.Tab>
              <Tabs.Tab value="reviews" leftSection={<IconStar size={16} />}>
                Reviews
              </Tabs.Tab>
              <Tabs.Tab value="info" leftSection={<IconInfoCircle size={16} />}>
                Info
              </Tabs.Tab>
            </Tabs.List>
            <Space h="xl" />
            <Tabs.Panel value="updates">
                <Text>Updates Panel</Text>
            </Tabs.Panel>
            <Tabs.Panel value="reviews">
              <SimpleGrid cols={3} spacing="lg">
                {reviews?.map((r) => (
                  <ReviewEditor key={r.id} review={r} />
                ))}
              </SimpleGrid>
            </Tabs.Panel>
            <Tabs.Panel value="info">
                <Text>Info Panel</Text>
            </Tabs.Panel>
          </Tabs>
        </Box>
      </AppShellMain>
    </AppShell>
  );
}
