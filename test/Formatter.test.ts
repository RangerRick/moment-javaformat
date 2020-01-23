/* eslint-disable @typescript-eslint/no-var-requires */

import moment from 'moment-timezone';
window.moment = moment;

import { Formatter, Token, getZoneForDateTime } from '../src/Formatter';
import testData from './test-data';
import SimpleDateFormat from '../src/formats/SimpleDateFormat';
import DateTimeFormatter from '../src/formats/DateTimeFormatter';

/* raw tests for the tokenize() method */
const singleLiteralFormatStrings = {
  'g': [new Token('g')],
  'gg': [new Token('g', 2)],
  "'blah'gg": ['blah', new Token('g', 2)],
  'ggff': [new Token('g', 2), new Token('f', 2)],
  "'\\'blah'gg": ["'blah", new Token('g', 2)],
};

const doubleLiteralFormatStrings = {
  "[blah]gg": ['blah', new Token('g', 2)],
  "[\\]blah]gg": ["]blah", new Token('g', 2)],
};

describe('Formatter.getZoneForDateTime', () => {
  getZoneForDateTime("2020-01-01T18:00-05:00");
});


describe('Formatter.tokenize', () => {
  for (const [key, value] of Object.entries(singleLiteralFormatStrings)) {
    //console.log(`key=${key}, value=${value}`);
    test(key, () => {
      const tokenized = Formatter.tokenize(key, "'");
      expect(tokenized).toBeDefined();
      expect(value.length).toEqual(tokenized.length);
      for (let i=0; i < value.length; i++) {
        expect(value[i]).toEqual(tokenized[i]);
      }
    });
  }
  
  for (const [key, value] of Object.entries(doubleLiteralFormatStrings)) {
    //console.log(`key=${key}, value=${value}`);
    test(key, () => {
      const tokenized = Formatter.tokenize(key, ['[', ']']);
      expect(tokenized).toBeDefined();
      expect(value.length).toEqual(tokenized.length);
      for (let i=0; i < value.length; i++) {
        expect(value[i]).toEqual(tokenized[i]);
      }
    });
  }
  
  test('token type', () => {
    const tokenized = Formatter.tokenize('gggg', "'");
    expect(tokenized[0]).toBeInstanceOf(Token);
  });
  
  test('literal type', () => {
    const tokenized = Formatter.tokenize("'blah'", "'");
    expect(tokenized[0]).not.toBeInstanceOf(Token);
    expect(tokenized[0]).toBe('blah');
  });
});

/* test using auto-generated test data */

// Java format fields that aren't easily implemented/left unimplemented
const unimplemented = {
  SimpleDateFormat: [ 'W', 'F', ],
  DateTimeFormatter: [ 'W', 'F', 'n', 'N', ],
};

// Java and Moment disagree a bit on how days across funky zone boundaries, sometimes causing an off-by-1 error
const knownBroken = {
  'DateTimeFormatter': [ 'u', 'y', 'D', 'e', 'c', ],
};

const testClass = (className: string, impl: Formatter): void => {
  const data = testData[className];
  describe(className, () => {
    const tokens = Object.keys(data);
    for (const token of tokens) {
      describe(`'${token}'`, () => {
        const dates = Object.keys(data[token]);
        for (const dateString of dates) {
          const date = moment(dateString);
  
          describe(dateString, () => {
            if (unimplemented[className] && unimplemented[className].indexOf(token) >= 0) {
              expect(() => {
                impl.format(date, token);
              }).toThrowError('cannot be converted to a moment format token; bailing');
              return;
            }
  
            for (const count of [1, 2, 3, 4]) {
              const formatString = token.repeat(count);
  
              if (knownBroken[className] && knownBroken[className].indexOf(token) >= 0) {
                // skip for now, these are failing for various reasons
                test.skip(formatString, () => {
                  const formatted = impl.format(date, formatString);
                  expect(formatted).toBeDefined();
                  expect(formatted.length).toBeGreaterThan(0);
                });
              } else {
                test(formatString, () => {
                  const expected = data[token][dateString][count-1];
                  if (expected === null) {
                    expect(() => {
                      impl.format(date, formatString);
                    }).toThrowError();
                  } else {
                    const formatted = impl.format(date, formatString);
                    expect(formatted).toBe(expected);
                  }
                });
              }
            }
          });
        }
      });
    }
  });
};

const sdf = new SimpleDateFormat();
const dtf = new DateTimeFormatter();

describe('formatters', () => {
  testClass('SimpleDateFormat', sdf);
//  testClass('DateTimeFormatter', dtf);
});

//const o = dtf.format(moment.tz('2020-01-01T00:00Z', 'UTC'), 'O');
//console.log('o=',o);