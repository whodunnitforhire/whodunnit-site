import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import styles from "../index.module.css";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { redirect } from "next/navigation";
import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";

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
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <div className={styles.main}>
      <h1>Dashboard</h1>
      <p>Hello, {user?.email}</p>

      <div className={styles.showcaseContainer}>
        <p className={styles.showcaseText}>
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>
      </div>

      <CrudShowcase />

      <Reviews />

      <LogoutLink>Logout</LogoutLink>
    </div>
  );
}

async function Reviews() {
  const allReviews = await api.review.getAll.query();

  return (
    <>{allReviews.map(r => r.content)}</>
  )
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query();

  return (
    <div className={styles.showcaseContainer}>
      {latestPost ? (
        <p className={styles.showcaseText}>
          Your most recent post: {latestPost.name}
        </p>
      ) : (
        <p className={styles.showcaseText}>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
