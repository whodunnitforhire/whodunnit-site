"use client";

import {
  ImageToggleGroup,
  ImageToggleGroupItem,
} from "@/components/ImageToggleGroup";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthing";
import { type UploadFileResponse } from "uploadthing/client";
import ImageLoader from "@/components/ImageLoader";

export default function ImageChooser(props: {
  initialImages: RouterOutputs["image"]["getAll"];
}) {
  const { data: images } = api.image.getAll.useQuery(undefined, {
    initialData: props.initialImages,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const utils = api.useUtils();

  const deleteImage = api.image.delete.useMutation({
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
      void utils.image.getAll.invalidate();
      toast.success("Image deleted.");
    },
  });

  const createImage = api.image.create.useMutation({
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
      void utils.image.getAll.invalidate();
      toast.success("Image uploaded.");
    },
  })

  function uploadImage(
    res: UploadFileResponse<{
      uploadedBy: string;
    }>[],
  ) {
    res.map(img => {
      createImage.mutate({ key: img.key, url: img.url, size: img.size });
    })
  }

  const imageGroup = (
    <>
      <ImageToggleGroup
        variant="outline"
        type="single"
        className="flex flex-wrap gap-4"
      >
        <ImageToggleGroupItem value={"create"} className="h-24 w-32 p-0">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={uploadImage}
            onUploadError={(error: Error) => {
              toast.error(error.message);
            }}
            className="h-full w-full"
          />
        </ImageToggleGroupItem>
        {images.map((image) => {
          return (
            <ImageToggleGroupItem
              key={image.id}
              value={image.id}
              className="group h-24 w-32"
            >
              <ImageLoader
                src={image.url}
                fill
                sizes="256px"
                alt="image"
                className="rounded-md object-cover"
              />
              <Dialog>
                <DialogTrigger>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    <h1 className="text-lg">Delete image?</h1>
                  </DialogTitle>
                  <AspectRatio ratio={2 / 1}>
                    <ImageLoader
                      src={image.url}
                      fill
                      className="rounded-sm object-cover"
                      alt="image"
                    />
                  </AspectRatio>
                  <div className="container flex items-center justify-center gap-4">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Button
                          variant="destructive"
                          onClick={() => deleteImage.mutate({ id: image.id })}
                        >
                          Delete
                        </Button>
                        <DialogClose>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </ImageToggleGroupItem>
          );
        })}
      </ImageToggleGroup>
    </>
  );

  return <Card className="space-y-4 p-4">{imageGroup}</Card>;
}
