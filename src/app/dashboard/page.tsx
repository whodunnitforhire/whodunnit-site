import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewsTabContent from "./_components/ReviewsTabContent";
import { api } from "@/trpc/server";
import UpdatesTabContent from "./_components/UpdatesTabContent";
import { headers } from "next/headers";
import { verifyAccess } from "@/server/auth";
import AboutTabContent from "./_components/AboutTabContent";
import ProductsTabContent from "./_components/ProductsTabContent";
import ReturnToSiteButton from "./_components/ReturnToSiteButton";
import NavOptions from "./_components/NavOptions";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  // Cloudflare Access logs the admin in before the request gets here; this re-checks its JWT.
  const user = await verifyAccess(await headers());

  if (!user) {
    return (
      <main>
        <div className="m-auto flex min-h-screen w-full flex-col items-center justify-center gap-4">
          <p>Access to this page is restricted.</p>
          <Button variant="destructive" asChild>
            <a href="/cdn-cgi/access/logout">Logout</a>
          </Button>
        </div>
      </main>
    );
  }

  const reviews = await api.review.getAll();
  const updates = await api.update.getAll();
  const products = await api.product.getAll();
  const images = await api.image.getAll();
  const about = await api.about.get();

  return (
    <>
      <div className="mx-auto max-w-7xl p-12">
        <Tabs defaultValue="updates">
          <div className="flex items-center gap-4">
            <ReturnToSiteButton variant="outline" />
            <TabsList>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <div className="ml-auto justify-end">
              <NavOptions
                variant="ghost"
                size="icon"
                email={user.email ?? "Profile"}
              />
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
