import {
  Box,
  SimpleGrid,
  Stack,
  Group,
  Rating,
  Text,
  Spoiler,
  Title,
  Button,
  BoxProps,
} from "@mantine/core";
import SectionTitle from "./section-title";

function Testimonials(props: BoxProps) {
  return (
    <Box {...props}>
      <SectionTitle>Testimonials</SectionTitle>
      <SimpleGrid mt={30} cols={3} spacing={64}>
        {testimonials.map((review) => (
          <Stack key={review.id}>
            <Group>
              <Rating value={review.rating} readOnly />
              <Text c="dimmed">{review.time}</Text>
            </Group>
            <Spoiler
              maxHeight={300}
              showLabel="Read more"
              hideLabel="Show less"
            >
              &quot;{review.review}&quot;
            </Spoiler>
            <Title order={4} fw="bold" c="var(--mantine-primary-color)">
              - {review.author}
            </Title>
          </Stack>
        ))}
      </SimpleGrid>
      <Group mt={60} gap="xl" justify="center">
        <Button
          variant="test"
          component="a"
          href="https://search.google.com/local/writereview?placeid=ChIJKV5EgtkkyIkR60fnn3S75mw"
          target="_blank"
        >
          WRITE A REVIEW
        </Button>
        <Button
          variant="test"
          component="a"
          href="https://search.google.com/local/reviews?placeid=ChIJKV5EgtkkyIkR60fnn3S75mw"
          target="_blank"
        >
          READ MORE
        </Button>
      </Group>
    </Box>
  );
}

type TestimonialData = {
  id: string;
  rating: number;
  time: string;
  review: string;
  author: string;
};

const testimonials: TestimonialData[] = [
  {
    id: "0",
    rating: 5,
    time: "11 months ago",
    review:
      "We had a family night out to Doozy's for a Murder Mystery Dinner 50 theme. So much fun! Very interactive with the guest. Good story line for you to suspect many people. I highly recommend.",
    author: "Kim S",
  },
  {
    id: "1",
    rating: 5,
    time: "a month ago",
    review:
      'I hired Wendy to conduct a surprise murder mystery for my wife\'s 60th birthday party. I told her there would be guests ranging in ages from six months to 80yrs old and I wanted the event to be engaging for all. There was a time span of six months between our initial interaction and the actual party. During that time Wendy communicated with me regularly and was very flexible with the itinerary. On the night of our special event Wendy did not disappoint. She arrived early for set-up and facilitated an evening that flowed extremely well. The mystery she wrote was thoroughly enjoyed by all and I received so many positive comments from our attendees, many of whom had not been to a murder mystery before. Most important to me was the comment from my wife who said we "knocked it out the park". I will definitely use Wendy again!!',
    author: "Ray A",
  },
  {
    id: "2",
    rating: 5,
    time: "2 months ago",
    review:
      "Wendy is the GREATEST. A few months ago I had this idea that I wanted a murder mystery reception at my wedding on 10/21. I didn't know how it would happen but I looked around and found Wendy. She took on the challenge with enthusiasm and she really delivered for us!! My husband (the groom obviously) was the victim and everyone loved taking photos with zombie him. She worked with us on timing for our entrances, cake cutting, and first dance. She was well rehearsed and made everyone feel really welcome. When she asked for volunteers to be suspects, multiple people got up immediately! I absolutely recommend her for any event and I hope to attend another one of her mystery dinners in the future!",
    author: "Linnea N",
  },
];

export default Testimonials;
