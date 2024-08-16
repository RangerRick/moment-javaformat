// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const moment: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Moment = any;
//import { Moment } from 'moment-timezone';
import { abbreviations, offsets } from "./abbreviations";

const offsetMappings = {};

export const findAbbreviationForOffset = (offset: number): string | null => {
  if (!moment.tz) {
    return null;
  }

  const tz = moment.tz.guess();
  const short = tz ? moment.tz(tz).format("z") : null;
  //  console.log('guessed=', short);

  const matches = offsets[String(offset)];

  if (matches) {
    // check if the current browser zone matches our offset mapping
    // and if so, shortcut to that abbreviation
    if (matches.indexOf(short) >= 0) {
      return short;
    } else {
      // otherwise, return the first/primary abbreviation in the offset mapping
      return matches[0];
    }
  }

  return null;
};

export const getDescriptionForAbbreviation = (abbr: string): string | null => {
  if (abbreviations[abbr]) {
    return abbreviations[abbr];
  }

  return null;
};

export const getZoneForDateTime = (
  dateTime: string | Moment,
): string | null => {
  const dt = moment(dateTime);
  const offset = dt.utcOffset();
  if (!offsetMappings[offset]) {
    const shortcut = findAbbreviationForOffset(offset);
    if (shortcut) {
      offsetMappings[offset] = shortcut;
    } else {
      console.warn("- unhandled offset: " + offset);
    }
  }
  return offsetMappings[offset] || null;
};

export const toAbsString = (value: string | number): string => {
  if (Number.isInteger(value as number)) {
    return String(Math.abs(value as number));
  }
  return (value as string).replace(/^-/, "");
};

export const zeroPad = (input: string | number, length: number): string => {
  const abs = toAbsString(input);
  // never truncate, just return if it's bigger
  if (abs.length >= length) {
    return String(input);
  }
  return (
    (abs !== input ? "-" : "") + ("0".repeat(length) + abs).substr(0 - length)
  );
};

export class Token {
  public token: string;
  public count = 0;

  constructor(value: string, count?: number) {
    if (value.length != 1) {
      throw new Error(
        "You must provide a single character when creating a token!",
      );
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
   * Tokenize a format string.
   *
   * @param {string} formatString the string to format
   */
  abstract tokenize(formatString: string): Array<Token | string>;

  /**
   * Convert a moment into a formatted date string.
   *
   * @param {Moment} moment - the moment to convert
   * @param {string} formatString - the format string
   */
  abstract format(moment: Moment, formatString: string): string;
}
