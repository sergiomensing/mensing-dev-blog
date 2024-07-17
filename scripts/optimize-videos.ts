import { constants, access, readdir } from "node:fs/promises";
import path from "node:path";
import util from "node:util";

async function main() {
  const exec = util.promisify((await import("node:child_process")).exec);

  const filesToOptimize = await readdir("./public/videos/.unoptimized");

  for (const file of filesToOptimize) {
    const filePath = path.parse(file);

    // check if optimized file already exists
    try {
      await access(`./public/videos/${filePath.name}.webm`, constants.F_OK);
      console.log(`✨ Skipping ${filePath.base} as it's already optimized`);
      continue;
    } catch {}

    console.log(`🚀 Start processing ${filePath.base}`);

    // optimize video
    await Promise.all([
      exec(
        `ffmpeg -i public/videos/.unoptimized/${filePath.base} -an public/videos/${filePath.name}.webm`,
      ),
      exec(
        `ffmpeg -i public/videos/.unoptimized/${filePath.base} -an public/videos/${filePath.name}.mp4`,
      ),
      exec(
        `ffmpeg -i public/videos/.unoptimized/${filePath.base} -frames:v 1 public/videos/${filePath.name}.jpg`,
      ),
    ]);

    console.log(`✨ Finished processing ${filePath.base}`);
  }
}

main()
  .then(() => console.log("✅ Videos optimized!"))
  .catch((err) => {
    console.error("🚨 Failed to optimize videos", err);
    process.exit(1);
  });
