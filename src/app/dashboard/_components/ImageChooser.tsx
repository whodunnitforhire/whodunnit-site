"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { FileImage, Loader2, MoreVertical, Trash } from "lucide-react";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthing";
import { type UploadFileResponse } from "uploadthing/client";
import ImageLoader from "@/components/ImageLoader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ImageChooser(props: {
  initialImages: RouterOutputs["image"]["getAll"];
  handleChoice: (image: RouterOutputs["image"]["getAll"][number]) => void;
  className?: string;
}) {
  const { data: images } = api.image.getAll.useQuery(undefined, {
    initialData: props.initialImages,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function handleSelect(image: RouterOutputs["image"]["getAll"][number]) {
    props.handleChoice(image);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className={"space-x-2 " + props.className}>
          <FileImage className="h-5 w-5" />
          <span>Choose Image</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w- max-h-[95vh] rounded-md p-0">
        <OptionsMenu setLoading={setIsLoading} className="absolute left-6 top-10 z-50" disabled={isLoading} />
        <div className="grid auto-rows-fr grid-cols-3 gap-3 overflow-x-clip overflow-y-auto p-6">
          <GridItem className="col-span-3 flex items-center justify-center border-none">
            <ImageUploader
              setLoading={setIsLoading}
              className={isLoading ? "scale-0" : ""}
            />
            <Loader2
              className={"absolute animate-spin " + (isLoading ? "" : "hidden")}
            />
          </GridItem>
          {images.map((img) => (
            <GridItem key={img.id} image={img} handleSelect={handleSelect} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}



// ===========================================================================
// Grid Item
// ===========================================================================

function GridItem(props: {
  image?: RouterOutputs["image"]["getAll"][number];
  children?: ReactNode;
  className?: string;
  handleSelect?: (image: RouterOutputs["image"]["getAll"][number]) => void;
}) {
  return (
    <div className={`relative min-h-24 rounded-md border ` + props.className}>
      {props.image ? (
        <div className="group">
          <ImageLoader
            src={props.image.url}
            fill
            className="rounded-sm object-cover hover:cursor-pointer"
            onClick={() => {
              if (!!props.image && !!props.handleSelect) {
                return props.handleSelect(props.image);
              }
            }}
            alt="image"
          />
          <DeleteDialog image={props.image} />
        </div>
      ) : (
        props.children && props.children
      )}
    </div>
  );
};



// ===========================================================================
// Upload Button
// ===========================================================================
function OptionsMenu(props: { setLoading: (isLoading: boolean) => void } & ButtonProps) {
  const utils = api.useUtils();

  const deleteUnused = api.image.prune.useMutation({
    onMutate: () => {
      props.setLoading(true)
    },
    onSettled: () => {
      props.setLoading(false)
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSuccess: () => {
      void utils.image.getAll.invalidate();
      toast.success("Successfully deleted unused images.");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          {...props}
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="space-x-2" onClick={() => deleteUnused.mutate()}>
          <Trash className="h-4 w-4" />
          <span>Delete unused</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



// ===========================================================================
// Upload Button
// ===========================================================================
function ImageUploader(props: { setLoading: (isLoading: boolean) => void, className?: string }) {
  const utils = api.useUtils();

  const createImage = api.image.create.useMutation({
    onMutate: () => {
      props.setLoading(true)
    },
    onSettled: () => {
      props.setLoading(false)
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSuccess: () => {
      void utils.image.getAll.invalidate();
      toast.success("Image uploaded.");
    },
  });

  function uploadImage(
    res: UploadFileResponse<{
      uploadedBy: string;
    }>[],
  ) {
    res.map((img) => {
      createImage.mutate({ key: img.key, url: img.url, size: img.size });
    });
  }

  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={uploadImage}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
      className={props.className}
    />
  );
}



// ===========================================================================
// Delete Button and Dialog
// ===========================================================================

function DeleteDialog(props: { image: RouterOutputs["image"]["getAll"][number] }) {
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const utils = api.useUtils();

  const deleteImage = api.image.delete.useMutation({
    onMutate: () => {
      setIsLoadingMutation(true);
    },
    onSettled: () => {
      setIsLoadingMutation(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      void utils.image.getAll.invalidate();
      toast.success("Image deleted.");
    },
  });

  return (
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
        {!!isLoadingImage && (
          <div className="absolute flex h-full w-full items-center">
            <Loader2 className="m-auto animate-spin" />
          </div>
        )}
        <Image
          src={props.image.url}
          width={800}
          height={400}
          className="w-full rounded-sm object-cover"
          alt="image"
          onLoad={() => setIsLoadingImage(false)}
        />
        <div className="container flex items-center justify-center gap-4">
          {isLoadingMutation ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <Button
                variant="destructive"
                onClick={() => deleteImage.mutate({ id: props.image.id })}
                disabled={isLoadingImage}
              >
                Delete
              </Button>
              <DialogClose>
                <Button variant="outline" disabled={isLoadingImage}>Cancel</Button>
              </DialogClose>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}