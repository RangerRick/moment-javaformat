/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import 'core-js';
import 'regenerator-runtime/runtime';

import SimpleDateFormat from './formats/SimpleDateFormat';
//import DateTimeFormatter from './formats/DateTimeFormatter';

declare const define: any;
declare const exports: any;
declare const module: any;
declare const require: any;

// this loading routine is shamelessly copied from the "moment-duration-format" plugin
// @see https://github.com/jsmreese/moment-duration-format
(function loadMomentJS (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Detected AMD;
    // will register as an anonymous module
    define(['moment'], factory);
  } else if (typeof exports === 'object') {
    // Detected node.js;
    // this does not work with strict CommonJS, but only CommonJS-like environments
    // whicht support `module.exports`, like node.js does
    try {
      module.exports = factory(require('moment'));
    } catch (ignore) {
      // if `moment.js` is not available, leave the setup to the user;
      // this is necessary if the user works with other plugins which will
      // come with it's very own version of `moment.js` as a peer dependency
      // @see https://github.com/icambron/twix.js/issues/102
      module.exports = factory;
    }
  }

  if (root) {
    //working with globals;
    root.momentJDateFormatParserSetup = root.moment ? factory(root.moment) : factory;
  }
})(this, function loadPlugin (moment) {
  moment.fn.formatJSDF = new SimpleDateFormat();
//  moment.fn.formatJDFT = new DateTimeFormatter();
});

