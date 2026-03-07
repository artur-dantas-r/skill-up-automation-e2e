import { userFactory } from '../../../support/utils'

describe('PUT /usuarios/:id', () => {
  let usuarioId

  before(() => {
    const novoUsuario = userFactory({ email: `edit_${Date.now()}@qa.com.br` })

    cy.apiSignUpUser(novoUsuario).then(({ body }) => {
      usuarioId = body._id
    })
  })

  after(() => {
    // Deletar o usuário criado após os testes
    if (usuarioId) {
      cy.apiDeleteUser(usuarioId)
    }
  })

  context('Editar usuário', () => {
    it('Should edit existing user successfully', () => {
      const usuarioAtualizado = userFactory({ 
        email: `edit_${Date.now()}@qa.com.br`,
        administrador: 'true'
      })

      cy.apiUpdateUser(usuarioId, usuarioAtualizado).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('message', 'Registro alterado com sucesso')
      })
    })

    it('Should return error 400 when editing with duplicate email', () => {
      const usuarioComEmailDuplicado = userFactory({ email: 'fulano@qa.com' })

      cy.apiUpdateUser(usuarioId, usuarioComEmailDuplicado).then(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body).to.have.property('message')
        expect(body.message).to.include('Este email já está sendo usado')
      })
    })

    it('Should return error 400 when editing with empty name', () => {
      const usuarioInvalido = userFactory({ 
        nome: '',
        email: `edit_${Date.now()}@qa.com.br`
      })

      cy.apiUpdateUser(usuarioId, usuarioInvalido).then(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body).to.have.property('nome')
      })
    })
  })
})