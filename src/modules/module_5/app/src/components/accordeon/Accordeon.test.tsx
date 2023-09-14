import { getRandomNumber, getRandomString } from '../../utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accorderon } from './Accordeon';

const summary = getRandomString(getRandomNumber(1, 100));
const content = getRandomString(getRandomNumber(1, 100));


test('Accordeon element is rendered with correct props', async () => {
  render(<Accorderon summary={summary} content={content} />);
  expect(screen.getByText<HTMLElement>(summary)).toBeInTheDocument();
});

test('Accordeon element is collapsed by default', async () => {
  render(<Accorderon summary={summary} content={content} />);
  expect(screen.queryByText<HTMLElement>(content)).not.toBeInTheDocument();
});

test('Accordeon element expanded by click ', async () => {
  render(<Accorderon summary={summary} content={content} />);
  userEvent.click(screen.getByText<HTMLElement>(summary));
  expect(screen.queryByText<HTMLElement>(content)).toBeInTheDocument();
})