import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { cardSizes, paperSizes, sizeInPixels, fitCards, pageDimensions } from '../src/sizes.js';

describe('sizeInPixels', () => {
  it('returns correct size for A3 at 300ppi', () => {
    const result = paperSizes.A3.map(x => Math.round(sizeInPixels(x, 300)));
    assert.deepStrictEqual(result, [3508, 4961]);
  });
});

describe('fitCards', () => {
  it('fits standard cards correctly on A3', () => {
    const { rows, cols } = fitCards(cardSizes.standard, paperSizes.A3);
    assert.strictEqual(rows, 3);
    assert.strictEqual(cols, 6);
  });

  it('fits standard cards correctly on A4', () => {
    const { rows, cols } = fitCards(cardSizes.standard, paperSizes.A4);
    assert.strictEqual(rows, 3);
    assert.strictEqual(cols, 3);
  });
});

describe('pageDimensions', () => {
  it('calculates dimensions correctly for A3 and standard cards', () => {
    const result = pageDimensions('A3', 'standard', 300);
    assert.deepStrictEqual(result.paper, [4961, 3508]);
    assert.strictEqual(result.rows, 3);
    assert.strictEqual(result.cols, 6);
  });

  it('throws an error for invalid paper size', () => {
    assert.throws(() => {
      pageDimensions('XX', 'standard', 300);
    }, {
      message: 'Unknown paper: "XX"'
    });
  });

  it('throws an error for invalid card type', () => {
    assert.throws(() => {
      pageDimensions('A3', 'invalid', 300);
    }, {
      message: 'Unknown card type: "invalid"'
    });
  });
});
