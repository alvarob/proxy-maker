import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { lineToCard } from '../src/list.js';

describe('lineToCard', () => {
  it('returns correct values for valid input', () => {
    assert.deepStrictEqual(lineToCard('3x uta searcher  '), [3, 'uta searcher']);
  });

  it('throws for missing quantity and x', () => {
    assert.throws(() => lineToCard('uta'), {
      message: 'Invalid format: "uta". Format must be: "3x card name"'
    });
  });

  it('throws for missing card name', () => {
    assert.throws(() => lineToCard('3x'), {
      message: 'Invalid format: "3x". Format must be: "3x card name"'
    });
  });

  it('throws for non-numeric quantity', () => {
    assert.throws(() => lineToCard('xx uta'), {
      message: 'Invalid format: "xx uta". Format must be: "3x card name"'
    });
  });

  it('throws for negative quantity', () => {
    assert.throws(() => lineToCard('-1 uta'), {
      message: 'Invalid format: "-1 uta". Format must be: "3x card name"'
    });
  });

  it('throws for zero quantity', () => {
    assert.throws(() => lineToCard('0 uta'), {
      message: 'Invalid format: "0 uta". Format must be: "3x card name"'
    });
  });
});
