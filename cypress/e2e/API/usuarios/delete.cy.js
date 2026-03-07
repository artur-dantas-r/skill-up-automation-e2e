import { userFactory } from '../../../support/utils'

describe('DELETE /usuarios/:id', () => {
  let usuarioId

  beforeEach(() => {
    const novoUsuario = userFactory({ email: `delete_${Date.now()}_${Math.random()}@qa.com.br` })

    cy.apiSignUpUser(novoUsuario).then(({ body }) => {
      usuarioId = body._id
    })
  })

  context('Excluir usuário', () => {
    it('Should delete existing user successfully', () => {
      cy.apiDeleteUser(usuarioId).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('message')
        expect(body.message).to.include('Registro excluído com sucesso')
      })
    })

    it('Should return message when trying to delete non-existent user', () => {
      const idInexistente = 'idQueNaoExiste12345'

      cy.apiDeleteUser(idInexistente).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('message')
      })
    })

    it('Should allow deleting the same user again after it has been deleted', () => {
      cy.apiDeleteUser(usuarioId).then(({ status }) => {
        expect(status).to.equal(200)
      })

      cy.apiDeleteUser(usuarioId).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.message).to.include('Nenhum registro excluído')
      })
    })
  })
})