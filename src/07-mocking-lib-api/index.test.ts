import axios from 'axios';
import { throttledGetDataFromApi } from './index';

let getSpy: jest.Mock;

jest.mock('axios', () => {
  return {
    create: () => ({
      get: getSpy,
    }),
  };
});

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    getSpy = jest.fn(() => ({
      data: 'data',
    }));
  });

  test('should create instance with provided base url', async () => {
    const mockFunction = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('relativePath');
    jest.runAllTimers();
    expect(mockFunction).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('relativePath');
    jest.runAllTimers();
    expect(getSpy).toBeCalledWith('relativePath');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('relativePath');
    jest.runAllTimers();
    expect(result).toBe('data');
  });
});
