import { Formatter, Token } from '../src/Formatter';

const singleLiteralFormatStrings = {
  'g': [new Token('g')],
  'gg': [new Token('g', 2)],
  "'blah'gg": ['blah', new Token('g', 2)],
  'ggff': [new Token('g', 2), new Token('f', 2)],
  "'\\'blah'gg": ["'blah", new Token('g', 2)],
};

const doubleLiteralFormatStrings = {
  "[blah]gg": ['blah', new Token('g', 2)],
  "[\\]blah]gg": ["]blah", new Token('g', 2)],
};

for (const [key, value] of Object.entries(singleLiteralFormatStrings)) {
  console.log(`key=${key}, value=${value}`);
  test(key, () => {
    const tokenized = Formatter.tokenize(key, "'");
    expect(tokenized).toBeDefined();
    expect(value.length).toEqual(tokenized.length);
    for (let i=0; i < value.length; i++) {
      expect(value[i]).toEqual(tokenized[i]);
    }
  });
}

for (const [key, value] of Object.entries(doubleLiteralFormatStrings)) {
  console.log(`key=${key}, value=${value}`);
  test(key, () => {
    const tokenized = Formatter.tokenize(key, ['[', ']']);
    expect(tokenized).toBeDefined();
    expect(value.length).toEqual(tokenized.length);
    for (let i=0; i < value.length; i++) {
      expect(value[i]).toEqual(tokenized[i]);
    }
  });
}

test('token type', () => {
  const tokenized = Formatter.tokenize('gggg', "'");
  expect(tokenized[0]).toBeInstanceOf(Token);
});

test('literal type', () => {
  const tokenized = Formatter.tokenize("'blah'", "'");
  expect(tokenized[0]).not.toBeInstanceOf(Token);
  expect(tokenized[0]).toBe('blah');
});
