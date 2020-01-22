/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Moment } from 'moment';
import { Formatter, Token, toAbsString, zeroPad } from '../Formatter';

const javaToMoment = {
  // Era designator
  G: (moment: Moment) => {
    return moment.year() > 0 ? 'AD' : 'BC';
  }, // (era - AD or BC)

  // Year
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

  // Week year
  Y: 'gggg',
  YY: 'gg',
  YYY: (moment: Moment) => {
    return zeroPad(moment.format('gggg'), 3);
  },
  YYYY: 'gggg',

  // Month in year
  M: 'M',
  MM: 'MM',
  MMM: 'MMM',
  MMMM: 'MMMM',

  // Week in year
  w: 'w',
  ww: 'ww',
  www: (moment: Moment) => {
    return zeroPad(moment.format('ww'), 3);
  },
  wwww: (moment: Moment) => {
    return zeroPad(moment.format('ww'), 3);
  },

  // Week in month (W) not supported

  // Day in year
  D: 'DDD',
  DD: (moment: Moment) => {
    return zeroPad(moment.format('DD'), 2);
  },
  DDD: (moment: Moment) => {
    return zeroPad(moment.format('DDD'), 3);
  },
  DDDD: (moment: Moment) => {
    return zeroPad(moment.format('DDD'), 4);
  },

  // Day in month
  d: 'DD',
  dd: (moment: Moment) => {
    return zeroPad(moment.format('DDD'), 2);
  },
  ddd: (moment: Moment) => {
    return zeroPad(moment.format('DDD'), 3);
  },
  dddd: (moment: Moment) => {
    return zeroPad(moment.format('DDDD'), 4);
  },

  // Day of week in month (F) not supported

  // Day name in week
  E: 'ddd',
  EE: 'ddd',
  EEE: 'ddd',
  EEEE: 'dddd',

  // Day number of week
  u: 'E',
  uu: (moment: Moment) => {
    return zeroPad(moment.format('E'), 2);
  },
  uuu: (moment: Moment) => {
    return zeroPad(moment.format('E'), 3);
  },
  uuuu: (moment: Moment) => {
    return zeroPad(moment.format('E'), 4);
  },

  // Am/pm marker 
  a: 'A',
  aa: 'A',

  // Hour in day (0-23) 
  H: 'H',
  HH: 'HH',

  // Hour in day (1-24)
  k: 'k',
  kk: 'kk',

  // Hour in am/pm (0-11) 
  K: (moment: Moment) => {
    return parseInt(moment.format('h'), 10) - 1;
  },
  KK: (moment: Moment) => {
    return zeroPad(parseInt(moment.format('h'), 10) - 1, 2);
  },

  // Hour in am/pm (1-12) 
  h: 'h',
  hh: 'hh',

  // Minute in hour 
  m: 'm',
  mm: 'mm',

  // Second in minute 
  s: 's',
  ss: 'ss',

  // Millisecond
  S: 'S',
  SS: 'SS',
  SSS: 'SSS',
  SSSS: 'SSSS',

  // Time zone (Pacific Standard Time; PST)
  z: 'z',
  zz: 'z',
  zzz: 'z',
  zzzz: 'zz',

  // Time zone (-0800)
  Z: 'Z',
  ZZ: 'Z',
  ZZZ: 'Z',
  ZZZZ: 'Z',

  // Time zone (-08; -0800; -08:00)
  X: (moment: Moment) => {
    return moment.format('Z').substr(0, 3);
  },
  XX: 'Z',
  XXX: (moment: Moment) => {
    const formatted = moment.format('Z');
    return formatted.substr(0, 3) + ':' + formatted.substr(3);
  }
};

export default class SimpleDateFormat extends Formatter {
  /**
   * Convert a moment into a formatted date string, using the format tokens defined at: https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html
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
            ret.push(translation(moment, partString));
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