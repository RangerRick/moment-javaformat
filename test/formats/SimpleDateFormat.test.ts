import SimpleDateFormat from '../../src/formats/SimpleDateFormat';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

const testSuite = {
  '1970-01-01T00:00:00Z': {
    "'literal string'": 'literal string',
    'G': 'AD',
    'Y': '1970',
    'A': '',
  }
};

const formatter = new SimpleDateFormat();

for (const [date, tests] of Object.entries(testSuite)) {
  const m = moment(date);
  for (const [formatString, output] of Object.entries(tests)) {
    console.log(`date=${date}, formatString=${formatString}, output=${output}`);
    test(`${date} ${formatString}`, () => {
      const formatted = formatter.format(m, formatString);
      expect(formatted).toBeDefined();
      expect(formatted).toBe(output);
    });
  }
}

expect(() => {
  formatter.format(moment(), 'A', true);
}).toThrow("'A' cannot be converted to a moment format token; bailing");

