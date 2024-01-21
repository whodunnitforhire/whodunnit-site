import { unstable_noStore as noStore } from "next/cache";
import { api } from "@/trpc/react";
import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  NumberInput,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Review } from "@prisma/client";
import { useState } from "react";

type ReviewProps = {
  review: Review;
};

export default function ReviewEditor(props: ReviewProps) {
  noStore();

  const [data, setData] = useState<Review>(props.review);
  const [loading, { toggle: toggleLoading }] = useDisclosure(false);

  const updateReview = api.review.editById.useMutation({
    onMutate: () => {
      toggleLoading();
    },
    onSettled: () => {
      toggleLoading();
    },
  });

  return (
    <Card withBorder>
      <Stack gap="md">
        <LoadingOverlay visible={loading} zIndex={1000} />
        <NumberInput
          label="Stars"
          min={1}
          max={5}
          value={data.rating}
          onChange={(n) => {
            const rating = Number(n);
            setData({ ...data, rating: rating });
          }}
        />
        <TextInput
          label="Author"
          value={data.author}
          onChange={(n) => {
            setData({ ...data, author: n.target.value });
          }}
        />
        <Textarea
          autosize
          minRows={12}
          maxRows={20}
          label="Content"
          value={data.content}
          onChange={(n) => {
            setData({ ...data, content: n.target.value });
          }}
        />
      </Stack>
      <Group grow mt="lg">
        <Button onClick={() => updateReview.mutate({ ...data })}>
          Save
        </Button>
        <Button
          variant="default"
          onClick={() => {
            setData(props.review);
          }}
        >
          Cancel
        </Button>
      </Group>
    </Card>
  );
}
