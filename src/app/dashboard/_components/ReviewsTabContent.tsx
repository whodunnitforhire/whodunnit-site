"use client";

import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { Edit, Loader2, ScanSearch } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { toast } from "sonner";

export default function ReviewsTabContent() {
  const { data: reviews } = api.review.getAll.useQuery();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex gap-4">
        <h1 className="text-3xl font-medium">Reviews</h1>
        {isEditing ? (
          <Button onClick={() => setIsEditing(false)}>
            <ScanSearch className="h-6 w-6 pr-2" />
            <span>View</span>
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-6 w-6 pr-2" />
            <span>Edit</span>
          </Button>
        )}
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-3">
        {reviews?.map((review) => {
          if (isEditing) {
            return <ReviewEdit key={review.id} review={{ ...review }} />;
          }
          return <ReviewView key={review.id} review={{ ...review }} />;
        })}
      </div>
    </div>
  );
}

function ReviewView(props: {
  review: RouterOutputs["review"]["getAll"][number];
}) {
  return (
    <Card className="items-start space-y-2 p-6">
      <p className="text-lg font-medium">{props.review.author}</p>
      <Rating count={props.review.rating} />
      <p>{props.review.content}</p>
    </Card>
  );
}

const reviewFormSchema = z.object({
  author: z.string().min(1).max(255),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(1),
});

// TODO: make user unable to switch back to view from edit while applying changes
function ReviewEdit(props: {
  review: RouterOutputs["review"]["getAll"][number];
}) {
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      author: props.review.author,
      rating: props.review.rating,
      content: props.review.content,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

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
    },
  });

  function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    updateReview.mutate({
      id: props.review.id,
      author: values.author,
      rating: values.rating,
      content: values.content,
    });
  }

  return (
    <Card className="p-4">
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
                  <Textarea {...field} className="h-24 lg:h-72" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <Button type="submit" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Apply changes</span>
            </Button>
          ) : (
            <Button type="submit">Apply changes</Button>
          )}
        </form>
      </Form>
    </Card>
  );
}
