/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */

import SimpleDateFormat from './formats/SimpleDateFormat';
import DateTimeFormatter from './formats/DateTimeFormatter';

const register = (moment: any, fatal = true): boolean => {
  if (moment && moment.fn.format) {
    if (moment.tz) {
      console.log('Moment.js with timezone support detected; attaching Java format methods.');
    } else {
      console.warn('Moment.js detected, but timezone support is missing.  Some features may not work as expected.');
    }

    const sdf = new SimpleDateFormat();
    const dtf = new DateTimeFormatter();

    moment.fn.formatJavaSDF = function(formatString: string): string {
      return sdf.format(this, formatString);
    };
    moment.fn.formatJavaDTF = function(formatString: string): string {
      return dtf.format(this, formatString);
    };
    return true;
  } else {
    console.error('Unable to attach Java format methods.  Moment.js object was invalid or missing timezone support.');
    if (fatal) {
      throw new Error('Moment.js object was invalid or missing timezone support.');
    }
  }
  return false;
};

/*
  Attempt to register with global Moment.js object if it's found,
  preferring `moment-timezone` over `moment`.
*/

// @ts-ignore
if (window.moment) {
  // @ts-ignore
  register(window.moment, false);
} else {
  try {
    const moment = require('moment-timezone');
    register(moment, false);
  } catch (err) {
    console.warn('Failed to load moment-timezone. Attempting fallback to moment.');
    try {
      const moment = require('moment');
      register(moment, false);
    } catch (subErr) {
      console.warn('Failed to load moment.  User will have to manually register.');
    }
  }
}

export default register;

export { SimpleDateFormat, DateTimeFormatter };