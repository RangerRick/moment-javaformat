import moment from 'moment-timezone';
window.moment = moment;

import '../src/index';

describe('index (moment-timezone)', () => {
  test('auto-import', () => {
    const now = moment();
    expect(now.formatJavaSDF).toBeDefined();
    expect(now.formatJavaDTF).toBeDefined();
  });
});