import { fireEvent, render, screen } from '@testing-library/react';

import { getRandomString } from '../../utils';
import { Input, InputProps } from './Input';

const defaultTextProps: InputProps = {
  name: getRandomString(10),
  value: getRandomString(3),
  label: getRandomString(5),
  placeholder: getRandomString(5),
  type: 'text',
  errorMessage: getRandomString(5),
};

test('Input form value displays correct', () => {
  const { getByLabelText } = render(<Input {...defaultTextProps} />);
  const input = getByLabelText(defaultTextProps.name) as HTMLInputElement;
  expect(input.value).toBe(defaultTextProps.value);
});

test('Input is able to change value', () => {
  const { getByLabelText } = render(<Input {...defaultTextProps} />);
  const input = getByLabelText(defaultTextProps.name) as HTMLInputElement;
  const newValue = getRandomString(4);
  fireEvent.change(input, { target: { value: newValue } });
  expect(input.value).toBe(newValue);
});

test('Error message is shown when incorrect and validated', () => {
  render(<Input {...defaultTextProps} isValidated isInvalid />);
  expect(screen.queryByText(`${defaultTextProps.errorMessage}`)).toBeInTheDocument();
});