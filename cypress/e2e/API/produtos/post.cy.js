import { productFactory } from '../../../support/utils'

describe('POST /produtos', () => {
  let token

  before(() => {
    cy.apiLogin({ email: 'fulano@qa.com', password: 'teste' }).then(({ body }) => {
      token = body.authorization
    })
  })

  context('Cadastrar produto', () => {
    it('Should create new product successfully (as admin)', () => {
      const novoProduto = productFactory()

      cy.apiCreateProduct(novoProduto, token).then(({ status, body }) => {
        expect(status).to.equal(201)
        expect(body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(body).to.have.property('_id')
      })
    })

    it('Should return error 400 when creating with duplicate name', () => {
      const produtoDuplicado = productFactory({ nome: 'Logitech MX Vertical' })

      cy.apiCreateProduct(produtoDuplicado, token).then(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body).to.have.property('message')
        expect(body.message).to.include('Já existe produto com esse nome')
      })
    })

    it('Should return error 401 when creating without token', () => {
      const novoProduto = productFactory()

      cy.api({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/produtos`,
        body: novoProduto,
        failOnStatusCode: false
      }).then(({ status, body }) => {
        expect(status).to.equal(401)
        expect(body).to.have.property('message')
      })
    })

    it('Should return error 400 when price is empty', () => {
      const produtoInvalido = productFactory({ preco: '' })

      cy.apiCreateProduct(produtoInvalido, token).then(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body).to.have.property('preco')
      })
    })
  })
})