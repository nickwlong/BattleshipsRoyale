/* eslint-disable no-undef */
describe('Ships', () => {
    it('User can select ships and place on board ', () => {
      // user selects ships 
      cy.visit('http://localhost:3000/')
      cy.contains('Singleplayer Game').click()
      cy.contains('Destroyer(2)').click()
      cy.get('div[id="play1_square_0"]').click()
      cy.contains('Cruiser(3)').click()
      cy.get('div[id="play1_square_7"]').click()
      cy.contains('Submarine(3)').click()
      cy.get('div[id="play1_square_14"]').click()
      cy.contains('Battleship(4)').click()
      cy.get('div[id="play1_square_21"]').click()

      // user can Reset all ships placed
      cy.visit('http://localhost:3000/')
      cy.contains('Singleplayer Game').click()
      cy.contains('Destroyer(2)').click()
      cy.get('div[id="play1_square_0"]').click()
      cy.contains('Cruiser(3)').click()
      cy.get('div[id="play1_square_7"]').click()
      cy.contains('Submarine(3)').click()
      cy.get('div[id="play1_square_14"]').click()
      cy.contains('Battleship(4)').click()
      cy.get('div[id="play1_square_21"]').click()
      cy.contains('Reset all ship places').click()

    })
})