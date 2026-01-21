// That file is used to define types for the custom commands

declare namespace Cypress {
  interface Chainable {
    // UI ----------------

    /**
     * Fill and submit the signup form via UI.
     * Only fills fields that are provided.
     */
    uiFillAndSubmitSignupForm(user: {
      name?: string;
      email?: string;
      password?: string;
      isAdmin?: string;
    }): Chainable<void>;


    // API ----------------

    /**
     * Registers a user via API.
     * Does not fail on non-2xx responses.
     */
    apiSignUpUser(user: {
      name: string;
      email: string;
      password: string;
      isAdmin: string;
    }): Chainable<Response<any>>;

    /**
     * Deletes a user via API.
     * Does not fail on non-2xx responses.
     */
    apiDeleteUser(userId: string): Chainable<Response<any>>;
  }
}