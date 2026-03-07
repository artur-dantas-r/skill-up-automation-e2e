// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands/ui_commands'
import './commands/api_commands'
import 'cypress-plugin-api'

Cypress.Commands.overwrite('type', (originalFn, subject, text, options = {}) => {
    options.delay = options.delay || 0; // Use 0ms default delay, or the provided option

    if (options && options.sensitive) {
        // turn off original log
        options.log = false
        // create our own log with masked message
        Cypress.log({
            $el: subject,
            name: 'type',
            message: '*'.repeat(text.length),
        })
    }

    return originalFn(subject, text, options);
});