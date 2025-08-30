// sizes in mm
export const paperSizes = {
    A3: [297, 420],
    A4: [210, 297]
};

export const cardSizes = {
    'standard': [63, 88]
}

const CUT_LINE_WIDTH = 0.2

export function sizeInPixels(sizeInMm, ppi) {
  // ppi: pixels per inch
  // 1 inch = 25.4 mm
  return Math.ceil(sizeInMm*ppi / 25.4);
}

export function fitCards(cardSize, paperSize) {
  const regular = {
    paperSize,
    rows: Math.floor((paperSize[1] - CUT_LINE_WIDTH) / (cardSize[1] + CUT_LINE_WIDTH)),
    cols: Math.floor((paperSize[0] - CUT_LINE_WIDTH) / (cardSize[0] + CUT_LINE_WIDTH))
  }

  const flipped = {
    paperSize: [paperSize[1], paperSize[0]],
    rows: Math.floor((paperSize[0] - CUT_LINE_WIDTH) / (cardSize[1] + CUT_LINE_WIDTH)),
    cols: Math.floor((paperSize[1] - CUT_LINE_WIDTH) / (cardSize[0] + CUT_LINE_WIDTH))
  }

  return (flipped.rows * flipped.cols > regular.rows * regular.cols) ? flipped : regular;
}

export function pageDimensions(paper, cardType, ppi) {
  const paperSize = paperSizes[paper];
  if (!paperSize) throw new Error(`Unknown paper: "${paper}"`);

  const cardSize = cardSizes[cardType];
  if (!cardSize) throw new Error(`Unknown card type: "${cardType}"`);

  const fit = fitCards(cardSize, paperSize);
  const margins = [
    (fit.paperSize[0] - (fit.cols * cardSize[0] + (fit.cols + 1) * CUT_LINE_WIDTH)) / 2,
    (fit.paperSize[1] - (fit.rows * cardSize[1] + (fit.rows + 1) * CUT_LINE_WIDTH)) / 2
  ];
  return {
    paper: fit.paperSize.map(x => sizeInPixels(x, ppi)),
    card: cardSize.map(x => sizeInPixels(x, ppi)),
    rows: fit.rows,
    cols: fit.cols,
    cutLineWidth: sizeInPixels(CUT_LINE_WIDTH, ppi),
    margins: margins.map((x) => sizeInPixels(x, ppi))
  };
}