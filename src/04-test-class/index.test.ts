import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
  BankAccount,
} from '.';

import lodash from 'lodash';

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  let balance: number;
  let anotherAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(300);
    balance = bankAccount.getBalance();
    anotherAccount = getBankAccount(0);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(balance).toBe(300);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const result = () => {
      bankAccount.withdraw(400);
    };
    expect(result).toThrow(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring more than balance', () => {
    const result = () => {
      bankAccount.transfer(450, anotherAccount);
    };
    expect(result).toThrow(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring to the same account', () => {
    const result = () => {
      bankAccount.transfer(250, bankAccount);
    };
    expect(result).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    bankAccount.deposit(100);
    const result = bankAccount.getBalance();
    expect(result).toBe(400);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(100);
    const result = bankAccount.getBalance();
    expect(result).toBe(200);
  });

  test('should transfer money', () => {
    bankAccount.transfer(200, anotherAccount);
    const accountBalance = bankAccount.getBalance();
    const anotherAccountBalance = anotherAccount.getBalance();
    expect(accountBalance).toBe(100);
    expect(anotherAccountBalance).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockImplementation(() => 1);
    const result = await bankAccount.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(async () => 20);
    await bankAccount.synchronizeBalance();
    const result = bankAccount.getBalance();
    expect(result).toBe(20);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(async () => null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
