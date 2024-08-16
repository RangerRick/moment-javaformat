import SimpleDateFormat from "./formats/SimpleDateFormat";
import DateTimeFormatter from "./formats/DateTimeFormatter";

const register = (moment, fatal = true) => {
  if (moment && moment.fn.zoneAbbr) {
    console.log("register: moment=%s, fatal=%s", typeof moment, fatal);
    if (moment.tz) {
      console.log(
        "Moment.js with timezone support detected; attaching Java format methods.",
      );
    } else {
      console.warn(
        "Moment.js detected, but timezone support is missing.  Some Java formatting features may not work as expected.",
      );
    }

    const sdf = new SimpleDateFormat();
    const dtf = new DateTimeFormatter();

    moment.fn.formatJavaSDF = function (formatString) {
      return sdf.format(this, formatString);
    };
    moment.fn.formatJavaDTF = function (formatString) {
      return dtf.format(this, formatString);
    };
    return moment;
  } else {
    console.error(
      "Unable to attach Java format methods.  Moment.js object was invalid.",
    );
    if (fatal) {
      throw new Error("Moment.js object was invalid.");
    }
  }
  return undefined;
};

/*
  Attempt to register with global Moment.js object if it's found,
  preferring `moment-timezone` over `moment`.
*/

if (typeof window !== "undefined" && window?.moment) {
  register(window.moment, false);
} else if (typeof global !== "undefined" && global?.moment) {
  register(global.moment, false);
} else if (typeof window !== "undefined" && window) {
  try {
    const moment = require("moment-timezone");
    window.moment = register(moment, false);
  } catch {
    console.warn(
      "Failed to load moment-timezone. Attempting fallback to moment.",
    );
    try {
      const moment = require("moment");
      window.moment = register(moment, false);
    } catch {
      console.warn(
        "Failed to load moment.  User will have to manually register.",
      );
    }
  }
}

let m = undefined;
if (typeof window !== "undefined") {
  m = window?.moment;
}
if (typeof m === "undefined" && typeof global !== "undefined") {
  m = global?.moment;
}
export default m;

export { register, SimpleDateFormat, DateTimeFormatter };
