describe('Code duplication bad practice - multiple checks', () => {
  beforeEach(() => {
    cy.visit('https://bit.ly/2XSuwCW')
  })
 
  it('checks all checkboxes from a specific fieldset', () => {

    cy.get(':nth-child(4) > fieldset [type = "checkbox"]').check()
  })
})
