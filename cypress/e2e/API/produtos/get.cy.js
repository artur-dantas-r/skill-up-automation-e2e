describe('GET /produtos', () => {
  context('Listar produtos', () => {
    it('Should list all products successfully', () => {
      cy.apiGetProducts().then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('quantidade')
        expect(body).to.have.property('produtos')
        expect(body.produtos).to.be.an('array')
      })
    })

    it('Should list products filtering by name', () => {
      cy.apiGetProducts({ nome: 'Logitech' }).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('produtos')
        if (body.produtos.length > 0) {
          body.produtos.forEach(produto => {
            expect(produto.nome).to.include('Logitech')
          })
        }
      })
    })

    it('Should list products filtering by minimum price', () => {
      cy.apiGetProducts({ preco: 100 }).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body).to.have.property('produtos')
      })
    })

    it('Should return empty list with filter that finds no products', () => {
      cy.apiGetProducts({ nome: 'produtoNaoExistente12345' }).then(({ status, body }) => {
        expect(status).to.equal(200)
        expect(body.quantidade).to.equal(0)
        expect(body.produtos).to.be.an('array').that.is.empty
      })
    })
  })

  context('/:id', () => {
    it('Should fetch product by ID successfully', () => {
      cy.apiGetProducts().then(({ body }) => {
        if (body.produtos.length > 0) {
          const produtoId = body.produtos[0]._id
          
          cy.apiGetProductById(produtoId).then(({ status, body: produtoBody }) => {
            expect(status).to.equal(200)
            expect(produtoBody).to.have.property('_id', produtoId)
            expect(produtoBody).to.have.property('nome')
            expect(produtoBody).to.have.property('preco')
            expect(produtoBody).to.have.property('descricao')
            expect(produtoBody).to.have.property('quantidade')
          })
        }
      })
    })

    it('Should return error 400 when fetching product with invalid ID', () => {
      cy.apiGetProductById('BeeJh5lz3k8kSIzA').then(({ status, body }) => {
        expect(status).to.equal(400)
        expect(body).to.have.property('message')
        expect(body.message).to.equal('Produto não encontrado')
      })
    })
  })
})