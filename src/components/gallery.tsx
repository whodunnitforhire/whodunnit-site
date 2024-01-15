import { Box, SimpleGrid, Image, BoxProps } from "@mantine/core";
import SectionTitle from "./section-title";

function Gallery(props: BoxProps) {
  return (
    <Box {...props}>
      <SectionTitle>Gallery</SectionTitle>
      <SimpleGrid mt={30} cols={3}>
        {images.map((image) => (
          <Image key={image.id} src={image.image} alt="Gallery image" />
        ))}
      </SimpleGrid>
    </Box>
  );
}

type ImageData = {
  id: string;
  image: string;
};

const images: ImageData[] = [
  {
    id: "0",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNkxsdZVmDN4lQFZg1x5I-_P9QYcms2S97MdEby=w960-h960-n-o-v1",
  },
  {
    id: "1",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNR0gs0g3RxMw7D3jwVS73Qq-fBRMMZHtfwIeS4=w960-h960-n-o-v1",
  },
  {
    id: "2",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNv9CTjFk3vqIMstzuI4ZgKJ6q36s-MTP-PjPCq=w960-h960-n-o-v1",
  },
  {
    id: "3",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMdvejqNmbNwMk04P2pSmAgtWHLaP69_5W0qQOT=w960-h960-n-o-v1",
  },
  {
    id: "4",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipP38EluUAfJKAUD7_WhxQq4m0Ahlvc7OXWxWYcp=w960-h960-n-o-v1",
  },
  {
    id: "5",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNfUfSUhbhqA5wDrDpfMRkKAqcdXEW3j6A96hAL=w960-h960-n-o-v1",
  },
  {
    id: "6",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMHRKXhhTUUMzUrNe1NvYrIvUv3LrlefQCMqc-F=w960-h960-n-o-v1",
  },
  {
    id: "7",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipOO5h31jGSwxyjJLI5PdauA6O4vF4iBj3ofm56a=w960-h960-n-o-v1",
  },
  {
    id: "8",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipOAK-3NDFsQaydhIDih4kSwG-e-5yq4NUw1z1jz=w960-h960-n-o-v1",
  },
];

export default Gallery;
