"use client";

import { Stack } from "@mantine/core";
import Shell from "./_components/shell";
import Splash from "./_components/splash";
import Updates from "./_components/updates";
import Testimonials from "./_components/testimonials";
import AboutUs from "./_components/about-us";
import Gallery from "./_components/gallery";
import Contact from "./_components/contact";

export default async function Home() {
  return (
    <Shell>
      <Stack gap={100}>
        <Splash mt={40} />
        <Updates />
        <Testimonials />
        <AboutUs />
        <Gallery />
        <Contact />
      </Stack>
    </Shell>
  );
}
