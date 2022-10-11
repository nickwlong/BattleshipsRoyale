/* eslint-disable no-undef */
describe('shoot', () => {
    it('User can shoot at oppontents ', () => {
        // user clicks sp and places ships
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

      //user can fire at opponent
      cy.get('div[id="play2_square_0"]').click()

    })

  
})