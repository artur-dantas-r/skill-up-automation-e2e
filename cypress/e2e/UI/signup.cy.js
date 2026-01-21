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
            cy.intercept('**/login').as('loginRequest')

            cy.uiFillAndSubmitSignupForm(user)

            cy.wait('@signUpRequest').then(({ response }) => {
                expect(response.statusCode).to.equal(201)
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
                expect(response.body._id).to.exist

                // Salvando IDs para deletar os usuários ao finalizar os testes
                userIds = [...userIds, response.body._id]
            })

            cy.wait('@loginRequest')

            cy.contains('Serverest Store').should('be.visible')
        })

        it('sginup with a already used email', () => {
            const user = {
                name: faker.internet.username(),
                email: faker.internet.email(),
                password: faker.word.adjective(7),
                isAdmin: 'false'
            }

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
                expect(response.body.message).to.equal('Este email já está sendo usado')
                expect(response.body._id).to.not.exist
            })

            cy.get('.alert').should('contain', 'Este email já está sendo usado')
        })

    })
})