/* eslint-disable @typescript-eslint/explicit-function-return-type */

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
declare const moment: any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Moment = any;
//import { Moment } from 'moment-timezone';

import {
  Formatter,
  Token,
  toAbsString,
  zeroPad,
  getDescriptionForAbbreviation,
} from "../Formatter";

const endZeroes = /:?00$/;
const matchReserved = /[A-Za-z]/;

const adConverter = (moment: Moment) => {
  return moment.year() > 0 ? "AD" : "BC";
};

const findAbbreviation = (moment: Moment) => {
  const defaultAbbr = moment.zoneAbbr();
  if (defaultAbbr === "UTC" && moment.utcOffset() != 0) {
    return null;
  }
  return defaultAbbr;
};

const javaToMoment = {
  // era
  G: adConverter,
  GG: adConverter,
  GGG: adConverter,
  GGGG: (moment: Moment) => {
    return moment.year() > 0 ? "Anno Domini" : "Before Christ";
  },
  GGGGG: (moment: Moment) => {
    return adConverter(moment).substring(0, 1);
  },

  // year
  u: (moment: Moment) => {
    return zeroPad(moment.format("YYYY"), 1);
  },
  uu: (moment: Moment) => {
    return zeroPad(toAbsString(moment.format("YY")), 2);
  },
  uuu: (moment: Moment) => {
    return zeroPad(moment.format("YYYY"), 3);
  },
  uuuu: "YYYY",
  uuuuu: (moment: Moment) => {
    return zeroPad(moment.format("YYYY"), 5);
  },
  uuuuuu: (moment: Moment) => {
    return zeroPad(moment.format("YYYY"), 6);
  },

  // year-of-era
  y: (moment: Moment) => {
    return toAbsString(moment.format("Y"));
  },
  yy: (moment: Moment) => {
    return toAbsString(moment.format("YY"));
  },
  yyy: (moment: Moment) => {
    return zeroPad(toAbsString(moment.format("YYYY")), 3);
  },
  yyyy: (moment: Moment) => {
    return toAbsString(moment.format("YYYY"));
  },
  yyyyy: (moment: Moment) => {
    return zeroPad(toAbsString(moment.format("YYYY")), 5);
  },
  yyyyyy: (moment: Moment) => {
    return zeroPad(toAbsString(moment.format("YYYY")), 6);
  },

  // day-of-year
  D: "DDD",
  DD: (moment: Moment) => {
    const ret = moment.format("DDD");
    if (ret.length > 2) {
      throw new Error(
        "Field DayOfYear cannot be printed as the value " +
          ret +
          " exceeds the maximum print width of 2"
      );
    }
    return zeroPad(ret, 2);
  },
  DDD: "DDDD",
  // DDDD throws an error in Java DateTimeFormatter

  // month-of-year
  M: "M",
  MM: "MM",
  MMM: "MMM",
  MMMM: "MMMM",
  MMMMM: (moment: Moment) => {
    return moment.format("MMMM").substring(0, 1);
  },

  // month-of-year (numeric)
  L: "M",
  LL: "MM",
  LLL: "M",
  LLLL: "M",
  LLLLL: "M",

  // day-of-month
  d: "D",
  dd: "DD",

  // quarter-of-year
  Q: "Q",
  QQ: (moment: Moment) => {
    return zeroPad(moment.format("Q"), 2);
  },
  QQQ: (moment: Moment) => {
    return "Q" + moment.format("Q");
  },
  QQQQ: (moment: Moment) => {
    return moment.format("Qo") + " quarter";
  },
  QQQQQ: "Q",

  // quarter-of-year
  q: "Q",
  qq: (moment: Moment) => {
    return zeroPad(moment.format("Q"), 2);
  },
  qqq: "Q",
  qqqq: "Q",
  qqqqq: "Q",

  // week-based-year
  Y: (moment: Moment) => {
    return zeroPad(moment.format("gggg"), 1);
  },
  YY: "gg",
  YYY: (moment: Moment) => {
    return zeroPad(moment.format("gggg"), 3);
  },
  YYYY: "gggg",
  YYYYY: (moment: Moment) => {
    return zeroPad(moment.format("gggg"), 5);
  },
  YYYYYY: (moment: Moment) => {
    return zeroPad(moment.format("gggg"), 6);
  },

  // week-of-week-based-year
  w: "w",
  ww: "ww",

  // week-of-month (W) not supported
  W: null,
  WW: null,
  WWW: null,
  WWWW: null,

  // day-of-week
  E: "ddd",
  EE: "ddd",
  EEE: "ddd",
  EEEE: "dddd",
  EEEEE: (moment: Moment) => {
    return moment.format("dddd").substring(0, 1);
  },

  // localized day-of-week (e)
  e: "d",
  ee: (moment: Moment) => {
    return zeroPad(moment.format("d"), 2);
  },
  eee: "ddd",
  eeee: "dddd",
  eeeee: (moment: Moment) => {
    return moment.format("dddd").substring(0, 1);
  },

  // localized day-of-week (c)
  c: "d",
  ccc: "ddd",
  cccc: "dddd",
  ccccc: (moment: Moment) => {
    // 5 c's = 0-indexed I guess?!?
    return String(parseInt(moment.format("d"), 10) - 1);
  },

  // week of month (F) not supported

  // am-pm-of-day
  a: "A",

  // clock-hour-of-am-pm
  h: "h",
  hh: "hh",

  // hour-of-am-pm
  K: (moment: Moment) => {
    return toAbsString(moment.hour() % 12);
  },
  KK: (moment: Moment) => {
    const hour = toAbsString(moment.hour() % 12);
    return zeroPad(hour, 2);
  },

  // clock-hour-of-am-pm
  k: "k",
  kk: "kk",

  // hour-of-day
  H: "H",
  HH: "HH",

  // minute-of-hour
  m: "m",
  mm: "mm",

  // second-of-minute
  s: "s",
  ss: "ss",

  // fraction-of-second
  S: "S",
  SS: "SS",
  SSS: "SSS",
  SSSS: "SSSS",
  SSSSS: (moment: Moment) => {
    return zeroPad(moment.format("SSSS"), 5);
  },
  SSSSSS: (moment: Moment) => {
    return zeroPad(moment.format("SSSS"), 6);
  },

  // milli-of-day
  A: (moment: Moment) => {
    return zeroPad(
      moment.valueOf() - moment.clone().startOf("day").valueOf(),
      1
    );
  },
  AA: (moment: Moment) => {
    if (moment.isSame(moment.clone().startOf("day"))) {
      // console.warn(moment.format() + ' is the same as ' + moment.clone().startOf('day').format());
      return "00";
    }
    return null;
  },
  AAA: (moment: Moment) => {
    if (moment.isSame(moment.clone().startOf("day"))) {
      return "000";
    }
    return null;
  },
  AAAA: (moment: Moment) => {
    if (moment.isSame(moment.clone().startOf("day"))) {
      return "0000";
    }
    return null;
  },
  AAAAA: (moment: Moment) => {
    if (moment.isSame(moment.clone().startOf("day"))) {
      return "00000";
    }
    return null;
  },
  AAAAAA: (moment: Moment) => {
    if (moment.isSame(moment.clone().startOf("day"))) {
      return "000000";
    }
    return null;
  },

  // nano-of-second (n) not supported

  // nano-of-day (N) not supported

  // time-zone ID
  VV: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    const tz = moment.tz();
    if (tz && tz.length > 0) {
      return tz;
    }
    return moment.format("Z");
  },

  // time-zone name
  z: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    const abbr = findAbbreviation(moment);
    if (abbr) {
      return abbr;
    }
    return moment.format("Z");
  },
  zz: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    const abbr = findAbbreviation(moment);
    if (abbr) {
      return abbr;
    }
    return moment.format("Z");
  },
  zzz: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    const abbr = findAbbreviation(moment);
    if (abbr) {
      return abbr;
    }
    return moment.format("Z");
  },
  zzzz: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    const abbr = findAbbreviation(moment);
    if (abbr) {
      return getDescriptionForAbbreviation(abbr);
    }

    return moment.format("Z");
  },

  // localized zone-offset
  O: (moment: Moment) => {
    const offset = moment.utcOffset() / 60.0;
    if (offset === 0) {
      return "GMT";
    }

    const ret = moment
      .format("Z")
      .replace(endZeroes, "")
      .replace(/^([+-])0/, "$1");
    return "GMT" + ret;
  },
  OOOO: (moment: Moment) => {
    const offset = moment.utcOffset() / 60.0;
    if (offset === 0) {
      return "GMT";
    }

    const ret = moment.format("Z");
    return "GMT" + ret;
  },

  // zone-offset 'Z' for zero
  X: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    const ret = moment.format("ZZ");
    if (ret.match(endZeroes)) {
      return ret.substr(0, 3);
    }
    return ret;
  },
  XX: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    return moment.format("ZZ");
  },
  XXX: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    return moment.format("Z");
  },
  XXXX: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    return moment.format("ZZ");
  },
  XXXXX: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    return moment.format("Z");
  },

  // zone-offset
  x: (moment: Moment) => {
    const ret = moment.format("ZZ");
    if (ret.match(endZeroes)) {
      return ret.substr(0, 3);
    }
    return ret;
  },
  xx: "ZZ",
  xxx: "Z",
  xxxx: "ZZ",
  xxxxx: "Z",

  // zone-offset
  Z: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "+0000";
    }
    return moment.format("ZZ");
  },
  ZZ: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "+0000";
    }
    return moment.format("ZZ");
  },
  ZZZ: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "+0000";
    }
    return moment.format("ZZ");
  },
  ZZZZ: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "GMT";
    }
    return "GMT" + moment.format("Z");
  },
  ZZZZZ: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    return moment.format("Z");
  },
};

