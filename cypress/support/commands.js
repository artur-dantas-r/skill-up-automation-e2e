// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', { prevSubject: 'optional'}, (subject, options = {}) => {
    const { 
        firstName = 'Artur', 
        lastName = 'Dantas QA', 
        email = 'arturdantasrodrigues@gmail.com', 
        phone = '83981914051', 
        feedback = 'Isso aqui é o negócio' 
    } = options;
    
    const root = subject || cy;

    root.get('#firstName').type(firstName, { delay: 0 });
    root.get('#lastName').type(lastName, { delay: 0 });
    root.get('#email')
      .should("be.visible")
      .type(email, {
        delay: 0,
      });
    root.get('#phone').type(phone, { delay: 0 });

    root.get('textarea[id="open-text-area"]').type(
      feedback,
      { delay: 0 }
    );

    root.contains('button', 'Enviar').click();
})