import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(10000);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockFunction = jest.spyOn(path, 'join').mockImplementation();
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(() => Promise.resolve('fileContent'));
    await readFileAsynchronously('pathToFile');
    expect(mockFunction).toBeCalledWith(__dirname, 'pathToFile');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(path, 'join').mockImplementation();
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(() => Promise.resolve('fileContent'));
    const result = await readFileAsynchronously('pathToFile');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(path, 'join').mockImplementation();
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(() => Promise.resolve('fileContent'));
    const result = await readFileAsynchronously('pathToFile');
    expect(result).toBe('fileContent');
  });
});
