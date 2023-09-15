import { render, screen } from '@testing-library/react';
import { ExchangeNote } from './ExchangeNote';

const goodCurrencyName = 'RUB';
const badCurrencyName = 'R';

test('Exchange note displays default value', () => {
  const testValue = 123456;
  render(<ExchangeNote currencyName={ badCurrencyName } defaultValue={ testValue } />);
  expect(screen.getByText(testValue)).toBeInTheDocument();
});

test('Exchange note displays fetched value', async () => {
  const testRate = 654321;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () =>
        Promise.resolve({ testRate }),
      text: () =>
      Promise.resolve(testRate),
    })) as jest.Mock;
  const testValue = 123456;
  render(<ExchangeNote currencyName={ goodCurrencyName } defaultValue={ testValue } />);
  expect(await screen.findByText(testRate)).toBeInTheDocument();
});

test('Exchange note isn\t display default value on correct fetch', async () => {
  const testRate = 123456;
  const testValue = 654321;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () =>
        Promise.resolve({ testRate }),
      text: () =>
      Promise.resolve(testRate),
    })) as jest.Mock;
  render(<ExchangeNote currencyName={ goodCurrencyName } defaultValue={ testValue } />);
  expect(await screen.findByText(testRate)).toBeInTheDocument();
  expect((await screen.findByText(testRate)).innerText).not.toEqual(`${testValue}`);
});
