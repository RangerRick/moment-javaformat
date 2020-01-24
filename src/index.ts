/* eslint-disable @typescript-eslint/no-explicit-any */

import SimpleDateFormat from './formats/SimpleDateFormat';
import DateTimeFormatter from './formats/DateTimeFormatter';

declare const moment: any;

const register = (moment: any, fatal = true): void => {
  if (moment.tz) {
    console.log('Moment.js with timezone support detected; attaching Java format methods.');
    moment.fn.formatJavaSDF = new SimpleDateFormat();
    moment.fn.formatJavaDFT = new DateTimeFormatter();
  } else {
    console.error('Unable to attach Java format methods.  Moment.js object was invalid or missing timezone support.');
    if (fatal) {
      throw new Error('Moment.js object was invalid or missing timezone support.');
    }
  }
};

/* Attempt to register with global Moment.js object if it's found. */
// @ts-ignore
if (window.moment) {
  // @ts-ignore
  register(window.moment, false);
} else {
  console.warn('Moment.js with timezone support missing; skipping automatic moment-javaformat loading.');
  console.warn('Use momentJavaformat.register(moment) instead.');
}

export default {
  register: register,
};
