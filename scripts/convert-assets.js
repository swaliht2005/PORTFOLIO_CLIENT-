import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');

const filesToConvert = [
  {
    input: path.join(publicDir, 'HM casstady.png'),
    output: path.join(publicDir, 'HM casstady.webp'),
    quality: 80
  },
  {
    input: path.join(publicDir, 'HM Thambinale.png'),
    output: path.join(publicDir, 'HM Thambinale.webp'),
    quality: 85
  }
];

async function run() {
  console.log("Starting asset WebP conversion...");
  for (const file of filesToConvert) {
    if (fs.existsSync(file.input)) {
      console.log(`Analyzing ${path.basename(file.input)}...`);
      const start = Date.now();
      
      let image = sharp(file.input);
      const metadata = await image.metadata();
      console.log(`  Dimensions: ${metadata.width}x${metadata.height}`);
      
      const MAX_WEBP_DIMENSION = 16383;
      if (metadata.width > MAX_WEBP_DIMENSION || metadata.height > MAX_WEBP_DIMENSION) {
        console.log(`  Image exceeds WebP limits. Resizing proportionally...`);
        // Determine aspect ratio scaling
        if (metadata.width > metadata.height) {
          image = image.resize({ width: MAX_WEBP_DIMENSION });
        } else {
          image = image.resize({ height: MAX_WEBP_DIMENSION - 100 }); // keep safe buffer
        }
      } else if (metadata.width > 2000) {
        // High resolution desktop display resize
        console.log(`  Image is very wide. Resizing to 1920px width for optimal web performance...`);
        image = image.resize({ width: 1920 });
      }

      console.log(`  Converting -> ${path.basename(file.output)}...`);
      await image
        .webp({ quality: file.quality })
        .toFile(file.output);
      const end = Date.now();
      
      const inputStats = fs.statSync(file.input);
      const outputStats = fs.statSync(file.output);
      console.log(`Saved in ${((end - start)/1000).toFixed(2)}s:`);
      console.log(`  Original: ${(inputStats.size / (1024 * 1024)).toFixed(2)} MB`);
      console.log(`  Optimized WebP: ${(outputStats.size / (1024 * 1024)).toFixed(2)} MB`);
    } else {
      console.warn(`File not found: ${file.input}`);
    }
  }
  console.log("Conversion complete!");
}

run().catch(err => {
  console.error("Error during conversion:", err);
  process.exit(1);
});
