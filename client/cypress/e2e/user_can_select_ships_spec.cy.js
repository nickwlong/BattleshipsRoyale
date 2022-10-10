/* eslint-disable no-undef */
describe('Ships', () => {
    it('User can select ships and place on board ', () => {
      cy.visit('http://localhost:3000/')
      cy.contains('Singleplayer Game').click()
      cy.contains('TugBoat(1)').click()
    //   cy.contains('#play1_square_0').click()
      cy.get('div[id="#play1_square_0"]').click()
    })
})