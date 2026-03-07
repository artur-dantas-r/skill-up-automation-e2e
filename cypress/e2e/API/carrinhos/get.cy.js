import { userFactory, cartFactory } from '../../../support/utils'

describe('GET /carrinhos', () => {
  let usuario1
  let usuario2
  let token1
  let token2
  let produtoId

  before(() => {
    // Criar dois usuários para os testes
    const novoUsuario1 = userFactory()
    const novoUsuario2 = userFactory()

    cy.apiSignUpUser(novoUsuario1).then(({ body }) => {
      usuario1 = body
    })

    cy.apiSignUpUser(novoUsuario2).then(({ body }) => {
      usuario2 = body
    })

    // Fazer login com ambos para obter tokens
    cy.apiLogin({ email: novoUsuario1.email, password: novoUsuario1.password }).then(({ body }) => {
      token1 = body.authorization
    })

    cy.apiLogin({ email: novoUsuario2.email, password: novoUsuario2.password }).then(({ body }) => {
      token2 = body.authorization
    })

    // Buscar um produto para usar nos testes
    cy.apiGetProducts().then(({ body }) => {
      expect(body.produtos.length).to.be.greaterThan(0, 'Deve haver pelo menos um produto disponível')
      produtoId = body.produtos[0]._id

      // Criar carrinhos para ambos usuários
      const novoCarrinho = cartFactory([
        {
          idProduto: produtoId,
          quantidade: 1
        }
      ])

      cy.apiCreateCart(novoCarrinho, token1)
      cy.apiCreateCart(novoCarrinho, token2)
    })
  })

  after(() => {
    // Deletar os usuários criados
    cy.apiDeleteUser(usuario1._id)
    cy.apiDeleteUser(usuario2._id)
  })

  context('Listar carrinhos', () => {
    it('Should list all carts successfully', () => {
      cy.apiGetCarts().then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('quantidade')
        expect(body).to.have.property('carrinhos')
        expect(body.carrinhos).to.be.an('array')
      })
    })

    it('Should list carts filtering by userId', () => {
      cy.apiGetCarts({ idUsuario: usuario1._id }).then(({ status, body: cartBody }) => {
        expect(status).to.equal(200)
        expect(cartBody).to.have.property('carrinhos')
      })
    })
  })

  context('/:id', () => {
    it('Should fetch cart by ID successfully', () => {
      cy.apiGetCarts({ idUsuario: usuario1._id }).then(({ body }) => {
        expect(body.carrinhos.length).to.be.greaterThan(0, 'Usuario1 deve ter pelo menos um carrinho')
        const carrinhoId = body.carrinhos[0]._id
        
        cy.apiGetCartById(carrinhoId).then(({ status, body: cartBody }) => {
          expect(status).to.equal(200)
          expect(cartBody).to.have.property('_id', carrinhoId)
          expect(cartBody).to.have.property('produtos')
          expect(cartBody).to.have.property('precoTotal')
          expect(cartBody).to.have.property('quantidadeTotal')
          expect(cartBody).to.have.property('idUsuario')
        })
      })
    })

    it('Should return error 400 when fetching cart with invalid ID', () => {
      cy.apiGetCartById('BeeJh5lz3k8kSIzA').then(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body).to.have.property('message')
        expect(body.message).to.equal('Carrinho não encontrado')
      })
    })
  })
})