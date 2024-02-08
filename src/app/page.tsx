import ImageLoader from "@/components/ImageLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import coverImage from "../../public/cover-image.jpg";
import { Button } from "@/components/ui/button";
import SectionHeader from "./_components/SectionHeader";
import { api } from "@/trpc/server";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
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
import { Separator } from "@/components/ui/separator";
import DashboardButton from "./_components/DashboardButton";
import RelativeTime from "@yaireo/relative-time";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col items-center gap-20 pt-12 sm:gap-32">
        <SplashSection />
        <UpdatesSection />
        <ReviewSection />
        <ProductsSection />
        <Footer />
      </main>
    </>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex h-12 w-full items-center justify-center border-b border-border bg-background bg-opacity-95 p-2 px-4 2xl:px-16">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center">
          <ThemeToggle
            size="sm"
            variant="link"
            className="p-0 pr-1 text-foreground sm:hidden"
          />
          <p className="min-w-0 overflow-hidden text-nowrap font-baskervville text-xl sm:pl-4">
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
          <DashboardButton />
          <ThemeToggle size="sm" variant="ghost" className="hidden sm:inline" />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full px-8 pb-8 text-muted-foreground sm:pb-24 sm:pt-24">
      <Separator />
      <div className="flex flex-col items-center gap-4 pt-8 text-sm opacity-50 sm:pt-12 sm:text-base">
        <p className="text-center">{`© ${year} Whodunnit for Hire, LLC | All rights reserved.`}</p>
      </div>
    </footer>
  );
}

function SplashSection() {
  return (
    <div className="container flex flex-col-reverse items-center gap-20 p-0 sm:flex-col sm:gap-12 sm:px-8 sm:pt-24">
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
        <Image
          src={coverImage}
          alt="Cover image"
          className="object-cover sm:rounded-md sm:border"
          width={1080}
          height={608}
          priority={true}
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
            sizes="(min-width: 1280px) 348px, (min-width: 1040px) calc(16.82vw + 136px), (min-width: 640px) calc(50vw - 44px), calc(100vw - 68px)"
          />
        </AspectRatio>
        <CardContent className="flex grow flex-col justify-between gap-4 p-4">
          <div className="grow space-y-2 sm:space-y-4">
            <h3 className="text-lg font-semibold leading-normal sm:text-xl">
              {update.title}
            </h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              {update.caption}
            </p>
            <TextCollapser
              className="text-sm sm:text-base"
              value={update.content}
              maxChars={450}
            />
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
  const relativeTime = new RelativeTime();

  const reviewCards = reviews.map((review) => {
    const timeSincePost = relativeTime.from(review.datePosted)
    return (
      <div key={review.id} className="w-full space-y-2 sm:space-y-4">
        <div className="flex gap-4 items-center">
          <Rating count={review.rating} />
          <p className="text-muted-foreground text-sm sm:text-base">{timeSincePost}</p>
        </div>
        <TextCollapser
          className="text-sm sm:hidden sm:text-base"
          value={review.content}
          maxChars={400}
        />
        <TextCollapser
          className="hidden text-sm sm:inline-block sm:text-base"
          value={review.content}
          maxChars={550}
        />
        <p className="font-baskervville text-lg font-semibold text-primary">{`— ${review.author}`}</p>
      </div>
    );
  });

  return (
    <div className="container flex flex-col items-center gap-6">
      <SectionHeader value="reviews" />
      <div className="flex">
        <Link href="https://search.google.com/local/writereview?placeid=ChIJKV5EgtkkyIkR60fnn3S75mw" target="_blank">
          <Button variant="link">Write a Review</Button>
        </Link>
        <Link href="https://search.google.com/local/reviews?placeid=ChIJKV5EgtkkyIkR60fnn3S75mw" target="_blank">
          <Button variant="link">Read More</Button>
        </Link>
      </div>
      <div className="grid w-full grid-cols-1 gap-8 md:gap-16 lg:grid-cols-3">
        {reviewCards}
      </div>
    </div>
  );
}

async function ProductsSection() {
  const products = await api.product.getAll.query();

  const productCards = products.map((product) => (
    <div key={product.id}>
      <AspectRatio ratio={3 / 2}>
        <ImageLoader
          src={product.image.url}
          alt="Update cover image"
          className="rounded-md border object-cover"
          fill
          sizes="(min-width: 1260px) 252px, (min-width: 1040px) calc(14vw + 78px), (min-width: 780px) calc(33.33vw - 39px), calc(50vw - 42px)"
        />
      </AspectRatio>
      <h3 className="line-clamp-1 pt-2">{product.title}</h3>
      <p className="text-muted-foreground">{product.caption}</p>
    </div>
  ));

  return (
    <div className="container flex flex-col items-center gap-6">
      <SectionHeader value="products" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 md:gap-6">
        {productCards}
      </div>
    </div>
  )
}