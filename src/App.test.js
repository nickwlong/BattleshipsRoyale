import { findByRole, getByText, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const playButton = screen.getByText('Click here to play the game!')
  expect(playButton).toBeVisible
});
