/// <reference types="cypress" />

import { faker } from "@faker-js/faker"

describe('signup', () => {
    beforeEach(() => {
        cy.visit('/cadastrarusuarios')
        cy.intercept('**/usuarios').as('signUpRequest')
    })

    context('E2E', () => {
        const user = {
            name: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.word.adjective(7),
            isAdmin: 'false'
        }
        let userIds = []


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
            cy.intercept('**/login').as('loginRequest')

            cy.uiFillAndSubmitSignupForm(user)

            cy.wait('@signUpRequest').then(({ response }) => {
                cy.wrap(response.statusCode).should('equal', 201)
                cy.wrap(response.body.message).should('equal', 'Cadastro realizado com sucesso')
                cy.wrap(response.body._id).should('exist')

                // Salvando IDs para deletar os usuários ao finalizar os testes
                userIds = [...userIds, response.body._id]
            })

            cy.wait('@loginRequest')

            cy.contains('Serverest Store').should('be.visible')
        })

        it.only('sginup with a already used email', () => {
            const user = {
                name: faker.internet.username(),
                email: faker.internet.email(),
                password: faker.word.adjective(7),
                isAdmin: 'false'
            }

            cy.log('Cadastrando novo usuário para testes de login')

            cy.apiRegisterUser(user)
                .then(res => {
                    if (res.status === 201) {
                        // Salvando IDs para deletar os usuários ao finalizar os testes
                        userIds = [...userIds, res.body._id]

                        return cy.log('Usuário cadastrado com sucesso')
                    }
                    return cy.log(res.body.message)
                })

            cy.uiFillAndSubmitSignupForm(user)

            cy.wait('@signUpRequest').then(({ response }) => {
                cy.wrap(response.statusCode).should('equal', 400)
                cy.wrap(response.body.message).should('equal', 'Este email já está sendo usado')
                cy.wrap(response.body._id).should('not.exist')
            })

            cy.get('.alert').should('contain', 'Este email já está sendo usado')
        })

    })
})