import SimpleDateFormat from '../../src/formats/SimpleDateFormat';
import { Token } from '../../src/Formatter';

const patterns = {
  'yy': [ new Token('y', 2) ],
  "yy'foo'": [ new Token('y', 2), 'foo' ],
  'yyyy-MM-dd': [ new Token('y', 4), '-', new Token('M', 2), '-', new Token('d', 2) ],
  'yyyy.MM.dd HH:mm:ss': [ new Token('y', 4), '.', new Token('M', 2), '.', new Token('d', 2), ' ', new Token('H', 2), ':', new Token('m', 2), ':', new Token('s', 2) ],
};

const dtf = new SimpleDateFormat();

describe('SimpleDateFormat.parsePattern', () => {
  for (const [pattern, expected] of Object.entries(patterns)) {
    test(pattern, () => {
      if (Array.isArray(expected)) {
        const result = dtf.tokenize(pattern);
        expect(result).toBeDefined();
        expect(expected.length).toEqual(result.length);
        for (let i=0; i < expected.length; i++) {
          expect(result[i]).toEqual(expected[i]);
          expect(typeof result[i]).toEqual(typeof expected[i]);
        }
      } else {
        expect(() => {
          dtf.tokenize(pattern);
        }).toThrow(expected);
      }
    });
  }
});