/**
 * Generates `public/images/work/<slug>.{png,webp}` from full-size screenshots in a source folder.
 * Usage: node scripts/optimize-work-screenshots.mjs <source-folder>
 * Keep `WORK_SCREENSHOT_WIDTH_PX` in sync with `selectedWorkTileImageWidthPx` in `app/constants/policy.ts`.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.join(__dirname, "..");
const sourceDirectory = process.argv[2];
const outputDirectory = path.join(repositoryRoot, "public/images/work");

const WORK_SCREENSHOT_WIDTH_PX = 1200;

if (!sourceDirectory) {
  console.error("Pass the folder holding <slug>.png screenshots.");
  process.exit(1);
}

fs.mkdirSync(outputDirectory, { recursive: true });

for (const fileName of fs.readdirSync(sourceDirectory)) {
  if (!fileName.endsWith(".png")) continue;
  const slug = path.basename(fileName, ".png");
  const pipeline = sharp(path.join(sourceDirectory, fileName)).resize({ width: WORK_SCREENSHOT_WIDTH_PX, withoutEnlargement: true });
  await pipeline.clone().png({ compressionLevel: 9, effort: 10 }).toFile(path.join(outputDirectory, `${slug}.png`));
  await pipeline.clone().webp({ quality: 82, effort: 6 }).toFile(path.join(outputDirectory, `${slug}.webp`));
  const { width, height } = await sharp(path.join(outputDirectory, `${slug}.png`)).metadata();
  console.log(`${slug}: ${width}x${height}`);
}
