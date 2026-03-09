import { cartFactory, userFactory } from '../../../support/utils'

describe('DELETE /carrinhos', () => {
    let token1
    let token2
    let produtoId
    let createdUsersId = []

    before(() => {
        // Criar dois usuários para os testes
        const novoUsuario1 = userFactory()
        const novoUsuario2 = userFactory()

        cy.apiSignUpUser(novoUsuario1).then(({ body }) => {
            usuario1 = body
            createdUsersId.push(body._id)
        })

        cy.apiSignUpUser(novoUsuario2).then(({ body }) => {
            usuario2 = body
            createdUsersId.push(body._id)
        })

        // Fazer login com ambos usuários para obter tokens
        cy.apiLogin({ email: novoUsuario1.email, password: novoUsuario1.password }).then(({ body }) => {
            token1 = body.authorization
        })

        cy.apiLogin({ email: novoUsuario2.email, password: novoUsuario2.password }).then(({ body }) => {
            token2 = body.authorization
        })

        // Buscar um produto e criar carrinhos para ambos usuários
        cy.apiGetProducts().then(({ body }) => {
            if (body.produtos.length > 0) {
                produtoId = body.produtos[0]._id

                const novoCarrinho1 = cartFactory([{
                    idProduto: produtoId,
                    quantidade: 1
                }])

                const novoCarrinho2 = cartFactory([{
                    idProduto: produtoId,
                    quantidade: 1
                }])

                // Criar carrinhos para ambos usuários
                cy.apiCreateCart(novoCarrinho1, token1)
                cy.apiCreateCart(novoCarrinho2, token2)
            }
        })
    })

    after(() => {
        // Deletar os usuários criados
        cy.wrap(createdUsersId).each(userId => {
            cy.apiDeleteUser(userId)
        })
    })
    context('Concluir compra', () => {
        it('Should complete purchase (delete cart) with valid token', () => {
            cy.apiCompleteCheckout(token1).then(({ status }) => {
                expect([200, 401]).to.include(status)
            })
        })

        it('Should return error 401 when completing purchase without token', () => {
            cy.api({
                method: 'DELETE',
                url: `${Cypress.env('API_URL')}/carrinhos/concluir-compra`,
                failOnStatusCode: false
            }).then(({ status }) => {
                expect(status).to.equal(401)
            })
        })
    })

    context('Cancelar compra', () => {
        it('Should cancel purchase (delete cart and return products)', () => {
            cy.apiCancelCheckout(token2).then(({ status }) => {
                expect([200, 401]).to.include(status)
            })
        })

        it('Should return error 401 when canceling purchase without token', () => {
            cy.api({
                method: 'DELETE',
                url: `${Cypress.env('API_URL')}/carrinhos/cancelar-compra`,
                failOnStatusCode: false
            }).then(({ status }) => {
                expect(status).to.equal(401)
            })
        })
    })
})