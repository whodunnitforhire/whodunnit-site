"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2, PlusSquare, Save, Trash } from "lucide-react";
import { type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import Image from "next/image";
import ImageChooser from "./ImageChooser";
import ImageLoader from "@/components/ImageLoader";

export default function ProductsTabContent(props: {
  initialProducts: RouterOutputs["product"]["getAll"];
  initialImages: RouterOutputs["image"]["getAll"];
}) {
  const { data: products } = api.product.getAll.useQuery(undefined, {
    initialData: props.initialProducts,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex gap-4">
        <h1 className="text-3xl font-medium">Products</h1>
        <ProductEditDialog initialImages={props.initialImages}>
          <Button>
            <PlusSquare className="h-6 w-6 pr-2" />
            <span>New product</span>
          </Button>
        </ProductEditDialog>
      </div>
      <Separator />
    <div className="grid auto-rows-fr grid-cols-1 gap-4 break-words pt-4 sm:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <ProductView key={product.id} product={product} initialImages={props.initialImages} />
        ))}
      </div>
    </div>
  );
}

function ProductView(props: {
  product: RouterOutputs["product"]["getAll"][number];
  initialImages: RouterOutputs["image"]["getAll"];
}) {
  return (
    <Card className="relative">
      <ProductEditDialog product={props.product} initialImages={props.initialImages}>
        <Button variant="outline" size="icon" className="absolute z-50 right-2 top-2 shadow-md">
          <Edit className="h-4 w-4" />
        </Button>
      </ProductEditDialog>
      <AspectRatio ratio={3 / 2}>
        <Image
          src={props.product.image.url}
          alt="Update cover image"
          className="rounded-t-md object-cover"
          fill
        />
      </AspectRatio>
      <CardContent className="space-y-1 p-6">
        <p className="text-center text-lg">{props.product.title}</p>
        <p className="text-center text-muted-foreground">
          {props.product.caption}
        </p>
      </CardContent>
    </Card>
  );
}

const productFormSchema = z.object({
  title: z.string().min(1).max(255),
  caption: z.optional(z.string().max(255)),
});



// ===========================================================================
// Product Editor
// ===========================================================================

function ProductEditDialog(props: {
  product?: RouterOutputs["product"]["getAll"][number];
  initialImages: RouterOutputs["image"]["getAll"];
  children: ReactNode;
}) {
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { ...props.product },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<
    RouterOutputs["image"]["getAll"][number] | undefined
  >(!!props.product ? props.product.image : undefined);

  function setOpenAndReset(toOpen: boolean) {
    if (toOpen) {
      form.reset({ ...props.product });
      setImage(!!props.product ? props.product.image : undefined)
    }
    setOpen(() => toOpen);
  }

  const submitButtonTitle = !props.product ? "Create" : "Apply";

  const utils = api.useUtils();

  const updateProduct = api.product.update.useMutation({
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
      void utils.product.getAll.invalidate();
      toast.success("Product updated.");
      setOpen(false);
    },
  });

  const createProduct = api.product.create.useMutation({
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
      void utils.product.getAll.invalidate();
      toast.success("Product created.");
      setOpen(false);
    },
  });

  const deleteProduct = api.product.delete.useMutation({
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
      void utils.product.getAll.invalidate();
      toast.success("Product deleted.");
      setOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    if (!image) {
      toast.error("Error submitting form, image missing.")
      return
    };
    if (props.product) {
      updateProduct.mutate({ ...values, imageId: image.id, id: props.product?.id });
    } else {
      createProduct.mutate({ ...values, imageId: image.id });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpenAndReset}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <div className="flex gap-4">
          {!!image && (
            <div className="relative h-full w-24 rounded-md border">
              <div className="h-full w-full">
                <ImageLoader
                  src={image.url}
                  fill
                  className="object-cover"
                  alt="Chosen image"
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <p>Image <span className="text-muted-foreground opacity-50">{"(3:2)"}</span></p>
            <ImageChooser
              initialImages={props.initialImages}
              handleChoice={setImage}
            />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="container flex items-center justify-center gap-4 pt-2">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Button type="submit" disabled={!open || !image}>
                    <Save className="mr-2 h-4 w-4" />
                    {submitButtonTitle}
                  </Button>
                  {!!props.product && (
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
                            deleteProduct.mutate(props.product!.id);
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
