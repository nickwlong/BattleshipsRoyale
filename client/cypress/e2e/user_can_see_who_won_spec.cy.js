/* eslint-disable no-undef */
describe('shoot', () => {
    it('User can shoot at oppontents ', () => {
        // user clicks sp and places ships
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
      cy.contains('Ready!').click()

      //user can fire at opponent
      cy.get('div[id="play2_square_8"]').wait(2001).click({multiple: true})
      cy.get('div[id="play2_square_9"]').wait(2001).click({multiple: true})
      cy.get('div[id="play2_square_10"]').wait(2001).click({multiple: true})
      cy.get('div[id="play2_square_15"]').wait(2001).click({multiple: true})
      cy.get('div[id="play2_square_12"]').wait(2001).click({multiple: true})
      cy.get('div[id="play2_square_2"]').wait(2001).click({multiple: true})
      cy.get('div[id="play2_square_5"]').wait(2001).click({multiple: true})
      cy.get('div[id="play2_square_3"]').wait(2001).click({multiple: true})
      cy.get('div[id="play2_square_20"]').wait(2001).click({multiple: true})

      //user can see who won
      cy.contains('Winner is Player')
    })

  
})