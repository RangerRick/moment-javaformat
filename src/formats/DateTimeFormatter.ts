/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Moment } from 'moment';
import { Formatter, Token, toAbsString, zeroPad } from '../Formatter';

const adConverter = (moment: Moment) => {
  return moment.year() > 0 ? 'AD' : 'BC';
};

const zoneWithZConverter = (moment: Moment) => {
  return moment.utcOffset() === 0? 'Z' : moment.format('ZZ');
};

const javaToMoment = {
  // era
  G: adConverter,
  GG: adConverter,
  GGG: adConverter,
  GGGG: (moment: Moment) => {
    return moment.year() > 0 ? 'Anno Domini' : 'Before Christ';
  },

  // year
  u: (moment: Moment) => {
    return zeroPad(moment.format('YYYY'), 1);
  },
  uu: (moment: Moment) => {
    return zeroPad(toAbsString(moment.format('YYYY')), 2);
  },
  uuu: (moment: Moment) => {
    return zeroPad(moment.format('YYYY'), 3);
  },
  uuuu: 'YYYY',

  // year-of-era
  y: (moment: Moment) => {
    return toAbsString(moment.format('Y'));
  },
  yy: (moment: Moment) => {
    return toAbsString(moment.format('YY'));
  },
  yyy: (moment: Moment) => {
    return zeroPad(toAbsString(moment.format('YYYY')), 3);
  },
  yyyy: (moment: Moment) => {
    return toAbsString(moment.format('YYYY'));
  },

  // day-of-year
  D: 'DDD',
  DD: (moment: Moment) => {
    const ret = moment.format('DDD');
    if (ret.length > 2) {
      throw new Error('Field DayOfYear cannot be printed as the value ' + ret + ' exceeds the maximum print width of 2');
    }
    return zeroPad(ret, 2);
  },
  DDD: 'DDDD',
  // DDDD throws an error in Java DateTimeFormatter

  // month-of-year
  M: 'M',
  MM: 'MM',
  MMM: 'MMM',
  MMMM: 'MMMM',

  // month-of-year (numeric)
  L: 'M',
  LL: 'MM',
  LLL: 'M',
  LLLL: 'M',

  // day-of-month
  d: 'D',
  dd: 'DD',

  // quarter-of-year
  Q: 'Q',
  QQ: (moment: Moment) => {
    return zeroPad(moment.format('Q'), 2);
  },
  QQQ: (moment: Moment) => {
    return 'Q' + moment.format('Q');
  },
  QQQQ: (moment: Moment) => {
    return moment.format('Qo') + ' quarter';
  },

  // quarter-of-year
  q: 'Q',
  qq: 'QQ',
  qqq: 'Q',
  qqqq: 'Q',

  // week-based-year
  Y: (moment: Moment) => {
    return zeroPad(moment.format('gggg'), 1);
  },
  YY: 'gg',
  YYY: (moment: Moment) => {
    return zeroPad(moment.format('gggg'), 3);
  },
  YYYY: 'gggg',

  // week-of-week-based-year
  w: 'w',
  ww: 'ww',

  // week-of-month (W) not supported

  // day-of-week
  E: 'ddd',
  EE: 'ddd',
  EEE: 'ddd',
  EEEE: 'dddd',

  // localized day-of-week (e)
  e: 'e',
  ee: (moment: Moment) => {
    return zeroPad(moment.format('e'), 2);
  },
  eee: 'ddd',
  eeee: 'dddd',

  // localized day-of-week (c)
  c: 'e',
  ccc: 'ddd',
  cccc: 'dddd',

  // week of month (F) not supported

  // am-pm-of-day
  a: 'A',

  // clock-hour-of-am-pm
  h: 'h',
  hh: 'hh',

  // hour-of-am-pm
  K: (moment: Moment) => {
    return (moment.hour() % 12) - 1;
  },
  KK: (moment: Moment) => {
    const hour = (moment.hour() % 12) - 1;
    return zeroPad(hour, 2);
  },

  // clock-hour-of-am-pm
  k: 'k',
  kk: 'kk',

  // hour-of-day
  H: 'H',
  HH: 'HH',

  // minute-of-hour
  m: 'm',
  mm: 'mm',

  // second-of-minute
  s: 's',
  ss: 'ss',

  // fraction-of-second
  S: 'S',
  SS: 'SS',
  SSS: 'SSS',
  SSSS: 'SSSS',

  // milli-of-day
  A: (moment: Moment) => {
    const dayStart = moment.clone().hour(0).minute(0).second(0).milliseconds(0);
    return zeroPad(moment.valueOf() - dayStart.valueOf(), 1);
  },

  // nano-of-second not supported

  // nano-of-day not supported

  // time-zone ID
  VV: (moment: Moment) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const ret = moment.tz();
    if (!ret) {
      // if we don't have a "zone" then just return the offset format
      return moment.format('Z');
    }
    return ret;
  },

  // time-zone name
  z: 'z',
  zz: 'z',
  zzz: 'z',
  zzzz: 'zz',

  // localized zone-offset
  O: (moment: Moment) => {
    const offset = moment.utcOffset() / 60.0;
    const pre = Math.floor(offset);

    if (Number.isInteger(offset)) {
      if (offset < 0) {
        return 'UTC-' + toAbsString(pre);
      } else {
        return 'UTC+' + pre;
      }
    } else {
      const partial = toAbsString(moment.utcOffset() % 60);
      if (offset < 0) {
        return 'UTC-' + toAbsString(pre) + ':' + zeroPad(partial, 2);
      } else {
        return 'UTC-' + toAbsString(pre) + ':' + zeroPad(partial, 2);
      }
    }
  },
  OOOO: (moment: Moment) => {
    const offset = moment.utcOffset() / 60.0;
    const pre = Math.floor(offset);

    if (Number.isInteger(offset)) {
      if (offset < 0) {
        return 'UTC-' + zeroPad(toAbsString(pre), 2) + ':00';
      } else {
        return 'UTC+' + zeroPad(pre, 2) + ':00';
      }
    } else {
      const partial = toAbsString(moment.utcOffset() % 60);
      if (offset < 0) {
        return 'UTC-' + zeroPad(toAbsString(pre), 2) + ':' + zeroPad(partial, 2);
      } else {
        return 'UTC-' + zeroPad(toAbsString(pre), 2) + ':' + zeroPad(partial, 2);
      }
    }
  },

  // zone-offset 'Z' for zero
  X: zoneWithZConverter,
  XX: zoneWithZConverter,
  XXX: zoneWithZConverter,
  XXXX: zoneWithZConverter,

  // zone-offset
  x: (moment: Moment) => {
    return moment.format('Z').substr(0, 3);
  },
  xx: 'ZZ',
  xxx: 'Z',
  xxxx: 'ZZ',

  // zone-offset
  Z: 'ZZ',
  ZZ: 'ZZ',
  ZZZ: 'ZZ',
  ZZZZ: (moment: Moment) => {
    return 'UTC' + moment.format('Z');
  }
};

export default class DateTimeFormatter extends Formatter {
  /**
   * Convert a moment into a formatted date string, using the format tokens defined at: https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html
   *
   * @param {Moment} moment - the moment to convert
   * @param {string} formatString - the format string
   * @param {boolean} strict - if true, fail on unhandled format tokens, otherwise silently drop them
   */
  format(moment: Moment, formatString: string, strict?: boolean): string {
    const parts = Formatter.tokenize(formatString, "'");
    const ret = [];
    for (const part of parts) {
      if (part instanceof Token) {
        const partString = part.toString();
        const translation = javaToMoment[partString];
        if (translation === undefined) {
          if (strict) {
            const err = new Error(`'${partString}' cannot be converted to a moment format token; bailing`);
            console.error(err.message);
            throw err;
          }
          console.warn(`SimpleDateFormat: '${partString}' cannot be converted to a moment format token; ignoring`);
        } else {
          if (typeof translation === 'function') {
            ret.push(translation(moment, partString, strict));
          } else {
            ret.push(moment.format(translation));
          }
        }
      } else {
        ret.push(part);
      }
    }
    return ret.join('');
  }
}