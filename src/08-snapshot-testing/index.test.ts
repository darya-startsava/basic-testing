import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = ['first', 'second', 'third'];
  const linkedList = {
    value: 'first',
    next: {
      value: 'second',
      next: { value: 'third', next: { value: null, next: null } },
    },
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(linkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
