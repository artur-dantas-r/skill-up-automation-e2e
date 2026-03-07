// That file is used to define types for the custom commands

declare namespace Cypress {
  interface Chainable {
    // UI ----------------

    /**
     * Fill and submit the signup form via UI.
     * Only fills fields that are provided.
     */
    uiFillAndSubmitSignupForm(user: {
      nome?: string;
      email?: string;
      password?: string;
      administrador?: string;
    }): Chainable<void>;

    // API - Users ----------------

    /**
     * Registers a user via API.
     * Does not fail on non-2xx responses.
     */
    apiSignUpUser(
      user: {
        nome: string;
        email: string;
        password: string;
        administrador: string;
      },
      isFrontTest?: boolean,
    ): Chainable<Response<any>>;

    /**
     * Login with user via API.
     * Does not fail on non-2xx responses.
     */
    apiLogin(user: {
      email: string;
      password: string;
    }): Chainable<Response<any>>;

    /**
     * Gets all users via API.
     * Does not fail on non-2xx responses.
     */
    apiGetUsers(filters?: {
      nome?: string;
      email?: string;
      administrador?: string;
    }): Chainable<Response<any>>;

    /**
     * Get a user by ID via API.
     * Does not fail on non-2xx responses.
     */
    apiGetUserById(userId: string): Chainable<Response<any>>;

    /**
     * Update a user via API.
     * Does not fail on non-2xx responses.
     */
    apiUpdateUser(userId: string, userData: {
      nome?: string;
      email?: string;
      password?: string;
      administrador?: string;
    }): Chainable<Response<any>>;

    /**
     * Deletes a user via API.
     * Does not fail on non-2xx responses.
     */
    apiDeleteUser(userId: string): Chainable<Response<any>>;

    // API - Products ----------------

    /**
     * Gets all products via API.
     * Does not fail on non-2xx responses.
     */
    apiGetProducts(filters?: {
      nome?: string;
      preco?: number;
    }): Chainable<Response<any>>;

    /**
     * Get a product by ID via API.
     * Does not fail on non-2xx responses.
     */
    apiGetProductById(productId: string): Chainable<Response<any>>;

    /**
     * Create a product via API.
     * Requires authorization token.
     * Does not fail on non-2xx responses.
     */
    apiCreateProduct(productData: {
      nome: string;
      preco: number;
      descricao: string;
      quantidade: number;
    }, token: string): Chainable<Response<any>>;

    /**
     * Update a product via API.
     * Requires authorization token.
     * Does not fail on non-2xx responses.
     */
    apiUpdateProduct(productId: string, productData: {
      nome?: string;
      preco?: number;
      descricao?: string;
      quantidade?: number;
    }, token: string): Chainable<Response<any>>;

    /**
     * Delete a product via API.
     * Requires authorization token.
     * Does not fail on non-2xx responses.
     */
    apiDeleteProduct(productId: string, token: string): Chainable<Response<any>>;

    // API - Carts ----------------

    /**
     * Gets all carts via API.
     * Does not fail on non-2xx responses.
     */
    apiGetCarts(filters?: {
      idUsuario?: string;
    }): Chainable<Response<any>>;

    /**
     * Get a cart by ID via API.
     * Does not fail on non-2xx responses.
     */
    apiGetCartById(cartId: string): Chainable<Response<any>>;

    /**
     * Create a cart via API.
     * Requires authorization token.
     * Does not fail on non-2xx responses.
     */
    apiCreateCart(cartData: {
      produtos: {
        idProduto: string;
        quantidade: number;
      }[];
    }, token: string): Chainable<Response<any>>;

    /**
     * Complete checkout (finalize purchase) via API.
     * Requires authorization token.
     * Does not fail on non-2xx responses.
     */
    apiCompleteCheckout(token: string): Chainable<Response<any>>;

    /**
     * Cancel checkout (delete cart) via API.
     * Requires authorization token.
     * Does not fail on non-2xx responses.
     */
    apiCancelCheckout(token: string): Chainable<Response<any>>;
  }
}

