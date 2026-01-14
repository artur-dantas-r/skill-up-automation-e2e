Cypress.Commands.add('search', (term, hitEnter = true) => {
  cy.get('input[type="text"]')
      .should("be.visible")
      .clear()
      .type(`${term}${hitEnter ? "{enter}" : ""}`);
})

Cypress.Commands.add('assertResults', () => {
  cy.get('.table-row').then(rows => {
    expect(rows.length).to.be.at.least(1)
  })
})

Cypress.Commands.add('randomlyTogglePurchaseAgreement', () => {
  if (Math.random() > 0.5) {
    cy.get('#agree')
      .click()
  }
})
