import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewsTabContent from "./_components/ReviewsTabContent";
import { api } from "@/trpc/server";
import UpdatesTabContent from "./_components/UpdatesTabContent";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import AboutTabContent from "./_components/AboutTabContent";
import ProductsTabContent from "./_components/ProductsTabContent";
import ReturnToSiteButton from "./_components/ReturnToSiteButton";
import NavOptions from "./_components/NavOptions";

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
  const products = await api.product.getAll.query();
  const images = await api.image.getAll.query();
  const about = await api.about.get.query();

  return (
    <>
      <div className="mx-auto max-w-7xl p-12">
        <Tabs defaultValue="updates">
          <div className="flex gap-4 items-center">
            <ReturnToSiteButton variant="outline" />
            <TabsList>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <div className="justify-end ml-auto">
              <NavOptions variant="ghost" size="icon" email={user?.email ?? "Profile"} />
            </div>
          </div>
          <TabsContent value="updates">
            <UpdatesTabContent
              initialUpdates={updates}
              initialImages={images}
            />
          </TabsContent>
          <TabsContent value="products">
            <ProductsTabContent
              initialProducts={products}
              initialImages={images}
            />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTabContent intialReviews={reviews} />
          </TabsContent>
          <TabsContent value="about">
            <AboutTabContent initialAbout={about} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
