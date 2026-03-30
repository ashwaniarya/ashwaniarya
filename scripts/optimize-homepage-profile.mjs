/**
 * Generates `public/images/homepage-profile.{png,webp}` from `public/avatar.png`.
 * Keep `HOMEPAGE_PROFILE_SOURCE_EDGE_PX` in sync with `heroProfileRasterSourceEdgePx` in `app/constants/policy.ts`.
 */
import path from "path";
import { fileURLToPath } from "url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.join(__dirname, "..");
const inputPath = path.join(repositoryRoot, "public/avatar.png");
const outputDirectory = path.join(repositoryRoot, "public/images");

/** Must match `heroProfileRasterSourceEdgePx` in `app/constants/policy.ts`. */
const HOMEPAGE_PROFILE_SOURCE_EDGE_PX = 352;

const rasterPipeline = sharp(inputPath).resize(
  HOMEPAGE_PROFILE_SOURCE_EDGE_PX,
  HOMEPAGE_PROFILE_SOURCE_EDGE_PX,
  { fit: "cover", position: "attention" },
);

await rasterPipeline
  .clone()
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(path.join(outputDirectory, "homepage-profile.png"));

await rasterPipeline
  .clone()
  .webp({ quality: 85, effort: 6 })
  .toFile(path.join(outputDirectory, "homepage-profile.webp"));

console.log("Wrote homepage-profile.png and homepage-profile.webp");
