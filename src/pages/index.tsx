import Head from "next/head";
import Shell from "@/components/shell";
import Splash from "@/components/splash";
import { Stack } from "@mantine/core";
import Updates from "@/components/updates";
import Testimonials from "@/components/testimonials";
import AboutUs from "@/components/about-us";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
      </main>
    </>
  );
}
