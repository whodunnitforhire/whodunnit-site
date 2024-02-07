"use client";

import { type RouterOutputs } from "@/trpc/shared";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, PlusSquare, Save, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { DialogTitle, Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState, type ReactNode } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator  } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { type CheckedState } from "@radix-ui/react-checkbox";

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
        <UpdateEditDialog>
          <Button>
            <PlusSquare className="h-6 w-6 pr-2" />
            <span>New update</span>
          </Button>
        </UpdateEditDialog>
      </div>
      <Separator />
      <div className="grid auto-rows-fr grid-cols-1 gap-4 break-words pt-4 md:grid-cols-2 lg:grid-cols-3">
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
  const includeShowMore = props.update.content.length > 300;
  return (
    <div className="relative">
      <Card className="flex h-full flex-col">
        <UpdateEditDialog update={props.update}>
          <Button
            variant="outline"
            className="absolute right-4 top-4 z-50 space-x-2 shadow-md"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
        </UpdateEditDialog>
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
          {includeShowMore ? (
            <p>
              {`${props.update.content.substring(0, 300)}... `}
              <Dialog>
                <DialogTrigger className="text-primary">
                  Show more
                </DialogTrigger>
                <DialogContent className="p-8">
                  <DialogTitle>
                    <h1 className="text-lg font-semibold">
                      {props.update.title}
                    </h1>
                  </DialogTitle>
                  <p>{props.update.content}</p>
                </DialogContent>
              </Dialog>
            </p>
          ) : (
            <p>{props.update.content}</p>
          )}
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

const updateFormSchema = z.object({
  title: z.string().min(1).max(255),
  caption: z.optional(z.string().max(255)),
  content: z.string().min(1),
  imageId: z.string(),
  buttonName: z.string().min(1).max(255),
  buttonLink: z.string().min(1).max(2083),
});

export function UpdateEditDialog(props: {
  update?: RouterOutputs["update"]["getAll"][number];
  children: ReactNode;
}) {
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: { ...props.update },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // set to true because checkbox is checked by default
  const [autoDeleteOld, setAutoDeleteOld] = useState<CheckedState>(true);

  function setOpenAndReset(toOpen: boolean) {
    if (toOpen) {
      form.reset({ ...props.update });
      setAutoDeleteOld(true)
    }
    setOpen(() => toOpen);
  }

  const submitButtonTitle = !props.update ? "Create" : "Apply";

  const utils = api.useUtils();

  const updateUpdate = api.update.update.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSuccess: () => {
      void utils.update.getAll.invalidate();
      toast.success("Review updated.");
      setOpen(false);
    },
  });

  const createUpdate = api.update.create.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSuccess: () => {
      void utils.update.getAll.invalidate();
      toast.success("Review created.");
      setOpen(false);
    },
  });

  const deleteUpdate = api.update.delete.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSuccess: () => {
      void utils.update.getAll.invalidate();
      toast.success("Post deleted.");
      setOpen(false);
    },
  });

  // doesn't invalidate data because it's used alongside another endpoint
  const deleteOldestUpdates = api.update.deleteAllButNewest.useMutation({
    onError: () => {
      toast.error("Failed to delete oldest.");
    },
  })

  function onSubmit(values: z.infer<typeof updateFormSchema>) {
    if (props.update) {
      updateUpdate.mutate({ ...values, id: props.update.id });
    } else {
      if (autoDeleteOld === true) {
        deleteOldestUpdates.mutate(8)
      }
      createUpdate.mutate({ ...values });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpenAndReset}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="imageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Caption{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-36" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="buttonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buttonLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            {!props.update && (
              <div className="container flex justify-center items-center space-x-2">
                <Checkbox id="deletion" defaultChecked checked={autoDeleteOld} onCheckedChange={setAutoDeleteOld} />
                <Label htmlFor="deletion" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {"Auto delete old posts (keep 8 newest)"}
                </Label>
              </div>
            )}
            <div className="container flex items-center justify-center gap-4">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Button type="submit" disabled={!open}>
                    <Save className="mr-2 h-4 w-4" />
                    {submitButtonTitle}
                  </Button>
                  {!!props.update && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="destructive" disabled={!open}>
                          <Trash className="mr-2 h-4 w-4" />
                          {"Delete"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="shadow-md">
                        <DropdownMenuLabel>Are you sure?</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            deleteUpdate.mutate(props.update!.id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
