import { render, screen } from '@testing-library/react';

import { Spinner } from './Spinner';

const Child = () =>
  (<div>Test</div>);

test('Spinner shows loader on loading', () => {
  render(<Spinner isLoading><Child /></Spinner>);
  expect(screen.queryByText('Test')).not.toBeInTheDocument();
});

test('Spinner doesn\t shows spinner on loaded', () => {
  render(<Spinner isLoading={ false }><Child /></Spinner>);
  expect(screen.queryByAltText('spinner')).not.toBeInTheDocument();
});

test('Spinner shows child on loaded', () => {
  render(<Spinner isLoading><Child /></Spinner>);
  expect(screen.queryByText('Test')).not.toBeInTheDocument();
  render(<Spinner isLoading={ false }><Child /></Spinner>);
  expect(screen.queryByText('Test')).toBeInTheDocument();
});
