import { faker } from "@faker-js/faker"

const userFactory = (override = {}) => {
    const firstName = faker.person.firstName() 
    const lastName = faker.person.lastName() 

    return {
        nome: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@test.qa.com`,
        password: faker.internet.password(7),
        administrador: 'false', 
        ...override
    }
}

const productFactory = (override = {}) => {

    return {
        nome: faker.commerce.product(),
        preco: faker.commerce.price({min: 100, max: 2000, dec: 0}),
        descricao: faker.commerce.productDescription(),
        quantidade: faker.number.int({min: 1}), 
        ...override
      }
}

const cartFactory = (products = [], override = {}) => {
    return {
        produtos: products,
        ...override
    }
}

export { userFactory, productFactory, cartFactory }