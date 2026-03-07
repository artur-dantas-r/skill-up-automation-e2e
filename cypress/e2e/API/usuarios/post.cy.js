import { userFactory } from "../../../support/utils"

describe('POST /usuarios', () => {
    let createdUsersId = []

    after(() => {
        cy.wrap(createdUsersId).each(userId => {
            cy.apiDeleteUser(userId).then(({ status }) => {
                expect(status).to.eq(200)
            })
        })
    })
    context('User signup', () => {
        it('should signup successfully', () => {
            const novoUsuario = userFactory()

            cy.apiSignUpUser(novoUsuario).then(({ body, status }) => {
                expect(status).to.equal(201)
                expect(body).to.have.property('message', 'Cadastro realizado com sucesso')
                expect(body).to.have.property('_id')
                expect(body._id).to.be.a('string')

                createdUsersId.push(body._id)
            })
        })

        it('should signup successfully as administrator', () => {
            const novoAdmin = userFactory({ administrador: 'true' })

            cy.apiSignUpUser(novoAdmin).then(({ body, status }) => {

                expect(status).to.equal(201)
                expect(body).to.have.property('message', 'Cadastro realizado com sucesso')
                expect(body).to.have.property('_id')

                createdUsersId.push(body._id)

                return body._id
            }).then(userId => cy.apiGetUserById(userId))
                .then(({ body }) => {
                    expect(body.administrador).to.be.eql('true')
                })
        })

        it('should return 400 when signup with already used email', () => {
            const usuario1 = userFactory({ email: 'email.usado@teste.qa.com' })
            const usuario2 = userFactory({ email: 'email.usado@teste.qa.com' })

            cy.apiSignUpUser(usuario1).then(({ body }) => {
                createdUsersId.push(body._id)
                return cy.apiSignUpUser(usuario2)

            }).then(({ body, status }) => {
                expect(status).to.equal(400)
                expect(body).to.have.property('message')
                expect(body.message).to.include('Este email já está sendo usado')
            })
        })
        it('Should return error 400 when name field is empty', () => {
            const usuarioInvalido = userFactory({ nome: '' })

            cy.apiSignUpUser(usuarioInvalido).then(({ body, status }) => {
                expect(status).to.equal(400)
                expect(body).to.have.property('nome')
            })
        })

        it('Should return error 400 when email is empty', () => {
            const usuarioInvalido = userFactory({ email: '' })

            cy.apiSignUpUser(usuarioInvalido).then(({ body, status }) => {
                expect(status).to.equal(400)
                expect(body).to.have.property('email')
            })
        })

        it('Should return error 400 when password is empty', () => {
            const usuarioInvalido = userFactory({ password: '' })

            cy.apiSignUpUser(usuarioInvalido).then(({ body, status }) => {
                expect(status).to.equal(400)
                expect(body).to.have.property('password')
            })
        })
    })
})