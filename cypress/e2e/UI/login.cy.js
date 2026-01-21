/// <reference types="cypress" />
import { faker } from "@faker-js/faker"

describe('login', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.intercept('**/login').as('loginRequest')
    })

    context('E2E', () => {
        const user = {
            name: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.word.adjective(7),
            isAdmin: 'false'
        }

        let userId = null

        before(() => {
            cy.log('Cadastrando novo usuário para testes de login')

            cy.apiRegisterUser(user).then(res => {
                expect(res.status).to.equal(201, 'Usuário cadastrado com successo')
                userId = res.body._id
            })
        })

        after(() => {
            if (userId) {
                cy.log('Removendo usuário de teste');
                cy.apiDeleteUser(userId).then((res) => {
                    if (res.status === 200) {
                        cy.log(`${res.body.message}: ${userId}`);
                    } else {
                        cy.log('Falha ao remover o usuário:', res.body.message);
                    }
                });
            } else {
                cy.log('Nenhum usuário para remover')
            }
        });

        it('login as a valid user', () => {
            cy.get('[data-testid="email"]').type(user.email)
            cy.get('[data-testid="senha"]').type(user.password, { log: false })

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

        it('login as a invalid user', () => {

            cy.get('[data-testid="email"]').type(user.email)
            cy.get('[data-testid="senha"]').type(user.password, { log: false })

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                expect(response.body.message).to.equal('Email e/ou senha inválidos')
            })

            cy.get('.alert').should('contain', 'Email e/ou senha inválidos')
        })

        it('login only with email', () => {
            cy.get('[data-testid="email"]').type(user.email)

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                expect(response.body.password).to.equal('password é obrigatório')
            })

            cy.get('.form > :nth-child(3)').should('contain', 'Password é obrigatório')
        })

        it('login only with password', () => {
            cy.get('[data-testid="senha"]').type(user.password, { log: false })

            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                expect(response.body.email).to.equal('email é obrigatório')
            })

            cy.get('.form > :nth-child(3)').should('contain', 'Email é obrigatório')
        })

        it('login with empty fields', () => {
            cy.get('[data-testid="entrar"]').click()

            cy.wait('@loginRequest').then(({ response }) => {
                expect(response.body.email).to.equal('email é obrigatório')
                expect(response.body.password).to.equal('password é obrigatório')
            })

            cy.get('.form > :nth-child(3)').should('contain', 'Email é obrigatório')
            cy.get('.form > :nth-child(4)').should('contain', 'Password é obrigatório')
        })
    })
})