/* eslint-disable no-undef */
describe('shoot', () => {
    it('User can shoot at oppontents ', () => {
        // user clicks sp and places ships
      cy.visit('http://localhost:3000/')
      cy.contains('Test').click()
      cy.contains('Destroyer(2)').click()
      cy.get('div[id="play1_square_0"]').click()
      cy.contains('Cruiser(3)').click()
      cy.get('div[id="play1_square_7"]').click()
      cy.contains('Submarine(3)').click()
      cy.get('div[id="play1_square_14"]').click()
      cy.contains('Battleship(4)').click()
      cy.get('div[id="play1_square_21"]').click()
      cy.contains('Ready!').click()

      //user can fire at opponent
      cy.get('div[id="play2_square_0"]').wait(10).click({multiple: true})
      cy.get('div[id="play2_square_1"]').wait(10).click({multiple: true})
      cy.get('div[id="play2_square_2"]').wait(10).click({multiple: true})
      cy.get('div[id="play3_square_0"]').wait(10).click({multiple: true})
      cy.get('div[id="play3_square_1"]').wait(10).click({multiple: true})
      cy.get('div[id="play3_square_2"]').wait(10).click({multiple: true})
 

      //user can see who won
      cy.get('#winnerCard').should('be.visible')
    })

  
})