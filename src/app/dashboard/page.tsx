import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import ReviewsTabContent from "./_components/ReviewsTabContent";
import { api } from "@/trpc/server";
import UpdatesTabContent from "./_components/UpdatesTabContent";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const reviews = await api.review.getAll.query();
  const updates = await api.update.getAll.query();

  return (
    <>
      <DashboardNavbar userEmail="test@gmail.com" />
      <div className="mx-auto max-w-7xl px-12 pt-12">
        <Tabs defaultValue="updates">
          <TabsList>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="updates">
            <UpdatesTabContent initialUpdates={updates} />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTabContent intialReviews={reviews} />
          </TabsContent>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <AboutTabContent />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function AboutTabContent() {
  return (
    <>
      <p>About content</p>
    </>
  );
}

async function DashboardNavbar(props: { userEmail: string }) {
  return (
    <>
      <div className="flex w-full items-center justify-center border-b border-border p-2 px-4">
        <div className="flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center justify-center gap-4">
            <Button size="sm" variant="outline">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <p className="text-lg">Dashboard</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>{props.userEmail}</p>
            <Button variant="outline" size="sm">
              Logout
            </Button>
            <ThemeToggle size="sm" />
          </div>
        </div>
      </div>
    </>
  );
}
