import { RunGame } from "../SinglePlayer/RunGame";
import { findByRole, getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';



describe('Square tests', () => {
  test('Renders a grid of squares', () => {
    render(<RunGame />);
    const Player1Intro = screen.getByText('Your Board')
    expect(Player1Intro).toBeVisible
    const grid = document.getElementById('GameContainer')
    expect(grid).toBeVisible
    const player1square0 = document.getElementById('play1_square_0')
    expect(player1square0).toBeVisible

  });
  test("Clicking on a square changes it's ship status", async () => {
    const user = userEvent.setup()
    render(<RunGame />);

    const player1square0 = document.getElementById('play1_square_0')
    expect(player1square0).toBeVisible

    const shipBtn = document.getElementById('Ship1')

    await user.click(shipBtn)
    await user.click(player1square0)


    expect(player1square0).toHaveClass('ship')

    // expect(player1square0).toHaveStyle('background: red')

  });
})