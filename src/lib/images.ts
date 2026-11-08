/** Public origin of the R2 bucket `whodunnit-images` (custom domain on the bucket). */
export const IMAGES_ORIGIN = "https://images.whodunnitforhire.com";

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

/** Upload types and the extension each one is stored under. SVG is left out on purpose. */
export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export const imageUrl = (key: string) => `${IMAGES_ORIGIN}/${key}`;
