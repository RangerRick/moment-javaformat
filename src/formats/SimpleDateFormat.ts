// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
declare const moment: any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Moment = any;
//import { Moment } from 'moment-timezone';

import {
  Formatter,
  Token,
  getDescriptionForAbbreviation,
  getZoneForDateTime,
  toAbsString,
  zeroPad,
} from "../Formatter";

const matchReserved = /[A-Za-z]/;

const eraFormatter = (moment: Moment) => {
  return moment.year() > 0 ? "AD" : "BC";
};

const guessZoneInfo = (moment: Moment) => {
  let abbr = moment.zoneAbbr();
  const name = moment.zoneName();
  if (moment.tz) {
    if (!name || name === "") {
      // missing the zone name, probably can't find things right
      return null;
    }
    if (abbr === "UTC" && moment.utcOffset() !== 0) {
      // we only know the offset
      return null;
    }

    // return name;
    return {
      abbr: abbr,
      name: name,
      description: getDescriptionForAbbreviation(abbr),
    };
  }

  abbr = getZoneForDateTime(moment);
  if (abbr) {
    const match = getDescriptionForAbbreviation(abbr);
    if (match) {
      return {
        abbr: abbr,
        name: name,
        description: match,
      };
    }
  }

  return null;
};

const javaToMoment = {
  // Era designator
  G: eraFormatter,
  GG: eraFormatter,
  GGG: eraFormatter,
  GGGG: eraFormatter,
  GGGGG: eraFormatter,
  GGGGGG: eraFormatter,

  // Year
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

  // Week year
  Y: "gggg",
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

  // Month in year
  M: "M",
  MM: "MM",
  MMM: "MMM",
  MMMM: "MMMM",
  MMMMM: "MMMM",
  MMMMMM: "MMMM",

  // Week in year
  w: (moment: Moment) => {
    return zeroPad(moment.format("w"), 1);
  },
  ww: (moment: Moment) => {
    return zeroPad(moment.format("w"), 2);
  },
  www: (moment: Moment) => {
    return zeroPad(moment.format("w"), 3);
  },
  wwww: (moment: Moment) => {
    return zeroPad(moment.format("w"), 4);
  },
  wwwww: (moment: Moment) => {
    return zeroPad(moment.format("w"), 5);
  },
  wwwwww: (moment: Moment) => {
    return zeroPad(moment.format("w"), 6);
  },

  // Week in month (W) not supported
  W: null,
  WW: null,
  WWW: null,
  WWWW: null,

  // Day in year
  D: "DDD",
  DD: (moment: Moment) => {
    return zeroPad(moment.format("DDD"), 2);
  },
  DDD: (moment: Moment) => {
    return zeroPad(moment.format("DDD"), 3);
  },
  DDDD: (moment: Moment) => {
    return zeroPad(moment.format("DDD"), 4);
  },
  DDDDD: (moment: Moment) => {
    return zeroPad(moment.format("DDD"), 5);
  },
  DDDDDD: (moment: Moment) => {
    return zeroPad(moment.format("DDD"), 6);
  },

  // Day in month
  d: "D",
  dd: "DD",
  ddd: (moment: Moment) => {
    return zeroPad(moment.format("D"), 3);
  },
  dddd: (moment: Moment) => {
    return zeroPad(moment.format("D"), 4);
  },
  ddddd: (moment: Moment) => {
    return zeroPad(moment.format("D"), 5);
  },
  dddddd: (moment: Moment) => {
    return zeroPad(moment.format("D"), 6);
  },

  // Day of week in month (F) not supported
  F: null,
  FF: null,
  FFF: null,
  FFFF: null,

  // Day name in week
  E: "ddd",
  EE: "ddd",
  EEE: "ddd",
  EEEE: "dddd",
  EEEEE: "dddd",
  EEEEEE: "dddd",

  // Day number of week
  u: "E",
  uu: (moment: Moment) => {
    return zeroPad(moment.format("E"), 2);
  },
  uuu: (moment: Moment) => {
    return zeroPad(moment.format("E"), 3);
  },
  uuuu: (moment: Moment) => {
    return zeroPad(moment.format("E"), 4);
  },
  uuuuu: (moment: Moment) => {
    return zeroPad(moment.format("E"), 5);
  },
  uuuuuu: (moment: Moment) => {
    return zeroPad(moment.format("E"), 6);
  },

  // Am/pm marker
  a: "A",
  aa: "A",
  aaa: "A",
  aaaa: "A",
  aaaaa: "A",
  aaaaaa: "A",

  // Hour in day (0-23)
  H: "H",
  HH: "HH",
  HHH: (moment: Moment) => {
    return zeroPad(moment.format("H"), 3);
  },
  HHHH: (moment: Moment) => {
    return zeroPad(moment.format("H"), 4);
  },
  HHHHH: (moment: Moment) => {
    return zeroPad(moment.format("H"), 5);
  },
  HHHHHH: (moment: Moment) => {
    return zeroPad(moment.format("H"), 6);
  },

  // Hour in day (1-24)
  k: "k",
  kk: "kk",
  kkk: (moment: Moment) => {
    return zeroPad(moment.format("k"), 3);
  },
  kkkk: (moment: Moment) => {
    return zeroPad(moment.format("k"), 4);
  },
  kkkkk: (moment: Moment) => {
    return zeroPad(moment.format("k"), 5);
  },
  kkkkkk: (moment: Moment) => {
    return zeroPad(moment.format("k"), 6);
  },

  // Hour in am/pm (0-11)
  // except java doesn't actually do this, it outputs the same as 'h'!  (sigh)
  K: (moment: Moment) => {
    const asNumber = parseInt(moment.format("h"), 10);
    return toAbsString(asNumber % 12);
  },
  KK: (moment: Moment) => {
    const asNumber = parseInt(moment.format("h"), 10);
    return zeroPad(toAbsString(asNumber % 12), 2);
  },
  KKK: (moment: Moment) => {
    const asNumber = parseInt(moment.format("h"), 10);
    return zeroPad(toAbsString(asNumber % 12), 3);
  },
  KKKK: (moment: Moment) => {
    const asNumber = parseInt(moment.format("h"), 10);
    return zeroPad(toAbsString(asNumber % 12), 4);
  },
  KKKKK: (moment: Moment) => {
    const asNumber = parseInt(moment.format("h"), 10);
    return zeroPad(toAbsString(asNumber % 12), 5);
  },
  KKKKKK: (moment: Moment) => {
    const asNumber = parseInt(moment.format("h"), 10);
    return zeroPad(toAbsString(asNumber % 12), 6);
  },

  // Hour in am/pm (1-12)
  h: "h",
  hh: "hh",
  hhh: (moment: Moment) => {
    return zeroPad(moment.format("h"), 3);
  },
  hhhh: (moment: Moment) => {
    return zeroPad(moment.format("h"), 4);
  },
  hhhhh: (moment: Moment) => {
    return zeroPad(moment.format("h"), 5);
  },
  hhhhhh: (moment: Moment) => {
    return zeroPad(moment.format("h"), 6);
  },

  // Minute in hour
  m: "m",
  mm: "mm",
  mmm: (moment: Moment) => {
    return zeroPad(moment.format("m"), 3);
  },
  mmmm: (moment: Moment) => {
    return zeroPad(moment.format("m"), 4);
  },
  mmmmm: (moment: Moment) => {
    return zeroPad(moment.format("m"), 5);
  },
  mmmmmm: (moment: Moment) => {
    return zeroPad(moment.format("m"), 6);
  },

  // Second in minute
  s: "s",
  ss: "ss",
  sss: (moment: Moment) => {
    return zeroPad(moment.format("s"), 3);
  },
  ssss: (moment: Moment) => {
    return zeroPad(moment.format("s"), 4);
  },
  sssss: (moment: Moment) => {
    return zeroPad(moment.format("s"), 5);
  },
  ssssss: (moment: Moment) => {
    return zeroPad(moment.format("s"), 6);
  },

  // Millisecond
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

  // Time zone (Pacific Standard Time; PST)
  z: (moment: Moment) => {
    const info = guessZoneInfo(moment);

    if (info) {
      return info.abbr;
    }
    return "GMT" + moment.format("Z");
  },
  zz: (moment: Moment) => {
    const info = guessZoneInfo(moment);

    if (info) {
      return info.abbr;
    }
    return "GMT" + moment.format("Z");
  },
  zzz: (moment: Moment) => {
    const info = guessZoneInfo(moment);

    if (info) {
      return info.abbr;
    }
    return "GMT" + moment.format("Z");
  },
  zzzz: (moment: Moment) => {
    const info = guessZoneInfo(moment);

    if (info) {
      return info.description;
    }
    return "GMT" + moment.format("Z");
  },
  zzzzz: (moment: Moment) => {
    const info = guessZoneInfo(moment);

    if (info) {
      return info.description;
    }
    return "GMT" + moment.format("Z");
  },
  zzzzzz: (moment: Moment) => {
    const info = guessZoneInfo(moment);

    if (info) {
      return info.description;
    }
    return "GMT" + moment.format("Z");
  },

  // Time zone (-0800)
  Z: "ZZ",
  ZZ: "ZZ",
  ZZZ: "ZZ",
  ZZZZ: "ZZ",
  ZZZZZ: "ZZ",
  ZZZZZZ: "ZZ",

  // Time zone (-08; -0800; -08:00)
  X: (moment: Moment) => {
    if (moment.utcOffset() === 0) {
      return "Z";
    }
    return moment.format("Z").substr(0, 3);
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
};

export default class SimpleDateFormat extends Formatter {
  tokenize(pattern: string): Array<Token | string> {
    const ret = [];
    const length = pattern.length;

    let inQuote = false;
    let count = 0;
    let lastTag = null;
    let tmpBuffer = null;

    const encode = (tag, length) => {
      const translate = javaToMoment[tag];
      if (translate === null) {
        throw new Error(
          `'${tag.repeat(
            length,
          )}' cannot be converted to a moment format token; token is not implemented`,
        );
      } else if (translate === undefined) {
        throw new Error(
          `'${tag.repeat(
            length,
          )}' cannot be converted to a moment format token; unknown token`,
        );
      }
      ret.push(new Token(tag, length));
    };

    const append = (value: string) => {
      if (ret[ret.length - 1] instanceof Token) {
        ret.push(value);
      } else {
        ret[ret.length - 1] += value;
      }
    };

    for (let i = 0; i < length; i++) {
      let c = pattern.charAt(i);
      if (c === "'") {
        // '' is treated as a single quote regardless of being
        // in a quoted section.
        if (i + 1 < length) {
          c = pattern.charAt(i + 1);
          if (c === "'") {
            i++;
            if (count != 0) {
              encode(lastTag, count);
              lastTag = null;
              count = 0;
            }
            if (inQuote) {
              tmpBuffer += c;
            } else {
              append(c);
            }
            continue;
          }
        }

        if (!inQuote) {
          if (count !== 0) {
            encode(lastTag, count);
            lastTag = null;
            count = 0;
          }
          tmpBuffer = "";
          inQuote = true;
        } else {
          append(tmpBuffer);
          inQuote = false;
        }

        continue;
      }

      if (inQuote) {
        tmpBuffer += c;
        continue;
      }

      if (!c.match(matchReserved)) {
        if (count !== 0) {
          encode(lastTag, count);
          lastTag = null;
          count = 0;
        }

        if (c.charCodeAt(0) < 128) {
          // In most cases, c would be a delimiter, such as ':'.
          append(c);
        } else {
          // Take any contiguous non-ASCII alphabet characters and
          // put them in a single TAG_QUOTE_CHARS.
          let j;
          for (j = i + 1; j < length; j++) {
            const d = pattern.charAt(j);
            if (d === "'" || d.match(matchReserved)) {
              break;
            }
          }
          for (; i < j; i++) {
            append(pattern.charAt(i));
          }
          i--;
        }

        continue;
      }

      const tag = javaToMoment[c];
      if (tag === undefined) {
        throw new Error(`Illegal pattern character '${c}'`);
      }

      if (lastTag === null || lastTag === c) {
        lastTag = c;
        count++;
        continue;
      }

      encode(lastTag, count);
      lastTag = c;
      count = 1;
    }

    if (inQuote) {
      throw new Error("Unterminated quote");
    }

    if (count != 0) {
      encode(lastTag, count);
    }

    return ret;
  }

  /**
   * Convert a moment into a formatted date string, using the format tokens defined at: https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html
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
          throw new Error(
            `'${partString}' cannot be converted to a moment format token; unknown token`,
          );
        } else {
          if (typeof translation === "function") {
            ret.push(translation(moment, partString));
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
