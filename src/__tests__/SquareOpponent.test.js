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
    expect(player2square0).toBeVisible

  });
  test("Clicking on an opponent's square changes it's hit status", async () => {
    const user = userEvent.setup()
    render(<RunGame />);

    const player2square1 = document.getElementById('play2_square_1')
    expect(player2square1).toBeVisible

    await user.click(player2square1)

    expect(player2square1).toHaveClass('miss')

    // expect(player1square0).toHaveStyle('background: red')

  });
})