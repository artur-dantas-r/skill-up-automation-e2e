
// > AUTH

const apiUrl = Cypress.env('API_URL')

Cypress.Commands.add('apiSignUpUser', ({ nome = 'coisado', email = 'teste@gmail.com', password = 'supersenha', administrador = 'false' }, isFrontTest = false) => {
    const options = {
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        failOnStatusCode: false,
        body: {
            nome: nome,
            email: email,
            password: password,
            administrador: administrador
        },
    }

    return isFrontTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiLogin', ({ email = 'teste@gmail.com', password = 'supersenha' }) => {
    return cy.api({
        method: 'POST',
        url: `${apiUrl}/login`,
        failOnStatusCode: false,
        body: {
            email: email,
            password: password,
        }
    })
})

Cypress.Commands.add('apiGetUsers', (filters = {}) => {
    const qs = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined)
    )
    return cy.api({
        method: 'GET',
        url: `${apiUrl}/usuarios`,
        ...(Object.keys(qs).length > 0 && { qs }),
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiDeleteUser', (userId) => {
    return cy.api({
        method: 'DELETE',
        url: `${apiUrl}/usuarios/${userId}`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiGetUserById', (userId) => {
    return cy.api({
        method: 'GET',
        url: `${apiUrl}/usuarios/${userId}`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiUpdateUser', (userId, userData) => {
    return cy.api({
        method: 'PUT',
        url: `${apiUrl}/usuarios/${userId}`,
        failOnStatusCode: false,
        body: userData
    })
})

// > PRODUTOS

Cypress.Commands.add('apiGetProducts', (filters = {}) => {
    const qs = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined)
    )
    return cy.api({
        method: 'GET',
        url: `${apiUrl}/produtos`,
        ...(Object.keys(qs).length > 0 && { qs }),
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiGetProductById', (productId) => {
    return cy.api({
        method: 'GET',
        url: `${apiUrl}/produtos/${productId}`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiCreateProduct', (productData, token) => {
    return cy.api({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: {
            Authorization: token
        },
        body: productData,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiUpdateProduct', (productId, productData, token) => {
    return cy.api({
        method: 'PUT',
        url: `${apiUrl}/produtos/${productId}`,
        headers: {
            Authorization: token
        },
        body: productData,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiDeleteProduct', (productId, token) => {
    return cy.api({
        method: 'DELETE',
        url: `${apiUrl}/produtos/${productId}`,
        headers: {
            Authorization: token
        },
        failOnStatusCode: false
    })
})

// > CARRINHOS

Cypress.Commands.add('apiGetCarts', (filters = {}) => {
    const qs = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined)
    )
    return cy.api({
        method: 'GET',
        url: `${apiUrl}/carrinhos`,
        ...(Object.keys(qs).length > 0 && { qs }),
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiGetCartById', (cartId) => {
    return cy.api({
        method: 'GET',
        url: `${apiUrl}/carrinhos/${cartId}`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiCreateCart', (cartData, token) => {
    return cy.api({
        method: 'POST',
        url: `${apiUrl}/carrinhos`,
        headers: {
            Authorization: token
        },
        body: cartData,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiCompleteCheckout', (token) => {
    return cy.api({
        method: 'DELETE',
        url: `${apiUrl}/carrinhos/concluir-compra`,
        headers: {
            Authorization: token
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('apiCancelCheckout', (token) => {
    return cy.api({
        method: 'DELETE',
        url: `${apiUrl}/carrinhos/cancelar-compra`,
        headers: {
            Authorization: token
        },
        failOnStatusCode: false
    })
})