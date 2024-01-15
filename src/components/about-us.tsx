import { Box, Stack, Text, Title, Accordion, BoxProps } from "@mantine/core";
import SectionTitle from "./section-title";

function AboutUs(props: BoxProps) {
  return (
    <Box
      bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"
      p={75}
      {...props}
    >
      <SectionTitle mb={50}>Murder Mystery Entertainment Company</SectionTitle>
      <Stack mb={50}>
        <Text>
          Now Playing | Listing of dates and locations from which to choose for
          the events open to the public:
        </Text>
        <Text>https://whodunnit-for-hire.eventbrite.com</Text>
        <Text>Corporate Events * Private Parties</Text>
        <Text>
          Whodunnit for Hire turns ordinary events into fun, engaging and
          interactive murder mystery parties. Have a blast! But watch out. This
          is so much fun you might die laughing.
        </Text>
        <Text>
          My name is Wendy Olenik and I own Whodunnit for Hire which I operate
          from Baltimore, Maryland. I turn events into murder mystery parties
          and have been doing so for more than twenty years. This is fun,
          engaging and memorable. I am excited to set up murder mystery
          entertainment for you. Call or text me at 410-549-2722. Or reach me
          via email.{" "}
        </Text>
        <Text>murdermysterycompany@gmail.com</Text>
        <Text>
          Search for clues, interrogate suspects and solve whodunnit at a murder
          mystery party with Whodunnit for Hire.
        </Text>
        <Text>&quot;This is so umuch fun you might die laughing!&quot;</Text>
      </Stack>
      <Title order={4} fw="bold" ta="center" mb={30}>
        FREQUENTLY ASKED QUESTIONS
      </Title>
      <Accordion>
        {faq.map((qa) => (
          <Accordion.Item key={qa.question} value={qa.question}>
            <Accordion.Control>{qa.question}</Accordion.Control>
            <Accordion.Panel>{qa.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
}

type QuestionAnswerData = {
  question: string;
  answer: string;
};

const faq: QuestionAnswerData[] = [
  {
    question: "What is a murder mystery party?",
    answer:
      "Someone at your party dies and then your guests search for clues and interrogate suspects to solve whodunnit. My storylines are always a comedy. My parties are interactive and written for fun team building. They promote communication and collaboration.",
  },
  {
    question: "Do you have any open to the public events I can attend?",
    answer:
      "Yes. My murder mystery parties are listed at https://whodunnit-for-hire.eventbrite.com.",
  },
  {
    question: "How can I stay informed when you add another event?",
    answer: 'Click "follow" at https://whodunnit-for-hire.eventbrite.com.',
  },
  {
    question: "Could I purchase seats for a friend?",
    answer:
      "Yes. Or if you aren't sure which date or location they would prefer you could purchase a Gift Card and let them decide. https://giftcard.eventbrite.com.",
  },
  {
    question: "Could I book all the seats and turn it into a private party?",
    answer:
      "Yes. If the seats are available I'm happy to turn it into a private murder mystery for you. Or call me and together we'll choose a date.",
  },
  {
    question:
      "I'd like to arrange a private Whodunnit for Hire  murder mystery party elsewhere. Where should I host it?",
    answer:
      "Choose a location within 50 miles of Baltimore, Maryland, USA. Your guests must fit into one room. The location must have free on-site parking and be handicap accessible. Consider your favorite restaurant. It will likely work.",
  },
  {
    question:
      "What is the cost for you to turn my event into a murder mystery?",
    answer:
      "The production format (a play with seven actors) is $3500. The game format (your guests are sleuths and suspects) is $1250.  The virtual format is $499.",
  },
  {
    question: "How many guests should be at my private party?",
    answer:
      "A minimum of 20 guests should be at your murder mystery party. There is no maximum.",
  },
  {
    question:
      "I plan to host a private Team Building Whodunnit for my company party. Could I keep this a surprise from my staff? Could I tell you the guests I'd like accused? Could I get a customized storyline?",
    answer: "Yes. Yes. And yes.",
  },
  {
    question: "How long does it take?",
    answer:
      "Plan two hours for your event, two and a half with a 30 minute welcome reception. Use this timeline as your guide. 6:30pm   Doors Open/Welcome Reception/Drinks Available/Mix and Mingle 7:00pm   Salads Served/Guests Seated/Mystery Begins 7:30pm   Entrees Served followed by Interrogations 8:30pm   Desserts Served followed by Wrap-Up, Curtain Call and Awards 9:00pm   End (it will take me 15-20 minutes to break-down, pack-up and vacate) ",
  },
  {
    question: "Should I provide a meal to my guests during the murder mystery?",
    answer:
      "Yes. My mysteries are written assuming this is a breakfast, lunch or dinner party.",
  },
  {
    question: "Could you provide the meal?",
    answer:
      "Yes, if you choose to host it at Dutch's Daughter in Frederick, Doozy's Diner in Catonsville, Doubletree by Hilton in Columbia, Towson Tavern in Towson or the Donaldson Brown Mansion in Port Deposit. Otherwise, no.",
  },
  {
    question: "Should I provide additional entertainment such as a band or DJ?",
    answer: "No.",
  },
  {
    question: "Can the guests be in more than one room?",
    answer: "No.",
  },
  {
    question: "Why should I book with Whodunnit for Hire?",
    answer:
      "I've been doing this for more than twenty years with great success. I know what I am doing and I do it very well. Your employees are going to have a blast! They will be laughing and engaged. They will communicate and collaborate to solve whodunnit. They will become fast friends. I've seen it again and again. I know it works. At the end they will be singing your praises!",
  },
  {
    question:
      "What information should I send you to book a murder mystery party?",
    answer:
      "Send the location and date and whether you are booking the Production Format ($3500 for seven actors), the Game Format ($1250 for your guests to be the suspects) or the Virtual Format ($499 for 98 logins).",
  },
  {
    question: "How do I get in touch with you?",
    answer:
      "My name is Wendy Olenik and I live in Sparrows Point (Baltimore), Maryland. I own Whodunnit for Hire. You may text, call or email me (text is preferred please include your name). I am excited to turn your event into a murder mystery party. But watch out. This is so much fun you might die laughing. Bwhahahahaha.",
  },
];

export default AboutUs;
