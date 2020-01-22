/* eslint-disable @typescript-eslint/ban-types */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Moment = any;

export const toAbsString = (value: string | number): string => {
  if (Number.isInteger(value as number)) {
    return String(Math.abs(value as number));
  }
  return (value as string).replace(/^-/, '');
};

export const zeroPad = (input: string | number, length: number): string => {
  const abs = toAbsString(input);
  // never truncate, just return if it's bigger
  if (abs.length >= length) {
    return String(input);
  }
  return (abs !== input ? '-' : '') + ('0'.repeat(length) + abs).substr(0 - length);
};

export class Token {
  public token: string;
  public count = 0;

  constructor(value: string, count?: number) {
    if (value.length != 1) {
      throw new Error('You must provide a single character when creating a token!');
    }
    this.token = value;
    this.count = count === undefined ? 1 : count;
  }

  increment(): number {
    this.count++;
    return this.count;
  }

  equals(token: Token): boolean {
    return this.token === token.token && this.count === token.count;
  }

  toString(): string {
    return this.token.repeat(this.count);
  }
}

export abstract class Formatter {
  /**
   * Tokenize a format string, given a character or tuple to represent literal values.
   *
   * @param {string} formatString the string to format
   * @param {string[] | string} literalBoundary the boundary values for string literals
   */
  static tokenize(formatString: string, literalBoundary: string[] | string): Array<Token|string> {
    const ret = [];
    const len = formatString.length;

    let literals = [] as string[];
    if (literalBoundary) {
      literals = Array.isArray(literalBoundary)? literalBoundary : literalBoundary.split('');
    }

    let i = 0,
      current = '',
      lastChar = null,
      inEscape = false,
      inLiteral = false;

    for (i=0; i < len; i++) {
      current = formatString.charAt(i);
      if (inLiteral) {
        // we're in the middle of a literal/quoted section
        if (inEscape) {
          // and the current character should be escaped
          ret[ret.length - 1] += current;
          inEscape = false;
        } else {
          if (current === '\\') {
            // the next character should be escaped
            inEscape = true;
          } else if (current === literals[literals.length - 1]) {
            // we are at the end of a literal boundary
            inLiteral = false;
          } else {
            // we're still in the literal, append to the last entry
            ret[ret.length - 1] += current;
          }
        }
      } else {
        if (current === literals[0]) {
          inLiteral = true;
          ret.push('');
        } else if (current === lastChar) {
          // we're in the same sequence, append
          ret[ret.length - 1].increment();
        } else {
          // new token
          ret.push(new Token(current));
        }
      }
      lastChar = current;
    }

    return ret;
  }

  /**
   * Convert a moment into a formatted date string.
   * 
   * @param {Moment} moment - the moment to convert
   * @param {string} formatString - the format string
   */
  abstract format(moment: Moment, formatString: string, strict?: boolean): string;
}