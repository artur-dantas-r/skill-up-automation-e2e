describe('POST /users', () => {
  it('register a new user', () => {

    const user = {
      name: 'Artur Dantas',
      email: 'arturdantasrodrigues@gmail.com',
      password: 'supersenha'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(201)
      })
  })

  it('duplicate email', () => {

    const user = {
      name: 'Michael Jackson',
      email: 'michael.jackson@gmail.com',
      password: 'supersenha'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(409)
      })
  })

  context('required fields', () => {

    const fields = ['name', 'email', 'password']

    fields.forEach(field => {
      it(`should not register user without ${field}`, () => {
        const user = {
          name: 'Artur Dantas',
          email: 'useraleatorio@gmail.com',
          password: 'supersenha'
        }

        // remove o campo que não será passado nessa execução
        delete user[field]
  
        cy.postUser(user)
          .then(response => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq(`ValidationError: \"${field}\" is required`)
          })
      })
    })
  })
})