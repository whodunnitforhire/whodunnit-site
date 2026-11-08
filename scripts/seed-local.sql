-- Sample rows for local development (`npm run db:seed:local`). Replaces everything in local D1.
-- DateTimes are ISO text with an explicit offset, the format Prisma's D1 adapter writes and reads.

DELETE FROM "Update";
DELETE FROM "Product";
DELETE FROM "Review";
DELETE FROM "About";
DELETE FROM "Image";

INSERT INTO "Image" ("id", "createdAt", "url", "size") VALUES
  ('seed-cover', strftime('%Y-%m-%dT%H:%M:%f+00:00', 'now'), '/cover-image.jpg', 1234);

INSERT INTO "About" ("id", "updatedAt", "content") VALUES
  ('seed-about', strftime('%Y-%m-%dT%H:%M:%f+00:00', 'now'),
   '<p>Whodunnit for Hire runs <strong>interactive murder mystery parties</strong>.</p>');

INSERT INTO "Update" ("id", "createdAt", "updatedAt", "imageId", "title", "caption", "content", "buttonName", "buttonLink") VALUES
  ('seed-update', strftime('%Y-%m-%dT%H:%M:%f+00:00', 'now'), strftime('%Y-%m-%dT%H:%M:%f+00:00', 'now'),
   'seed-cover', 'Sample update', 'A caption', '<p>Seeded update body.</p>', 'Learn more', 'https://example.com');

INSERT INTO "Product" ("id", "createdAt", "updatedAt", "imageId", "title", "caption") VALUES
  ('seed-product', strftime('%Y-%m-%dT%H:%M:%f+00:00', 'now'), strftime('%Y-%m-%dT%H:%M:%f+00:00', 'now'),
   'seed-cover', 'Sample show', 'Two hours of mayhem');

INSERT INTO "Review" ("id", "updatedAt", "rating", "datePosted", "content", "author") VALUES
  ('seed-review-1', strftime('%Y-%m-%dT%H:%M:%f+00:00', 'now'), 5, strftime('%Y-%m-%dT%H:%M:%f+00:00', 'now'), 'Best party we''ve had.', 'Pat'),
  ('seed-review-2', strftime('%Y-%m-%dT%H:%M:%f+00:00', 'now'), 4, '2025-06-01T12:00:00.000+00:00', 'Great fun.', 'Sam');
