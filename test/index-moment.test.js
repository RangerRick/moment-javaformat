import moment from "moment";
window.moment = moment;

import "../src/index";

describe("index (moment)", () => {
  test("auto-import", () => {
    const now = moment();
    expect(now.formatJavaSDF).toBeDefined();
    expect(now.formatJavaDTF).toBeDefined();
  });
});
