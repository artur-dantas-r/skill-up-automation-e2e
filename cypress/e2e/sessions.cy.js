describe('POST /sessions', () => {

  it('user session', () => {

    const userData = {
      name: 'Mario Bros',
      email: 'mario.bros@gmail.com',
      password: 'supersenha'
    }

    cy.task('deleteUser', userData.email)

    cy.postUser(userData)
      .then(response => {
        expect(response.status).to.eq(201)
      })

    cy.postSession(userData)
      .then(response => {
        expect(response.status).to.eq(200)

        const { user, token } = response.body

        expect(user.name).to.be.eq(userData.name)
        expect(user.email).to.be.eq(userData.email)
        expect(token).to.not.be.empty
      })
  })

  it('invalid password', () => {

    const userData = {
      email: 'mario.bros@gmail.com',
      password: 'senhaerrada'
    }

    cy.postSession(userData)
      .then(response => {
        expect(response.status).to.eq(401)
      })
  })

  it('invalid email', () => {

    const userData = {
      email: 'mario.bross@gmail.com',
      password: 'supersenha'
    }

    cy.postSession(userData)
      .then(response => {
        expect(response.status).to.eq(401)
      })
  })

})