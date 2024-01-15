import { Box, Card, Image, Text, Button, BoxProps } from "@mantine/core";
import SectionTitle from "./section-title";
import { Carousel } from "@mantine/carousel";

function Updates(props: BoxProps) {
  return (
    <Box {...props}>
      <SectionTitle>Updates</SectionTitle>
      <Carousel
        mt={30}
        slideSize="33.3333%"
        align="start"
        slidesToScroll={3}
        slideGap="lg"
      >
        {data.map((card) => (
          <Carousel.Slide key={card.id}>
            <Card radius={0} h="100%">
              <Card.Section>
                <Image src={card.image} alt="Update cover image" />
              </Card.Section>
              <Card.Section>
                <Text c="dimmed">{card.caption}</Text>
                <Text>{card.content}</Text>
                <Button
                  variant="underlined"
                  component="a"
                  href={card.buttonLink}
                  target="_blank"
                >
                  {card.buttonTitle}
                </Button>
              </Card.Section>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}

type CardData = {
  id: string;
  image: string;
  caption: string;
  content: string;
  buttonTitle: string;
  buttonLink: string;
};

const data: CardData[] = [
  {
    id: "0",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMXXFvuJsBcFwZeqvBHrV3z-3Fz8ZwV80RyG5SK=s1280-p-no-v1",
    caption: "Posted on Jan 7, 2024",
    content:
      "https://donaldson.eventbrite.com | Hollywood themed murder mystery party will take place on Friday, February 16 at the Donaldson Brown Mansion in Port Deposit, Maryland.  Limited Seats. Get your tickets early.",
    buttonTitle: "BOOK",
    buttonLink: "",
  },
  {
    id: "1",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipM9CNFcLCgxkvfM0h3hpj0Fe49iM9jKOUTd_29a=s1280-p-no-v1",
    caption: "Jan 26, 2024 - Jan 26, 2024",
    content:
      'https://dd012624.eventbrite.com | Wild West Themed Murder Mystery Party at Dutch\'s Daughter Restaurant in Frederick, Maryland. "Wanted Dead or Alive" on Friday, January 26, 2024. Discounts for group seats.',
    buttonTitle: "BUY",
    buttonLink: "",
  },
  {
    id: "2",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipO2AbIVwuDGv59-bgK7sI4zp8O1bNaga1wFRjAv=s1280-p-no-v1",
    caption: "Jan 20, 2024 - Jan 20, 2024",
    content:
      'https://dtree012024.eventbrite.com | Whodunnit for Hire and the Doubletree by Hilton Columbia have teamed up to bring you "Sinister Speakeasy" the 1920s themed murder mystery party. The evening includes the mystery game, three course meal, tax and gratuity. There are discounts for groups so con...',
    buttonTitle: "ORDER ONLINE",
    buttonLink: "",
  },
  {
    id: "3",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipM_ORloZXtt7sR5ZfplOgRcSQaocCd5wiEEhtpX=w1280-h1280-p-no-v1",
    caption: "Posted on Jan 7, 2024",
    content:
      "https://dtree102024.eventbrite.com | 1920s theme murder mystery party at the Doubletree by Hilton in Columbia, Maryland will take place on Saturday, January 20. Celebrate a January birthday with us and get a table's worth of seats to the event at a discount. 1920s costumes are recommended. The ...",
    buttonTitle: "ORDER ONLINE",
    buttonLink: "",
  },
  {
    id: "4",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipM6zMX7IOH-w0QbT6kjkzVgYTpD9_-xNenTbMiD=w1280-h1280-p-no-v1",
    caption: "Posted on Jan 7, 2024",
    content:
      "https://doozys102724.eventbrite.com | Murder Mystery Party in Catonsville MD | Was it the Colonel in the Kitchen with the Candlestick? Or the Professor in the Parlour with the Leadpipe? Join us in Catonsville Maryland on Saturday, January 27 at Doozy's Diner and find out. This murder mystery ...",
    buttonTitle: "CALL NOW",
    buttonLink: "",
  },
  {
    id: "5",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMGGdng2ynXV1BahgcoqEBgORma0blYmfWs8_zh=w1280-h1280-p-no-v1",
    caption: "Posted on Jan 7, 2024",
    content:
      "https://whodunnitforhire.business.site | Team Building Can Be Murder | Picture this. You've gathered your employees for a team building luncheon. They are laughing, eating and having a great time when suddenly a stranger comes into your party and dies. Oh my. Now the place is a crime scene an...",
    buttonTitle: "CALL NOW",
    buttonLink: "",
  },
  {
    id: "6",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipP4GM6yUlsBkjrCcrIZwa8EfPFLNrJH3kMdeFMw=w1280-h1280-p-no-v1",
    caption: "Posted on Jan 7, 2024",
    content:
      'https://dtree012024.eventbrite.com | Grab a few tables at "Sinister Speakeasy" and turn it into a birthday celebration. The event takes place in Columbia, Maryland on Saturday, January 20 at the Doubletree by Hilton Hotel. The event is set during the prohibition of the 1920s and you are encour...',
    buttonTitle: "CALL NOW",
    buttonLink: "",
  },
  {
    id: "7",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMnC_96b59qPt0PYr096eFMcE236K32UKA1jNYn=w1280-h1280-p-no-v1",
    caption: "Posted on Jan 7, 2024",
    content:
      'https://dtree012024.eventbrite.com | Grab a few tables at "Sinister Speakeasy" and turn it into a birthday celebration. The event takes place in Columbia, Maryland on Saturday, January 20 at the Doubletree by Hilton Hotel. The event is set during the prohibition of the 1920s and you are encour...',
    buttonTitle: "CALL NOW",
    buttonLink: "",
  },
  {
    id: "8",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipObkyx4wp-2XYVYVkzy_9ohUPmfDTtRGylVOqHt=w1280-h1280-p-no-v1",
    caption: "Posted on Jan 7, 2024",
    content:
      "Team Building Can Be Murder - and a blast too if you choose to turn it into a fun crime scene and have your employees solve whodunnit. This is engaging, memorable and so much fun they might die laughing. Bwahahahaha. Call me (Wendy Olenik) and we'll set up a date and location that works for you (...",
    buttonTitle: "CALL NOW",
    buttonLink: "",
  },
];

export default Updates;
