"use client";

import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { CalendarIcon, Edit, Loader2, Save } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RelativeTime from '@yaireo/relative-time'
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
import { type ReactNode, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import TextCollapser from "@/components/TextCollapser";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PopoverDialog, PopoverDialogContent, PopoverDialogTrigger } from "@/components/ui/popover-dialog";

type ReviewsTabContentProps = {
  intialReviews: RouterOutputs["review"]["getAll"];
};

export default function ReviewsTabContent(props: ReviewsTabContentProps) {
  const { data: reviews } = api.review.getAll.useQuery(undefined, {
    initialData: props.intialReviews,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex gap-4">
        <h1 className="text-3xl font-medium">Reviews</h1>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-4 pt-4 pb-12 lg:grid-cols-3">
        {reviews?.map((review) => {
          return <ReviewView key={review.id} review={{ ...review }} />;
        })}
      </div>
    </div>
  );
}

function ReviewView(props: {
  review: RouterOutputs["review"]["getAll"][number];
}) {
  const relativeTime = new RelativeTime();
  const date = relativeTime.from(props.review.datePosted)
  return (
    <Card className="relative items-start space-y-2 p-6">
      <ReviewEditDialog review={props.review}>
        <Button className="absolute right-6 top-6 z-50 space-x-2 shadow-md">
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </ReviewEditDialog>
      <p className="text-lg font-medium leading-none">{props.review.author}</p>
      <p className="text-muted-foreground">{date}</p>
      <Rating count={props.review.rating} />
      <TextCollapser value={props.review.content} maxChars={500} />
    </Card>
  );
}

const reviewFormSchema = z.object({
  author: z.string().min(1).max(255),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(1),
  datePosted: z.date(),
});

// TODO: make user unable to switch back to view from edit while applying changes
function ReviewEditDialog(props: {
  review: RouterOutputs["review"]["getAll"][number];
  children: ReactNode;
}) {
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      author: props.review.author,
      rating: props.review.rating,
      content: props.review.content,
      datePosted: props.review.datePosted,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function setOpenAndReset(toOpen: boolean) {
    if (toOpen) {
      form.reset({ ...props.review });
    }
    setOpen(() => toOpen);
  }


  const utils = api.useUtils();

  const updateReview = api.review.update.useMutation({
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
      void utils.review.getAll.invalidate();
      toast.success("Review updated.");
      setOpen(false)
    },
  });

  function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    updateReview.mutate({
      id: props.review.id,
      author: values.author,
      rating: values.rating,
      content: values.content,
      datePosted: values.datePosted,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpenAndReset}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="datePosted"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Posted</FormLabel>
                  <PopoverDialog>
                    <PopoverDialogTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverDialogTrigger>
                    <PopoverDialogContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverDialogContent>
                  </PopoverDialog>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                    <Textarea {...field} className="h-24 lg:h-36" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <div className="container flex items-center justify-center gap-4">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Button type="submit" disabled={!open}>
                  <Save className="mr-2 h-4 w-4" />
                  <span>Apply</span>
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
