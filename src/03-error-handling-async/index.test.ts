import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue('testData');
    expect(result).toBe('testData');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const result = () => {
      throwError('Error message');
    };
    expect(result).toThrow(new Error('Error message'));
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => {
      throwError();
    };
    expect(result).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => {
      throwCustomError();
    };
    expect(result).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
