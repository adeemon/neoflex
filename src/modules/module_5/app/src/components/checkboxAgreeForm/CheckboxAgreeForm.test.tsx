import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getRandomNumber, getRandomString } from '../../utils';
import { CheckboxAgreeForm } from './CheckboxAgreeForm';

const randNumber = getRandomNumber(1, 10);

const label = getRandomString(randNumber);
const onSubmitDispatch = () => { };

const CheckboxAgreeFormTest = () =>
  (<CheckboxAgreeForm checkboxTitle={ label } onSubmitDispatch={ onSubmitDispatch } />
  );

test('Checkbox is unchecked by default', async () => {
  render(<CheckboxAgreeFormTest />);
  await act(async () =>
    userEvent.click(await screen.findByText('Send')));
  expect(screen.queryByText('You have to agree')).toBeInTheDocument();
});

test('Checkbox is able to agree on click', async () => {
  render(<CheckboxAgreeFormTest />);
  await act(async () => {
    userEvent.click(await screen.findByRole('checkbox'));
    userEvent.click(await screen.findByText('Send'));
  });
  expect(screen.queryByText('You have to agree')).not.toBeInTheDocument();
});

test('Checkbox is still disabled after double click', async () => {
  render(<CheckboxAgreeFormTest />);
  await act(async () => {
    userEvent.click(await screen.findByRole('checkbox'));
    userEvent.click(await screen.findByRole('checkbox'));
    userEvent.click(await screen.findByText('Send'));
  });
  expect(screen.queryByText('You have to agree')).toBeInTheDocument();
});