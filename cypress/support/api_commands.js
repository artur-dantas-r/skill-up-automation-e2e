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
const apiUrl = Cypress.env('api_url')

/**
 * Registers a user via API.
 * @param {{ name: string, email: string, password: string, isAdmin: string }} user - The user details.
 * @returns {Cypress.Chainable<Cypress.Response<any>>} The Cypress request chainable.
 */
Cypress.Commands.add('apiRegisterUser', ({ name = 'coisado', email = 'teste@gmail.com', password = 'supersenha', isAdmin = 'false' }) => {
    return cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        failOnStatusCode: false,
        body: {
            nome: name,
            email: email,
            password: password,
            administrador: isAdmin
        }
    })
})

/**
 * Registers a user via API.
 * @param {string} userId - The ID of the user
 * @returns {Cypress.Chainable<Cypress.Response<any>>} The Cypress request chainable.
 */
Cypress.Commands.add('apiDeleteUser', (userId) => {
    return cy.request({
        method: 'DELETE',
        url: `${apiUrl}/usuarios/${userId}`,
        failOnStatusCode: false
    })
})



