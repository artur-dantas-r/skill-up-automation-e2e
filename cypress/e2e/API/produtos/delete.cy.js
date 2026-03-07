import { productFactory } from '../../../support/utils'

describe('DELETE /produtos/:id', () => {
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

    context('Excluir produto', () => {
        it('Should delete existing product (as admin)', () => {
            if (produtoId) {
                cy.apiDeleteProduct(produtoId, token).then(({ status, body }) => {
                    expect(status).to.equal(200)
                    expect(body).to.have.property('message')
                })
            }
        })

        it('Should return error 401 when deleting without token', () => {
            cy.apiGetProducts().then(({ body }) => {
                if (body.produtos.length > 0) {
                    const idProduto = body.produtos[0]._id

                    cy.api({
                        method: 'DELETE',
                        url: `${Cypress.env('API_URL')}/produtos/${idProduto}`,
                        failOnStatusCode: false
                    }).then(({ status }) => {
                        expect(status).to.equal(401)
                    })
                }
            })
        })

        it('Should return error 400 when deleting non-existent product', () => {
            cy.apiDeleteProduct('idInvalido', token).then(({ status }) => {
                expect(status).to.equal(400)
            })
        })
    })
})