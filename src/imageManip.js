import fs from 'fs';

import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';

import list from './list.js'


export async function prepareCards(dimensions, listPath, imagePath, tempDirName) {
  const cardNames = await list.read(listPath);
  const cardFiles = await Promise.all(cardNames.map(
    async ([quantity, cardName]) => [quantity, await list.firstFile(cardName, imagePath)])
  );

  await Promise.all(
    cardFiles.map(async ([_, fileName]) => {
      const source = `${imagePath}/${fileName}`;
      const destination = `${tempDirName}/${fileName}`;
      return sharp(source)
              .resize(dimensions.card)
              .toFile(destination);
    })
  )

  return cardFiles.map(
    ([quantity, fileName]) => Array(quantity).fill(`${tempDirName}/${fileName}`)
  ).flat(Infinity);
}

const CUT_LINE_COLOR = "rgba(18, 255, 121, 1)";

function drawCutLines(context, dimensions) {
    context.fillStyle = CUT_LINE_COLOR;

    // horizontal margins:
    for (let i = 0; i <= dimensions.cols; ++i) {
        const x = dimensions.margins[0] + (i*dimensions.cutLineWidth) + (i*dimensions.card[0]);
        context.fillRect(x, 0, dimensions.cutLineWidth, dimensions.paper[1]);
    }

    // vertical margins:
    for (let i = 0; i <= dimensions.rows; ++i) {
        const y = dimensions.margins[1] + (i*dimensions.cutLineWidth) + (i*dimensions.card[1]);
        context.fillRect(0, y, dimensions.paper[0], dimensions.cutLineWidth);
    }
}

async function drawCards(context, cards, dimensions) {
    for (const [index, card] of cards.entries()) {
        const cardImage = await loadImage(card);
        const x = dimensions.margins[0] + dimensions.cutLineWidth + (index % dimensions.cols) * (dimensions.card[0] + dimensions.cutLineWidth);
        const y = dimensions.margins[1] + dimensions.cutLineWidth + Math.floor(index / dimensions.cols) * (dimensions.card[1] + dimensions.cutLineWidth);
        context.drawImage(cardImage, x, y, dimensions.card[0], dimensions.card[1]);
    }
}

export async function generatePdf(cards, dimensions, outputPath) {
    const canvas = createCanvas(dimensions.paper[0], dimensions.paper[1], 'pdf');
    const context = canvas.getContext("2d");

    const cardsPerPage = dimensions.rows * dimensions.cols;
    const queue = [...cards];

    while (true) {
        const chunk = [];
        while (queue.length && chunk.length < cardsPerPage)
            chunk.push(queue.shift());
        
        drawCutLines(context, dimensions);
        await drawCards(context, chunk, dimensions);

        if (queue.length) 
            context.addPage();
        else break;
    }

    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPDFStream();
    stream.pipe(out);
}

export default { generatePdf };