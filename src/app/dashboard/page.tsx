import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { redirect } from "next/navigation";
import { AppShell } from "@mantine/core";
import Header from "./_components/Header";

export default async function Dashboard() {
  const { isAuthenticated, getPermission, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const access = await getPermission("access:dashboard");

  if (!access?.isGranted) {
    return (
      <>
        <p>This page has restricted access.</p>
        <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>
      </>
    );
  }

  noStore();

  const user = await getUser();

  return (
    <>
      <AppShell>
        <Header userEmail={user?.email || "unkown"} h={60} px="xl" />
      </AppShell>
    </>
  );
}
