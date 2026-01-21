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

Cypress.Commands.add('apiDeleteUser', (userId) => {
    return cy.request({
        method: 'DELETE',
        url: `${apiUrl}/usuarios/${userId}`,
        failOnStatusCode: false
    })
})