/// <reference types="cypress" />

import { faker } from "@faker-js/faker"

/**
 * Creates a user object for tests
 * @param {{
 * name?: string,
 * email?: string,
 * password?: string, 
 * isAdmin?: string
 * }} overrides
 */
const userFactory = (overrides = {}) => {
    return {
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.word.adjective(7),
        isAdmin: 'false',
        ...overrides
    }
}

describe('signup', () => {

    beforeEach(() => {
        cy.visit('/cadastrarusuarios')
        cy.intercept('**/usuarios').as('signUpRequest')
    })

    context('E2E', () => {
        let userIds = [] // users created during the test

        after(() => {
            cy.log('Removendo usuários de teste');

            if (userIds.length > 0) {
                userIds.forEach(userId => {
                    cy.apiDeleteUser(userId)
                        .then((res) => {
                            if (res.status === 200) {
                                cy.log(`${res.body.message}: ${userId}`);
                            } else {
                                cy.log('Falha ao remover o usuário:', res.body.message);
                            }
                        });
                })
            } else {
                cy.log('Nenhum usuário para remover')
            }
        });

        it('sginup as a valid user', () => {
            const user = userFactory()

            cy.intercept('**/login').as('loginRequest')

            cy.uiFillAndSubmitSignupForm(user)

            cy.wait('@signUpRequest').then(({ response }) => {
                expect(response.statusCode).to.equal(201)
                expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                expect(response.body).to.have.property('_id')

                // Salvando IDs para deletar os usuários ao finalizar os testes
                userIds = [...userIds, response.body._id]
            })

            cy.wait('@loginRequest')

            cy.contains('Serverest Store', {timeout: 10000}).should('be.visible')
        })

        it('sginup as a valid admin user', () => {
            const user = userFactory({ isAdmin: 'true' })

            cy.intercept('**/login').as('loginRequest')

            cy.uiFillAndSubmitSignupForm(user)

            cy.wait('@signUpRequest').then(({ response }) => {
                expect(response.statusCode).to.equal(201)
                expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
                expect(response.body).to.have.property('_id')

                // Salvando IDs para deletar os usuários ao finalizar os testes
                userIds = [...userIds, response.body._id]
            })

            cy.wait('@loginRequest')

            cy.contains(`Bem Vindo ${user.name}`, {timeout: 10000}).should('be.visible')
            cy.contains('Este é seu sistema para administrar seu ecommerce.')
        })


        it('sginup with a already used email', () => {
            const user = userFactory()

            cy.log('Cadastrando novo usuário para testes de login')

            cy.apiRegisterUser(user)
                .then(res => {
                    expect(res.status).to.equal(201, 'Usuário cadastrado com successo')
                    // Salvando IDs para deletar os usuários ao finalizar os testes
                    userIds = [...userIds, res.body._id]
                })

            cy.uiFillAndSubmitSignupForm(user)

            cy.wait('@signUpRequest').then(({ response }) => {
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property('message', 'Este email já está sendo usado')
                expect(response.body).to.not.have.property('_id')
            })

            cy.get('.alert').should('contain', 'Este email já está sendo usado')
        })
    })

    context('UI', () => {
        const user = userFactory()
        it('register user without name', () => {
            const { email, password, isAdmin } = user

            cy.uiFillAndSubmitSignupForm({ email, password, isAdmin })

            cy.wait('@signUpRequest').then(({ response }) => {
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property('nome', 'nome é obrigatório')
                expect(response.body).to.not.have.property('_id')
            })

            cy.get('.alert').should('contain', 'Nome é obrigatório')
        })

        it('register user without email', () => {
            const { name, password, isAdmin } = user

            cy.uiFillAndSubmitSignupForm({ name, password, isAdmin })

            cy.wait('@signUpRequest').then(({ response }) => {
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property('email', 'email é obrigatório')
                expect(response.body).to.not.have.property('_id')
            })

            cy.get('.alert').should('contain', 'Email é obrigatório')
        })

        it('register user without password', () => {
            const { name, email, isAdmin } = user

            cy.uiFillAndSubmitSignupForm({ name, email, isAdmin })

            cy.wait('@signUpRequest').then(({ response }) => {
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property('password', 'password é obrigatório')
                expect(response.body).to.not.have.property('_id')
            })

            cy.get('.alert').should('contain', 'Password é obrigatório')
        })

        it('click submit button without providing user data', () => {
            cy.get('[data-testid="cadastrar"]').click()

            cy.wait('@signUpRequest').then(({ response }) => {
                expect(response.statusCode).to.equal(400)
                expect(response.body).to.have.property('nome', 'nome é obrigatório')
                expect(response.body).to.have.property('email', 'email é obrigatório')
                expect(response.body).to.have.property('password', 'password é obrigatório')
                expect(response.body).to.not.have.property('_id')
            })

            cy.get('.alert')
                .should('contain', 'Nome é obrigatório')
                .and('contain', 'Email é obrigatório')
                .and('contain', 'Password é obrigatório')
        })
    })
})