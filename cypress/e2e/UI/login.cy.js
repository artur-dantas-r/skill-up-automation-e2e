/// <reference types="cypress" />
import { faker } from "@faker-js/faker"

describe('login', () => {
    const apiUrl = Cypress.env('api_url')

    beforeEach(() => {
        cy.visit('/')
        cy.intercept('**/login').as('loginRequest')
    })

    context('E2E', () => {
        const username = faker.internet.username()
        const userEmail = faker.internet.email()
        const userPassword = faker.word.adjective(7)
        let userId = null

        before(() => {
            cy.log('Cadastrando novo usuário para testes de login')

            cy.request({
                method: 'POST',
                url: `${apiUrl}/usuarios`,
                failOnStatusCode: false,
                body: {
                    nome: username,
                    email: userEmail,
                    password: userPassword,
                    administrador: "false"
                }
            }).then(res => {
                if (res.status === 201) {
                    userId = res.body._id

                    return cy.log('Usuário cadastrado com sucesso')
                }
                return cy.log(res.body.message)
            })
        })

        after(() => {
            if (userId) {
                cy.log('Removendo usuário de teste');
                cy.request({
                    method: 'DELETE',
                    url: `${apiUrl}/usuarios/${userId}`,
                    failOnStatusCode: false,
                }).then((res) => {
                    if (res.status === 200) {
                        cy.log(res.body.message);
                    } else {
                        cy.log('Falha ao remover o usuário:', res.body.message);
                    }
                });
            } else {
                cy.log('Nenhum usuário para remover')
            }
        });

        it('login as a valid user', () => {
            cy.get('[data-testid="email"]').type(userEmail)
            cy.get('[data-testid="senha"]').type(userPassword, { log: false })

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest')

            cy.contains('Serverest Store').should('be.visible')
        })
    })

    context('UI', () => {
        const userEmail = faker.internet.email()
        const userPassword = faker.word.adjective(7)

        it('login as a invalid user', () => {

            cy.get('[data-testid="email"]').type(userEmail)
            cy.get('[data-testid="senha"]').type(userPassword, { log: false })

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                cy.wrap(response.body.message).should('equal', 'Email e/ou senha inválidos')
            })

            cy.get('.alert').should('contain', 'Email e/ou senha inválidos')
        })

        it('login only with email', () => {
            cy.get('[data-testid="email"]').type(userEmail)

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                cy.wrap(response.body.password).should('equal', 'password é obrigatório')
            })

            cy.get('.form > :nth-child(3)').should('contain', 'Password é obrigatório')
        })

        it('login only with password', () => {
            cy.get('[data-testid="senha"]').type(userPassword, { log: false })

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                cy.wrap(response.body.email).should('equal', 'email é obrigatório')
            })

            cy.get('.form > :nth-child(3)').should('contain', 'Email é obrigatório')
        })

        it('login with empty fields', () => {
            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                cy.wrap(response.body.email).should('equal', 'email é obrigatório')
                cy.wrap(response.body.password).should('equal', 'password é obrigatório')
            })

            cy.get('.form > :nth-child(3)').should('contain', 'Email é obrigatório')
            cy.get('.form > :nth-child(4)').should('contain', 'Password é obrigatório')
        })
    })
})