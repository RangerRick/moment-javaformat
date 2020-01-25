/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */

import SimpleDateFormat from './formats/SimpleDateFormat';
import DateTimeFormatter from './formats/DateTimeFormatter';

declare const define: any;
declare const require: any;
//declare const moment: any;

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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(function (root: any, factory: any) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['moment'], factory);
  } else if (typeof exports === 'object') {
      // Node. Does not work with strict CommonJS, but only CommonJS-like
      // enviroments that support module.exports, like Node.
      try {
          module.exports = factory(require('moment'));
      } catch (e) {
          // If moment is not available, leave the setup up to the user.
          // Like when using moment-timezone or similar moment-based package.
          module.exports = factory;
      }
  }

  if (root) {
      // Globals
      root.registerJavaFormats = root.moment ? factory(root.moment) : factory;
  }
})(this, function (_moment: any) {
  register(_moment, false);
  return register;
});

export default {
  register: register,
};

export { SimpleDateFormat, DateTimeFormatter };