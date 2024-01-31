import ImageLoader from "@/components/ImageLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import coverImage from "../../public/cover-image.jpg";
import { Button } from "@/components/ui/button";
import SectionHeader from "./_components/SectionHeader";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center gap-16">
        <SplashSection />
        <UpdatesSection />
      </main>
    </>
  );
}

function Navbar() {
  return (
    <nav className="flex w-full items-center justify-center border-b border-border p-2 px-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <p className="min-w-0 font-baskervville text-lg">
            Whodunnit for Hire
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <ThemeToggle size="sm" />
        </div>
      </div>
    </nav>
  );
}

function SplashSection() {
  return (
    <div className="container flex flex-col items-center gap-4 p-0 max-w-5xl mx-auto sm:pt-8 sm:px-8">
      <div className="relative w-full">
        <ImageLoader
          src={coverImage}
          alt="Cover image"
          className="object-cover"
          width={1080}
          height={608}
        />
      </div>
      <h1 className="text-center font-baskervville text-3xl sm:text-6xl font-bold leading-none text-primary">
        Whodunnit for Hire
      </h1>
      <p className="text-center text-sm sm:text-base">
        Murder Mystery Entertainment | Headquartered in Maryland
      </p>
      <Button>Call Now</Button>
    </div>
  );
}

function UpdatesSection() {
  return (
    <div className="container flex flex-col items-center gap-4">
      <SectionHeader value="updates" />
    </div>
  );
}
