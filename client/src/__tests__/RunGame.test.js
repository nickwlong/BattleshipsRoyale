import { RunGame } from '../RunGame';
import App from '../App'
import { findByRole, getByText, render, screen } from '@testing-library/react';


describe('RunGame', () => {

  test('Renders a grid of squares', () => {
    render(<RunGame />);
    const Player1Intro = screen.getByText('Your Board')
    expect(Player1Intro).toBeVisible
    const grid = document.getElementById('GameContainer')
    expect(grid).toBeVisible
  });
  test('Renders a grid of squares for opponent', () => {
    render(<RunGame />);
    const Player2Intro = screen.getByText("Player 2's Board")
    expect(Player2Intro).toBeVisible
    const grid = document.getElementById('GameContainer2')
    expect(grid).toBeVisible
  })
  test('Individual squares are produced for player 1', () => {

    const Player1Square0 = document.getElementById('play1_square_0')
    expect(Player1Square0).toBeVisible
    const Player1Square4 = document.getElementById('play1_square_4')
    expect(Player1Square4).toBeVisible
  })


})

