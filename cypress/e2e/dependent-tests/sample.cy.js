describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com')

    cy.get('.navbar-nav a:contains(Login)').click()

    cy.get('#email').type(Cypress.env('user_email'))
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click()
    
    cy.contains('h1', 'Your Notes', {timeout: 10000}).should('be.visible')
  })

  it('CRUDs a note', () => {
    cy.contains('Create a new note').click()

    cy.get('#content').type('My note')
    cy.contains('Create').click()

    cy.get('.list-group').should('contain', 'My note')
  
    cy.get('.list-group').contains('My note').click()
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible')
  
    cy.get('.list-group').contains('My note updated').click()
    cy.contains('Delete').click()

    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })
})
