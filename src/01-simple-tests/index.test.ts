import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: Action.Add });
    expect(result).toBe(12);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: Action.Subtract });
    expect(result).toBe(8);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: Action.Multiply });
    expect(result).toBe(20);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: Action.Divide });
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toBe(100);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: 'wrongAction' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '10',
      b: '2',
      action: Action.Multiply,
    });
    expect(result).toBeNull();
  });
});
