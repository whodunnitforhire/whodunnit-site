"use client";

import { type RouterOutputs } from "@/trpc/shared";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Edit, PlusSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

type UpdatesTabContentProps = {
  initialUpdates: RouterOutputs["update"]["getAll"];
};

export default function UpdatesTabContent(props: UpdatesTabContentProps) {
  const { data: updates } = api.update.getAll.useQuery(undefined, {
    initialData: props.initialUpdates,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex gap-4">
        <h1 className="text-3xl font-medium">Updates</h1>
        <Button>
          <PlusSquare className="h-6 w-6 pr-2" />
          <span>New post</span>
        </Button>
      </div>
      <Separator />
      <div className="grid auto-rows-fr grid-cols-1 gap-4 pb-12 pt-4 md:grid-cols-2 lg:grid-cols-3">
        {updates?.map((update) => {
          return <UpdateView key={update.id} update={{ ...update }} />;
        })}
      </div>
    </div>
  );
}

function UpdateView(props: {
  update: RouterOutputs["update"]["getAll"][number];
}) {
  return (
    <div className="relative">
      <Card className="flex h-full flex-col">
        <Button
          variant="outline"
          className="absolute right-4 top-4 z-50 space-x-2 shadow-md"
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </Button>
        <AspectRatio ratio={2 / 1}>
          <Image
            src={props.update.image.url}
            alt="Update cover image"
            className="rounded-t-md object-cover"
            fill
          />
        </AspectRatio>
        <CardContent className="flex grow flex-col gap-4 pt-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">{props.update.title}</p>
            <p className="text-muted-foreground">{props.update.caption}</p>
          </div>
          <ScrollArea className="max-h-[205px]">
            <p>{props.update.content}</p>
          </ScrollArea>
          <div className="container flex grow items-end justify-center">
            <Link href={props.update.buttonLink} target="_blank">
              <Button variant="outline">{props.update.buttonName}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
