import moment from "moment-timezone";
window.moment = moment;

import { Formatter, getZoneForDateTime } from "../src/Formatter";
import testData from "./test-data";
import SimpleDateFormat from "../src/formats/SimpleDateFormat";
import DateTimeFormatter from "../src/formats/DateTimeFormatter";

describe("Formatter.getZoneForDateTime", () => {
  getZoneForDateTime("2020-01-01T18:00-05:00");
});

/* test using auto-generated test data */

// Java format fields that aren't easily implemented/left unimplemented
const unimplemented = {
  SimpleDateFormat: ["W", "F"],
  DateTimeFormatter: ["W", "F", "n", "N"],
};

// Java and Moment disagree a bit on how days across funky zone boundaries, sometimes causing an off-by-1 error
const knownBroken = {
  DateTimeFormatter: ["u", "y", "D", "e", "c"],
};

const testClass = (className: string, impl: Formatter): void => {
  const data = testData[className];
  describe(className, () => {
    const tokens = Object.keys(data);
    for (const token of tokens) {
      describe(`'${token}'`, () => {
        const dates = Object.keys(data[token]);
        for (const dateString of dates) {
          describe(dateString, () => {
            const zones = Object.keys(data[token][dateString]);

            for (const zone of zones) {
              let date = moment(dateString);
              if (zone.indexOf("/") > 0) {
                date = date.tz(zone);
              } else if (zone === "Z") {
                date = date.tz("UTC");
              } else {
                date = date.utcOffset(zone);
              }

              describe(zone, () => {
                if (
                  unimplemented[className] &&
                  unimplemented[className].indexOf(token) >= 0
                ) {
                  expect(() => {
                    impl.format(date, token);
                  }).toThrowError(
                    "cannot be converted to a moment format token",
                  );
                  return;
                }

                for (const count of [1, 2, 3, 4, 5, 6]) {
                  const formatString = token.repeat(count);

                  if (
                    knownBroken[className] &&
                    knownBroken[className].indexOf(token) >= 0
                  ) {
                    // skip for now, these are failing for various reasons
                    test.skip(formatString, () => {
                      const formatted = impl.format(date, formatString);
                      expect(formatted).toBeDefined();
                      expect(formatted.length).toBeGreaterThan(0);
                    });
                  } else {
                    test(formatString, () => {
                      const expected = data[token][dateString][zone][count - 1];
                      if (expected === null) {
                        expect(() => {
                          impl.format(date, formatString);
                        }).toThrowError();
                      } else {
                        const formatted = impl.format(date, formatString);
                        expect(formatted).toBe(expected);
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    }
  });
};

const sdf = new SimpleDateFormat();
const dtf = new DateTimeFormatter();

describe("formatters", () => {
  testClass("SimpleDateFormat", sdf);
  testClass("DateTimeFormatter", dtf);
});

//const o = dtf.format(moment.tz('2020-01-01T00:00Z', 'UTC'), 'O');
//console.log('o=',o);
