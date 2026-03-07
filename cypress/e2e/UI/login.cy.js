/// <reference types="cypress" />
import { faker } from "@faker-js/faker"
import { userFactory } from "../../support/utils"

describe('login', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.intercept('**/login').as('loginRequest')
    })

    context('E2E', () => {
        const user = userFactory()

        let userId = null

        before(() => {
            cy.log('Cadastrando novo usuário para testes de login')

            cy.apiSignUpUser(user, true).then(res => {
                expect(res.status).to.equal(201, 'Usuário cadastrado com successo')
                userId = res.body._id
            })
        })

        after(() => {
            if (userId) {
                cy.log('Removendo usuário de teste');
                cy.apiDeleteUser(userId).then((res) => {
                    expect(res.status).to.be.equal(200)
                    cy.log(`${res.body.message}: ${userId}`);
                });
            } else {
                cy.log('Nenhum usuário para remover')
            }
        });

        it('should login as a valid user', () => {
            cy.get('[data-testid="email"]').type(user.email)
            cy.get('[data-testid="senha"]').type(user.password, { sensitive: true })

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest')

            cy.contains('Serverest Store').should('be.visible')
        })
    })

    context('UI', () => {
        const user = {
            email: faker.internet.email(),
            password: faker.word.adjective(7)
        }

        it('should not login as a invalid user', () => {

            cy.get('[data-testid="email"]').type(user.email)
            cy.get('[data-testid="senha"]').type(user.password, { log: false })

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                expect(response.body).to.have.property('message', 'Email e/ou senha inválidos')
            })

            cy.get('.alert',).should('contain', 'Email e/ou senha inválidos')
        })

        it('should not login only with email', () => {
            cy.get('[data-testid="email"]').type(user.email)

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                expect(response.body).to.have.property('password', 'password é obrigatório')
            })

            cy.get('.alert').should('contain', 'Password é obrigatório')
        })

        it('should not login only with password', () => {
            cy.get('[data-testid="senha"]').type(user.password, { log: false })

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                expect(response.body).to.have.property('email', 'email é obrigatório')
            })

            cy.get('.alert').should('contain', 'Email é obrigatório')
        })

        it('should show error messages when form is submitted without filling fields', () => {
            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                expect(response.body).to.have.property('email', 'email é obrigatório')
                expect(response.body).to.have.property('password', 'password é obrigatório')
            })

            cy.get('.alert')
                .should('contain', 'Email é obrigatório')
                .and('contain', 'Password é obrigatório')
        })
    })
})