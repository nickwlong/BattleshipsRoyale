import { RunGame } from "../RunGame";
import { findByRole, getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';



describe('Square tests', () => {
  test('Renders a grid of squares', () => {
    render(<RunGame />);
    const Player2Intro = screen.getByText("Player 2's Board")
    expect(Player2Intro).toBeVisible
    const grid = document.getElementById('GameContainer2')
    expect(grid).toBeVisible
    const player2square0 = document.getElementById('play2_square_0')
    expect(player1square0).toBeVisible

  });
  test("Clicking on a square changes it's ship status", async () => {
    const user = userEvent.setup()
    render(<RunGame />);

    const player1square0 = document.getElementById('play1_square_0')
    expect(player1square0).toBeVisible

    await user.click(player1square0)

    expect(player1square0).toHaveClass('ship')

    // expect(player1square0).toHaveStyle('background: red')

  });
})