import ImageLoader from "@/components/ImageLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import coverImage from "../../public/cover-image.jpg";
import { Button } from "@/components/ui/button";
import SectionHeader from "./_components/SectionHeader";
import { api } from "@/trpc/server";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Rating from "@/components/Rating";
import TextCollapser from "@/components/TextCollapser";
import { Calendar, Phone } from "lucide-react";
import CallNowDialog from "./_components/CallNowDialog";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col items-center gap-20 pb-36 pt-12 sm:gap-32">
        <SplashSection />
        <UpdatesSection />
        <ReviewSection />
      </main>
    </>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex h-12 w-full items-center justify-center border-b border-border bg-background bg-opacity-95 p-2 px-4 2xl:px-16">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center">
          <ThemeToggle size="sm" variant="link" className="sm:hidden text-foreground p-0 pr-1" />
          <p className="min-w-0 font-baskervville text-xl overflow-hidden text-nowrap sm:pl-4">
            Whodunnit for Hire
          </p>
        </div>
        <div className="flex items-center justify-center gap-0 sm:gap-2">
          <CallNowDialog>
            <Button variant="ghost" size="sm" className="space-x-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </Button>
          </CallNowDialog>
          <Link
            href="https://whodunnit-for-hire.eventbrite.com/"
            target="_blank"
          >
            <Button variant="ghost" size="sm" className="space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </Button>
          </Link>
          <ThemeToggle size="sm" variant="ghost" className="hidden sm:inline" />
        </div>
      </div>
    </nav>
  );
}

function SplashSection() {
  return (
    <div className="container flex flex-col-reverse items-center gap-20 sm:gap-12 p-0 sm:flex-col sm:px-8 sm:pt-24">
      <div className="flex flex-col items-center gap-6 px-8">
        <h1 className="text-center font-baskervville text-3xl font-bold leading-none text-primary dark:text-foreground sm:text-6xl">
          Whodunnit for Hire
        </h1>
        <p className="text-center text-sm dark:text-muted-foreground sm:text-base">
          Murder Mystery Entertainment | Headquartered in Maryland
        </p>
        <div>
          <Link href={"tel:+1-410-549-2722"} className="sm:hidden">
            <Button size="lg">Call Now</Button>
          </Link>
          <div className="hidden sm:inline-block">
            <CallNowDialog>
              <Button size="lg">Call Now</Button>
            </CallNowDialog>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <ImageLoader
          src={coverImage}
          alt="Cover image"
          className="object-cover sm:rounded-md sm:border"
          width={1080}
          height={608}
        />
      </div>
    </div>
  );
}

async function UpdatesSection() {
  const updates = await api.update.getAll.query();

  const updateCards = updates.map((update) => (
    <CarouselItem key={update.id} className="sm:basis-1/2 lg:basis-1/3">
      <Card className="flex h-full flex-col">
        <AspectRatio ratio={2 / 1}>
          <ImageLoader
            src={update.image.url}
            alt="Update cover image"
            fill
            className="rounded-t-md object-cover"
          />
        </AspectRatio>
        <CardContent className="flex grow flex-col justify-between gap-4 p-4">
          <div className="grow space-y-2 sm:space-y-4">
            <h3 className="font-baskervville text-lg font-semibold leading-normal sm:text-2xl">
              {update.title}
            </h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              {update.caption}
            </p>
            <p className="text-sm sm:text-base">{update.content}</p>
          </div>
          <div>
            <Link href={update.buttonLink} target="_blank">
              <Button className="container">{update.buttonName}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  ));

  return (
    <div className="container flex flex-col items-center gap-6">
      <SectionHeader value="updates" />
      <Carousel className="w-full">
        <CarouselContent>{updateCards}</CarouselContent>
        <CarouselPrevious className="translate-x-7 rounded-md xl:translate-x-0" />
        <CarouselNext className="-translate-x-7 rounded-md xl:translate-x-0" />
      </Carousel>
    </div>
  );
}

async function ReviewSection() {
  const reviews = await api.review.getAll.query();

  const reviewCards = reviews.map(review => (
    <div key={review.id} className="w-full space-y-2 sm:space-y-4">
      <Rating count={review.rating} />
      <div className="text-sm sm:text-base sm:hidden">
        <TextCollapser value={review.content} maxChars={250} />
      </div>
      <div className="text-sm sm:text-base hidden sm:inline-block md:hidden">
        <TextCollapser value={review.content} maxChars={500} />
      </div>
      <div className="text-sm sm:text-base hidden md:inline-block">
        <TextCollapser value={review.content} maxChars={600} />
      </div>
      <p className="text-lg text-primary font-baskervville font-semibold">{`— ${review.author}`}</p>
    </div>
  ))

  return (
    <div className="container flex flex-col items-center gap-6">
      <SectionHeader value="reviews" />
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-8 md:gap-16">{reviewCards}</div>
    </div>
  );
}