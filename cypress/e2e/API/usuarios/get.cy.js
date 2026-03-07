describe('GET /usuarios', () => {
  context('Listar usuários', () => {
    it('Should list all users successfully', () => {
      cy.apiGetUsers().then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('quantidade')
        expect(body).to.have.property('usuarios')
        expect(body.usuarios).to.be.an('array')
      })
    })

    it('Should list users filtering by name', () => {
      cy.apiGetUsers({ nome: 'Fulano' }).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('usuarios')
        if (body.usuarios.length > 0) {
          body.usuarios.forEach(usuario => {
            expect(usuario.nome).to.include('Fulano')
          })
        }
      })
    })

    it('Should list users filtering by email', () => {
      cy.apiGetUsers({ email: 'fulano@qa.com' }).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('usuarios')
        if (body.usuarios.length > 0) {
          body.usuarios.forEach(usuario => {
            expect(usuario.email).to.include('qa.com')
          })
        }
      })
    })

    it('Should list users filtering by administrator', () => {
      cy.apiGetUsers({ administrador: 'true' }).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('usuarios')
        if (body.usuarios.length > 0) {
          body.usuarios.forEach(usuario => {
            expect(usuario.administrador).to.equal('true')
          })
        }
      })
    })

    it('Should return empty list with filter that finds no users', () => {
      cy.apiGetUsers({ email: 'naoexiste@qa.com' }).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.quantidade).to.equal(0)
        expect(body.usuarios).to.be.an('array').that.is.empty
      })
    })
  })

  context('/:id', () => {
    it('Should fetch user by ID successfully', () => {
      cy.apiGetUsers().then(({ body }) => {
        if (body.usuarios.length > 0) {
          const userId = body.usuarios[0]._id
          
          cy.apiGetUserById(userId).then(({ status, body: userBody }) => {
            expect(status).to.equal(200)
            expect(userBody).to.have.property('_id', userId)
            expect(userBody).to.have.property('nome')
            expect(userBody).to.have.property('email')
            expect(userBody).to.have.property('password')
            expect(userBody).to.have.property('administrador')
          })
        }
      })
    })

    it('Should return error 400 when fetching user with invalid ID', () => {
      cy.apiGetUserById('0uxuPY0cbmQhpEz2').then(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body).to.have.property('message')
        expect(body.message).to.equal('Usuário não encontrado')
      })
    })

    it('Should return error 400 with invalid numeric ID', () => {
      cy.apiGetUserById('123456').then(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body.id).to.equal('id deve ter exatamente 16 caracteres alfanuméricos')
      })
    })
  })
})