/* eslint-disable no-undef */

 describe('Multiplayer room', () => {
    it('User can create Multiplayer room and set username', () => {
       cy.visit('http://localhost:3000/')
       cy.contains('Multiplayer Game').click()
       cy.get('input[id="roomIdinput"]').type("123")
       cy.contains("Submit Room ID").click()
    })
  
  })