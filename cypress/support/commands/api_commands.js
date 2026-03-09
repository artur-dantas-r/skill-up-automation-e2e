
// > AUTH

const apiUrl = Cypress.env('API_URL')

Cypress.Commands.add('apiSignUpUser', ({ nome = 'coisado', email = 'teste@gmail.com', password = 'supersenha', administrador = 'false' }) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
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

    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiLogin', ({ email = 'teste@gmail.com', password = 'supersenha' }) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'POST',
        url: `${apiUrl}/login`,
        failOnStatusCode: false,
        body: {
            email: email,
            password: password,
        }
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiGetUsers', (filters = {}) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const qs = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined)
    )
    const options = {
        method: 'GET',
        url: `${apiUrl}/usuarios`,
        ...(Object.keys(qs).length > 0 && { qs }),
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiDeleteUser', (userId) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'DELETE',
        url: `${apiUrl}/usuarios/${userId}`,
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiGetUserById', (userId) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'GET',
        url: `${apiUrl}/usuarios/${userId}`,
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiUpdateUser', (userId, userData) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'PUT',
        url: `${apiUrl}/usuarios/${userId}`,
        failOnStatusCode: false,
        body: userData
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

// > PRODUTOS

Cypress.Commands.add('apiGetProducts', (filters = {}) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const qs = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined)
    )
    const options = {
        method: 'GET',
        url: `${apiUrl}/produtos`,
        ...(Object.keys(qs).length > 0 && { qs }),
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiGetProductById', (productId) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'GET',
        url: `${apiUrl}/produtos/${productId}`,
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiCreateProduct', (productData, token) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: {
            Authorization: token
        },
        body: productData,
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiUpdateProduct', (productId, productData, token) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'PUT',
        url: `${apiUrl}/produtos/${productId}`,
        headers: {
            Authorization: token
        },
        body: productData,
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiDeleteProduct', (productId, token) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'DELETE',
        url: `${apiUrl}/produtos/${productId}`,
        headers: {
            Authorization: token
        },
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

// > CARRINHOS

Cypress.Commands.add('apiGetCarts', (filters = {}) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const qs = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined)
    )
    const options = {
        method: 'GET',
        url: `${apiUrl}/carrinhos`,
        ...(Object.keys(qs).length > 0 && { qs }),
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiGetCartById', (cartId) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'GET',
        url: `${apiUrl}/carrinhos/${cartId}`,
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiCreateCart', (cartData, token) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'POST',
        url: `${apiUrl}/carrinhos`,
        headers: {
            Authorization: token
        },
        body: cartData,
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiCompleteCheckout', (token) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'DELETE',
        url: `${apiUrl}/carrinhos/concluir-compra`,
        headers: {
            Authorization: token
        },
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})

Cypress.Commands.add('apiCancelCheckout', (token) => {
    const isUiTest = Cypress.spec.relative.includes('UI')
    const options = {
        method: 'DELETE',
        url: `${apiUrl}/carrinhos/cancelar-compra`,
        headers: {
            Authorization: token
        },
        failOnStatusCode: false
    }
    return isUiTest ? cy.request(options) : cy.api(options)
})