describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("../../src/index.html");
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche campos obrigatórios e envia o formulário", () => {
    cy.clock()

    cy.get("#firstName").type("Artur", { delay: 0 });
    cy.get("#lastName").type("Dantas QA", { delay: 0 });
    cy.get("#email")
      .should("be.visible")
      .type("arturdantasrodrigues@gmail.com", {
        delay: 0,
      });
    cy.get("#phone").type("83981914051", { delay: 0 });

    cy.get('textarea[id="open-text-area"]').type(
      "Boa tarde! Talvez vocês pudessem colocar uma cor mais comum no formulário, não acho que o rosa combine com a proposta da página.",
      { delay: 0 }
    );

    cy.contains("button", "Enviar").click();

    cy.get(".success")
      .should("be.visible")
      .should("contain", "Mensagem enviada com sucesso.");

    cy.tick(3000)
    
    cy.get(".success")
      .should('not.be.visible')

  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock()
    
    cy.contains("button", "Enviar").click();

    cy.get(".error")
      .should("be.visible")
      .should("contain", "Valide os campos obrigatórios!");

    cy.tick(3000)
    
    cy.get(".error")
      .should('not.be.visible')
  });

  it("não permite que o usuário digite valores não númericos no campo de telefone", () => {
    const phone = cy.get("#phone").type("artur dantas", { delay: 0 });

    phone.should("not.have.value");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.clock()
    cy.get("#firstName").type("Artur", { delay: 0 });
    cy.get("#lastName").type("Dantas QA", { delay: 0 });
    cy.get("#email")
      .should("be.visible")
      .type("arturdantasrodrigues@gmail.com", {
        delay: 0,
      });

    cy.get("#phone-checkbox").check();

    cy.get('textarea[id="open-text-area"]').type(
      "Boa tarde! Talvez vocês pudessem colocar uma cor mais comum no formulário, não acho que o rosa combine com a proposta da página.",
      { delay: 0 }
    );

    cy.contains("button", "Enviar").click();

    cy.get(".error")
      .should("be.visible")
      .should("contain", "Valide os campos obrigatórios!");

    cy.tick(3000)
    
    cy.get(".error")
      .should('not.be.visible')
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Artur", { delay: 0 })
      .clear()
      .should("not.have.value");
    cy.get("#lastName")
      .type("Dantas QA", { delay: 0 })
      .clear()
      .should("not.have.value");
    cy.get("#email")
      .should("be.visible")
      .type("arturdantasrodrigues@gmail.com", {
        delay: 0,
      })
      .clear()
      .should("not.have.value");
    cy.get("#phone")
      .type("83981914051", { delay: 0 })
      .clear()
      .should("not.have.value");

    cy.get('textarea[id="open-text-area"]')
      .type(
        "Boa tarde! Talvez vocês pudessem colocar uma cor mais comum no formulário, não acho que o rosa combine com a proposta da página.",
        { delay: 0 }
      )
      .clear()
      .should("not.have.value");
  });

  it("envia o formulário com sucesso usando comando customizado", () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit({ firstName: "Testando coisas" });

    cy.get(".success")
      .should("be.visible")
      .should("contain", "Mensagem enviada com sucesso.");

    cy.tick(3000)
    
    cy.get(".success")
      .should('not.be.visible')
  });
  // Cypress._.repeat <- isso aqui é bem legal, tem vários comandos que podem ser super úteis

  it("seleciona um produto (youtube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("marca o tipo de atendimento 'Feedback'", () => {
    cy.get('input[value="feedback"][type="radio"]')
      .check()
      .should("be.checked");
  });

  it("marca cada tipo de atendimento - minha solução", () => {
    cy.get('input[value="ajuda"][type="radio"]').check().should("be.checked");
    cy.get('input[value="elogio"][type="radio"]').check().should("be.checked");
    cy.get('input[value="feedback"][type="radio"]')
      .check()
      .should("be.checked");
  });

  it.skip("marca cada tipo de atendimento - solução do professor", () => {
    cy.get('[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]').as("checkboxes").check();

    cy.get("@checkboxes")
      .each((contactType) => {
        cy.wrap(contactType).should("be.checked");
      })
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"').as("file");

    cy.get("@file").selectFile("cypress/fixtures/example.json");

    cy.get("@file").then((file) => {
      expect(file[0].files[0].name).to.be.equal("example.json");
    });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"').as("file");

    cy.get("@file").selectFile("cypress/fixtures/example.json", {
      action: "drag-drop",
    });

    cy.get("@file").then((file) => {
      expect(file[0].files[0].name).to.be.equal("example.json");
    });
  });

  it("seleiona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.get('input[type="file"').as("file");
    cy.fixture("example.json").as("example-file");

    cy.get("@file").selectFile("@example-file");

    cy.get("@file").then((file) => {
      expect(file[0].files[0].name).to.be.equal("example.json");
    });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade").should(
      "have.attr",
      "target",
      "_blank"
    );
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();

    cy.title().should(
      "equal",
      "Central de Atendimento ao Cliente TAT - Política de Privacidade"
    );
  });
});
