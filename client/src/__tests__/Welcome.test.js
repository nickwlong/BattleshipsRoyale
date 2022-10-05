import { render } from '@testing-library/react'
import { Welcome } from '../Welcome'

test('Renders a button', () => {
  render(<Welcome/>)
  const button = document.getElementById('BtnPlayGame')
  expect(button).toBeVisible
})