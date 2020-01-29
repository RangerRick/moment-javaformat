import { register } from '../src/index';

describe('index (manual)', () => {
  test('register(null, false)', () => {
    console.log('calling register');
    const ret = register(null, false);
    console.log('ret=', ret);
    expect(ret).toBeUndefined();
  });
  test('register(null, true)', () => {
    expect(() => {
      register(null, true);
    }).toThrowError('Moment.js object was invalid.');
  });
  test('register(moment-timezone, false)', () => {
    const moment = require('moment-timezone');
    const ret = register(moment, false);
    expect(ret).toBeDefined();
    expect(ret.fn).toBeDefined();
    expect(ret.fn.formatJavaSDF).toBeDefined();
    expect(ret.fn.formatJavaDTF).toBeDefined();
  });
  test('register(moment-timezone, true)', () => {
    const moment = require('moment-timezone');
    const ret = register(moment, true);
    expect(ret).toBeDefined();
    expect(ret.fn).toBeDefined();
    expect(ret.fn.formatJavaSDF).toBeDefined();
    expect(ret.fn.formatJavaDTF).toBeDefined();
  });
});
