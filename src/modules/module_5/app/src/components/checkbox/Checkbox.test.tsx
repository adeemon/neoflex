import { getRandomNumber, getRandomString } from '../../utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';

const randNumber = getRandomNumber(1, 10);

const name = getRandomString(randNumber);
const label = getRandomString(randNumber);
const errorMessage = getRandomString(randNumber);
const id = getRandomString(randNumber);
const onChange = () => { };

const CheckboxTest = () => (<Checkbox name={name} label={label} errorMessage={errorMessage} id={id} onChange={onChange} />)
const CheckboxWithoutErrorTest = () => (<Checkbox name={name} label={label} id={id} onChange={onChange} />)

test('Checkbox is displayed with the correct props', async () => {
  render(<CheckboxTest />);
  expect(screen.getByText(label)).toBeInTheDocument();
});

test('Checkox error is displayed if exists', async () => {
  render(<CheckboxTest />);
  expect(screen.queryByText(errorMessage)).toBeInTheDocument();
});

test('Checkox error isn\'t displayed if not exists', async () => {
  render(<CheckboxWithoutErrorTest />);
  expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
});

