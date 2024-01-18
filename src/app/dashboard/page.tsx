import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { redirect } from "next/navigation";
import { AppShell, Text, Container, Stack, Button } from "@mantine/core";
import Header from "./_components/Header";

export default async function Dashboard() {
  const { isAuthenticated, getPermission, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const access = await getPermission("access:dashboard");

  if (!access?.isGranted) {
    return <UnauthorizedPage />;
  }

  const user = await getUser();

  return (
    <>
      <AppShell>
        <Header userEmail={user?.email || "unkown"} h={60} px="xl" />
      </AppShell>
    </>
  );
}

function UnauthorizedPage() {
  "use client";
  return (
    <Container mx="auto" mt={100}>
      <Stack gap="lg" justify="center" align="center">
        <Text>This page has restricted access.</Text>
        <LogoutLink postLogoutRedirectURL="/">
          <Button color="red">Logout</Button>
        </LogoutLink>
      </Stack>
    </Container>
  );
}
