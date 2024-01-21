import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import PageContent from "./_components/PageContent";
import UnauthorizedPage from "./_components/UnauthorizedPage";

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

  if (user) {
    return <PageContent user={user} />;
  } else {
    return <></>;
  }
}
