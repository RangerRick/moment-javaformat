/* eslint-disable @typescript-eslint/no-explicit-any */

import SimpleDateFormat from './formats/SimpleDateFormat';
import DateTimeFormatter from './formats/DateTimeFormatter';

declare const moment: any;

const register = (moment: any): void => {
  if (moment.tz) {
    console.log('Moment.js with timezone support detected; attaching Java format methods.');
    moment.fn.formatJavaSDF = new SimpleDateFormat();
    moment.fn.formatJavaDFT = new DateTimeFormatter();
  } else {
    throw new Error('No timezone support detected on the provided moment object.');
  }
};

if (moment && moment.tz) {
  console.log('Moment.js with timezone support detected; attaching Java format methods.');
  moment.fn.formatJavaSDF = new SimpleDateFormat();
  moment.fn.formatJavaDFT = new DateTimeFormatter();
} else {
  console.warn('Moment.js with timezone support missing; skipping automatic moment-javaformat loading.');
  console.warn('Use momentJavaformat.register(moment) instead.');
}

export default {
  register: register,
};
