// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
    'uiFillAndSubmitSignupForm',
    ({ name, email, password, isAdmin = 'false' }) => {
        if (name) {
            cy.get('[data-testid="nome"]').type(name)
        }

        if (email) {
            cy.get('[data-testid="email"]').type(email)
        }

        if (password) {
            cy.get('[data-testid="password"]').type(password, { log: false })
        }

        if (isAdmin === 'true') {
            cy.get('[data-testid="checkbox"]').check()
        }

        cy.get('[data-testid="cadastrar"]').click()
    }
)