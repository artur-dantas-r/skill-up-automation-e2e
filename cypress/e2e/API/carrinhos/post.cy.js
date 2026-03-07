import { cartFactory, userFactory } from '../../../support/utils'

describe('POST /carrinhos', () => {
  let usuario
  let token
  let produtoId

  before(() => {
    // Criar usuário para os testes
    const novoUsuario = userFactory()

    cy.apiSignUpUser(novoUsuario).then(({ body }) => {
      usuario = body
    })

    // Fazer login para obter token
    cy.apiLogin({ email: novoUsuario.email, password: novoUsuario.password }).then(({ body }) => {
      token = body.authorization
    })

    // Buscar um produto para usar nos testes
    cy.apiGetProducts().then(({ body }) => {
      expect(body.produtos.length).to.be.greaterThan(0, 'Deve haver pelo menos um produto disponível')
      produtoId = body.produtos[0]._id
    })
  })

  after(() => {
    // Deletar o usuário criado
    cy.apiDeleteUser(usuario._id)
  })

  context('Cadastrar carrinho', () => {
    it('Should create new cart successfully', () => {
      const novoCarrinho = cartFactory([
        {
          idProduto: produtoId,
          quantidade: 2
        }
      ])

      cy.apiCreateCart(novoCarrinho, token).then(({ status }) => {
        expect([201, 400]).to.include(status)
      })
    })

    it('Should return error 400 when creating without token', () => {
      const novoCarrinho = cartFactory([
        {
          idProduto: produtoId,
          quantidade: 1
        }
      ])

      cy.api({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/carrinhos`,
        body: novoCarrinho,
        failOnStatusCode: false
      }).then(({ status }) => {
        expect(status).to.equal(401)
      })
    })

    it('Should return error 400 when creating cart with invalid product', () => {
      const carrinhoInvalido = cartFactory([
        {
          idProduto: 'idProdutoInvalido',
          quantidade: 1
        }
      ])

      cy.apiCreateCart(carrinhoInvalido, token).then(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body).to.have.property('message')
      })
    })
  })
})