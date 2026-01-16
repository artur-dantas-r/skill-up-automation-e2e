Cypress.Commands.add("search", (term, hitEnter = true) => {
  cy.get('input[type="text"]')
    .should("be.visible")
    .clear()
    .type(`${term}${hitEnter ? "{enter}" : ""}`);
});

Cypress.Commands.add("updateInfo", (data) => {
  cy.get("#destination_name").clear().type(data.name);
  cy.get("#destination_description").clear().type(data.description);
  cy.get('input[type="submit"]').click();
});

Cypress.Commands.add("randomlyTogglePurchaseAgreement", () => {
  if (Math.random() > 0.5) {
    cy.get("#agree").click();
  }
});
