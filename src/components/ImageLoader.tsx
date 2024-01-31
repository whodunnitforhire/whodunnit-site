"use client";

/* eslint-disable jsx-a11y/alt-text */
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export default function ImageLoader(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      {...props}
      className={`${isLoading ? "animate-pulse bg-gray-300 rounded-md border dark:bg-gray-800" : props.className}`}
      onLoad={() => setIsLoading(false)}
    />
  );
}
