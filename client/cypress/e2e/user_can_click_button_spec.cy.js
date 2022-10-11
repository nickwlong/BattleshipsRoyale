/* eslint-disable no-undef */
describe('Single player and multiplayer', () => {
  it('User can click Singleplayer button ', () => {
    // user clicks sp button
    cy.visit('http://localhost:3000/')
    cy.contains('Singleplayer Game').click()
  })
  it('User can click Multiplayer button ', () => {
    // user clicks mp button
    cy.visit('http://localhost:3000/')
    cy.contains('Multiplayer Game').click()
    cy.contains('Submit Room ID')
  })
})