import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildFavicon() {
  const inputPath = path.resolve(__dirname, 'src/images/icon.png');
  const outputPath = path.resolve(__dirname, 'public/favicon.ico');

  try {
    await sharp(inputPath)
      .resize(64, 64)
      .toFile(outputPath);
    console.log('Favicon generated successfully');
  } catch (error) {
    console.error('Error generating favicon:', error);
    process.exit(1);
  }
}

buildFavicon();
