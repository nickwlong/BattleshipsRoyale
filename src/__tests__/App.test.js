import { findByRole, getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Welcome } from '../Welcome';
import { RunGame } from '../RunGame'

test('renders learn react link', () => {
  render(<App />);
  const playButton = screen.getByText('Click here to play the game!')
  expect(playButton).toBeVisible
});

test('Renders PlayGame when the Welcome button is clicked', async () => {

  const user = userEvent.setup()

  render(<App />)

  await user.click(screen.getByRole('button'))

  const Player1Intro = screen.getByText('Your Board')
  expect(Player1Intro).toBeVisible

})

