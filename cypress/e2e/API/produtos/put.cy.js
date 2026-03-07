import { productFactory } from '../../../support/utils'

describe('PUT /produtos/:id', () => {
    let token
    let produtoId

    before(() => {
        cy.apiLogin({ email: 'fulano@qa.com', password: 'teste' }).then(({ body }) => {
            token = body.authorization
            
            const novoProduto = productFactory()
    
            cy.apiCreateProduct(novoProduto, token).then(({ body }) => {
                produtoId = body._id
            })
        })
    })

    context('Editar produto', () => {
        it('Should edit existing product (as admin)', () => {
            const produtoAtualizado = productFactory()

            cy.apiUpdateProduct(produtoId, produtoAtualizado, token).then(({ status }) => {
                expect([200, 201]).to.include(status)
            })
        })

        it('Should return error 400 when editing with duplicate name', () => {
            const produtoComNomeDuplicado = productFactory({ nome: 'Logitech MX Vertical' })

            if (produtoId) {
                cy.apiUpdateProduct(produtoId, produtoComNomeDuplicado, token).then(({ status, body }) => {
                    expect(status).to.equal(400)
                    expect(body).to.have.property('message')
                })
            }
        })

        it('Should return error 401 when editing without token', () => {
            const produtoAtualizado = productFactory()

            if (produtoId) {
                cy.api({
                    method: 'PUT',
                    url: `${Cypress.env('API_URL')}/produtos/${produtoId}`,
                    body: produtoAtualizado,
                    failOnStatusCode: false
                }).then(({ status }) => {
                    expect(status).to.equal(401)
                })
            }
        })
    })
})