import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getRandomNumber, getRandomString } from '../../utils';
import { HowerTooltip } from './HowerTooltip';

const randNumber = getRandomNumber(1, 10);

const label = getRandomString(randNumber);

const HowerTooltipTest = () =>
  (
    <HowerTooltip description={ label }>
      <p>Test</p>
    </HowerTooltip>
  );

test('Hower tooltip isn\'t displayed by default', async () => {
  render(<HowerTooltipTest />);
  expect(screen.queryByText(label)).not.toBeInTheDocument();
});

test('Hower tooltip is displayed on hover', async () => {
  render(<HowerTooltipTest />);
  await act(async () => {
    await userEvent.hover(screen.getByText('Test'));
  });
  expect(screen.queryByText(label)).toBeInTheDocument();
});

test('Hower tooltip isn\'t displayed after hover', async () => {
  render(<HowerTooltipTest />);
  await act(async () => {
    await userEvent.hover(screen.getByText('Test'));
    await userEvent.unhover(screen.getByText('Test'));
  });
  expect(screen.queryByText(label)).not.toBeInTheDocument();
});