import { simpleCalculator, Action } from './index';

const testCases = [
  // add two numbers cases
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 0.2, action: Action.Add, expected: 2.2 },
  { a: 3, b: -1, action: Action.Add, expected: 2 },
  // subtract two numbers cases
  { a: 3, b: -2, action: Action.Subtract, expected: 5 },
  { a: 10, b: 0.2, action: Action.Subtract, expected: 9.8 },
  { a: 10, b: 0, action: Action.Subtract, expected: 10 },
  // multiply two numbers cases
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 4, b: -8, action: Action.Multiply, expected: -32 },
  { a: 100, b: 0.4, action: Action.Multiply, expected: 40 },
  // divide two numbers cases
  { a: 40, b: 0.5, action: Action.Divide, expected: 80 },
  { a: 35, b: 5, action: Action.Divide, expected: 7 },
  { a: -6, b: 2, action: Action.Divide, expected: -3 },
  // exponentiate two numbers cases
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 8, b: 3, action: Action.Exponentiate, expected: 512 },
  { a: 9, b: 0.5, action: Action.Exponentiate, expected: 3 },
  // null for invalid action cases
  { a: 6, b: 2, action: 12, expected: null },
  { a: 6, b: 2, action: null, expected: null },
  { a: 6, b: 2, action: undefined, expected: null },
  { a: 6, b: 2, action: true, expected: null },
  { a: 6, b: 2, action: 'string', expected: null },
  { a: 6, b: 2, action: 12n, expected: null },
  { a: 6, b: 2, action: { action: Action.Add }, expected: null },
  // null for invalid action cases
  { a: '3', b: 2, action: Action.Add, expected: null },
  { a: 3, b: '2', action: Action.Add, expected: null },
  { a: 3, b: null, action: Action.Add, expected: null },
  { a: 3, b: undefined, action: Action.Add, expected: null },
  { a: 3, b: false, action: Action.Add, expected: null },
  { a: 3, b: 12n, action: Action.Add, expected: null },
  { a: 3, b: { b: 2 }, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return result for valid arguments and null for invalid',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
