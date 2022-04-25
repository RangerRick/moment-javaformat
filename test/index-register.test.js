import { register } from "../src/index";

describe("index (manual)", () => {
  test("register(null, false)", () => {
    console.log("calling register");
    const ret = register(null, false);
    console.log("ret=", ret);
    expect(ret).toBeUndefined();
  });
  test("register(null, true)", () => {
    expect(() => {
      register(null, true);
    }).toThrowError("Moment.js object was invalid.");
  });
});
