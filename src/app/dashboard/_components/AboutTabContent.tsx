"use client";

import { useState } from "react";
import Editor from "@/components/ui/editor/editor";
import { type RouterOutputs } from "@/trpc/shared";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

export default function AboutTabContent(props: {
  initialAbout: RouterOutputs["about"]["get"];
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { data: about } = api.about.get.useQuery(undefined, {
    initialData: props.initialAbout,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const [value, setValue] = useState(about.content);

  const utils = api.useUtils();

  const updateAbout = api.about.update.useMutation({
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
      void utils.about.get.invalidate();
      toast.success("About section updated.");
    },
  });

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex gap-4">
        <h1 className="text-3xl font-medium">About</h1>
        <Button
          onClick={() => updateAbout.mutate({ content: value })}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          <span>Apply</span>
        </Button>
      </div>
      <Editor content={value} onChange={setValue} placeholder="Write here..." />
    </div>
  );
}
