import { getCloudflareContext } from "@opennextjs/cloudflare";

import { IMAGE_TYPES, MAX_IMAGE_BYTES, imageUrl } from "@/lib/images";
import { isAdmin } from "@/server/auth";
import { getDb } from "@/server/db";

/**
 * Uploads one image (multipart field `file`) to R2 and records it as an `Image` row.
 * The R2 object key doubles as the row id, so `image.delete` / `image.prune` can remove both.
 */
export async function POST(request: Request) {
  if (!(await isAdmin(request.headers))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return Response.json(
      { error: "Expected a multipart form." },
      { status: 400 },
    );
  }
  if (!(file instanceof File)) {
    return Response.json({ error: "No file was sent." }, { status: 400 });
  }
  const ext = IMAGE_TYPES[file.type];
  if (!ext) {
    return Response.json(
      { error: "Only JPEG, PNG, WebP, GIF and AVIF images can be uploaded." },
      { status: 415 },
    );
  }
  if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
    return Response.json(
      { error: "Images must be 4 MB or smaller." },
      { status: 413 },
    );
  }

  const key = `${crypto.randomUUID()}.${ext}`;
  const bucket = getCloudflareContext().env.IMAGES_BUCKET;
  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: {
      contentType: file.type,
      // Keys are never reused, so the object can be cached forever.
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  try {
    const image = await getDb().image.create({
      data: { id: key, url: imageUrl(key), size: file.size },
    });
    return Response.json(image, { status: 201 });
  } catch (e) {
    // Don't leave an object behind that no row points to.
    await bucket.delete(key);
    throw e;
  }
}
