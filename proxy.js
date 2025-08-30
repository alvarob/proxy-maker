import fs from 'fs';

import commandLineArgs from 'command-line-args'

import { pageDimensions } from './src/sizes.js';
import { prepareCards, generatePdf } from './src/imageManip.js';


const optionDefinitions = [
  { name: 'paper', type: String, defaultValue: "A4" },
  { name: 'cardType', type: String, defaultValue: "standard" },
  { name: 'ppi', type: Number, defaultValue: 300 },
  { name: 'list', type: String},
  { name: 'images', type: String},
  { name: 'output', type: String, defaultValue: "./output.pdf"}
]

function readArgs() {
  const { paper, cardType, ppi, list, images, output } = commandLineArgs(optionDefinitions);

  if (!list) {
    console.error("Missing required parameter: list");
    return;
  }
  if (!images) {
    console.error("Missing required parameter: images");
    return;
  }

  const dimensions = pageDimensions(paper, cardType, ppi);
  return { dimensions, list, images, output }
}

async function main() {
  const { dimensions, list, images, output } = readArgs();

  const tempDirName = "./.tmp$" + Date.now();
  fs.mkdirSync(tempDirName);

  console.log("Generating proxies...");

  try {
    const cards = await prepareCards(dimensions, list, images, tempDirName);
    await generatePdf(cards, dimensions, output);
    console.log(`Proxies generated successfully: ${output}`);
  } catch (error) {
    console.error(error);
  } finally {
    fs.rmSync(tempDirName, { recursive: true });
  }
}

await main();