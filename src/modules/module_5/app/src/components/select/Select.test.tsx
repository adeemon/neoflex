import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getRandomString } from '../../utils';
import { Select } from './Select';

const values = [getRandomString(5), getRandomString(5), getRandomString(5)];

test('Select shows options on expand', () => {
  render(<Select values={values} />);
  userEvent.click(screen.getByText(values[0]));
  expect(screen.getByText(values[1])).toBeInTheDocument();
});

test('Select shows error message', () => {
  render(<Select values={values} isInvalid errorMessage="Error" />);
  expect(screen.getByText('Error')).toBeInTheDocument();
});

test('Select error message isn\'t displayed on correct', () => {
  render(<Select values={values} errorMessage="Error" />);
  expect(screen.queryByText('Error')).not.toBeInTheDocument();
});