export class PaddedToken extends Token {
  public padding: number;
  public padChar: string;

  constructor(padding: number, padChar: string, value: string, count?: number) {
    super(value, count);
    this.padding = padding;
    this.padChar = padChar;
  }

  public format(input: string): string {
    if (input.length > this.padding) {
      throw new Error(
        `Cannot format padding as formatted string "${input}" exceeds pad width of ${this.padding}.`
      );
    }

    const padded = this.padChar.repeat(this.padding) + input;
    return padded.substr(0 - this.padding);
  }
}

export default class DateTimeFormatter extends Formatter {
  tokenize(formatString: string): Array<Token | string> {
    let padNextWidth = 0;
    let padNextChar = " ";

    const ret = [];

    for (let pos = 0; pos < formatString.length; pos++) {
      let cur = formatString.charAt(pos);
      if (cur.match(matchReserved)) {
        let start = pos++;

        for (
          ;
          pos < formatString.length && formatString.charAt(pos) === cur;
          pos++
        );

        let count = pos - start;

        // padding parsed
        if (cur === "p") {
          let pad = 0;
          if (pos < formatString.length) {
            cur = formatString.charAt(pos);
            if (cur.match(matchReserved)) {
              pad = count;
              start = pos++;
              for (
                ;
                pos < formatString.length && formatString.charAt(pos) === cur;
                pos++
              ); // short loop
              count = pos - start;
            }
          }
          if (pad === 0) {
            throw new Error(
              "Pad letter 'p' must be followed by valid pad pattern: " +
                formatString
            );
          }
          // pad and continue parsing
          padNextWidth = pad;
          padNextChar = " ";
        }

        // main rules
        const translate = javaToMoment[cur.repeat(count)];
        if (translate === null) {
          throw new Error(
            `'${cur.repeat(
              count
            )}' cannot be converted to a moment format token; token is not implemented`
          );
        } else if (translate === undefined) {
          throw new Error(
            `'${cur.repeat(
              count
            )}' cannot be converted to a moment format token; unknown token`
          );
        } else {
          if (padNextWidth > 0) {
            ret.push(new PaddedToken(padNextWidth, padNextChar, cur, count));
            padNextWidth = 0;
            padNextChar = " ";
          } else {
            ret.push(new Token(cur, count));
          }
        }
        pos--;
      } else if (cur === "'") {
        // parse literals
        const start = pos++;
        for (; pos < formatString.length; pos++) {
          if (formatString.charAt(pos) === "'") {
            if (
              pos + 1 < formatString.length &&
              formatString.charAt(pos + 1) === "'"
            ) {
              pos++;
            } else {
              break; // end of literal
            }
          }
        }

        if (pos >= formatString.length) {
          throw new Error(
            `Pattern ends with an incomplete string literal: ${formatString}`
          );
        }

        const str = formatString.substring(start + 1, pos);
        if (str.length == 0) {
          ret.push("'");
        } else {
          ret.push(str.replace("''", "'"));
        }
      } else if (cur === "[") {
        throw new Error(`Optional patterns are not supported: ${cur}`);
      } else if (cur === "]") {
        throw new Error(`Optional patterns are not supported: ${cur}`);
      } else if (cur === "{" || cur === "}" || cur === "#") {
        throw new Error(`Pattern includes reserved character: '${cur}'`);
      } else {
        if (ret[ret.length - 1] instanceof Token) {
          ret.push(cur);
        } else {
          ret[ret.length - 1] += cur;
        }
      }
    }
    return ret;
  }

  /**
   * Convert a moment into a formatted date string, using the format tokens defined at: https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html
   *
   * @param {Moment} moment - the moment to convert
   * @param {string} formatString - the format string
   */
  format(moment: Moment, formatString: string): string {
    const parts = this.tokenize(formatString);
    const ret = [];

    for (const part of parts) {
      if (part instanceof Token) {
        const partString = part.toString();
        const translation = javaToMoment[partString];

        if (translation === undefined) {
          const err = new Error(
            `'${partString}' cannot be converted to a moment format token; bailing`
          );
          //          console.error(err.message);
          throw err;
        } else {
          if (typeof translation === "function") {
            const result = translation(moment, partString);
            if (result === null) {
              const err = new Error(
                `'${partString}' cannot be converted to a moment format token; bailing`
              );
              //          console.error(err.message);
              throw err;
            }
            ret.push(result);
          } else {
            ret.push(moment.format(translation));
          }
        }
      } else {
        ret.push(part);
      }
    }
    return ret.join("");
  }
}
