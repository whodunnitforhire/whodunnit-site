import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import ReviewsTabContent from "./_components/ReviewsTabContent";
import { api } from "@/trpc/server";
import UpdatesTabContent from "./_components/UpdatesTabContent";
import ImageChooser from "./_components/ImageChooser";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AboutTabContent from "./_components/AboutTabContent";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();

  if (!await isAuthenticated()) {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard")
  }

  const access = await getPermission("access:dashboard");

  if (!access?.isGranted) {
    return (
      <main>
        <div className="m-auto flex min-h-screen w-full flex-col items-center justify-center gap-4">
          <p>Access to this page is restricted.</p>
          <LogoutLink postLogoutRedirectURL="/">
            <Button variant="destructive">Logout</Button>
          </LogoutLink>
        </div>
      </main>
    );
  }

  const user = await getUser();

  const reviews = await api.review.getAll.query();
  const updates = await api.update.getAll.query();
  const images = await api.image.getAll.query();

  return (
    <>
      <DashboardNavbar userEmail={user?.email ?? ""} />
      <div className="mx-auto max-w-7xl px-12 pt-12">
        <Tabs defaultValue="updates">
          <TabsList>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>
          <TabsContent value="updates">
            <UpdatesTabContent initialUpdates={updates} />
          </TabsContent>
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTabContent intialReviews={reviews} />
          </TabsContent>
          <TabsContent value="about">
            <AboutTabContent />
          </TabsContent>
          <TabsContent value="images">
            <ImageChooser initialImages={images} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

async function DashboardNavbar(props: { userEmail: string }) {
  return (
    <>
      <div className="flex w-full items-center justify-center border-b border-border p-2 px-4">
        <div className="flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center justify-center gap-4">
            <Link href="/">
              <Button size="sm" variant="outline">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <p className="min-w-0 text-lg">Dashboard</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>{props.userEmail}</p>
            <LogoutLink postLogoutRedirectURL="/">
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </LogoutLink>
            <ThemeToggle size="sm" />
          </div>
        </div>
      </div>
    </>
  );
}
