/* eslint-disable no-undef */
describe('Ships', () => {
    it('User can select ships and place on board ', () => {
      cy.visit('http://localhost:3000/')
      cy.contains('Singleplayer Game').click()
      cy.contains('TugBoat(1)').click()
      cy.get('div[id="play1_square_0"]').click()
      cy.contains('Destroyer(2)').click()
      cy.get('div[id="play1_square_4"]').click()
      cy.contains('Cruiser(3)').click()
      cy.get('div[id="play1_square_8"]').click()
      cy.contains('Battleship(4)').click()
      cy.get('div[id="play1_square_12"]').click()
      cy.contains('Ready!').click()
    })
})