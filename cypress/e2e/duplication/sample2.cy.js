describe("Code duplication bad practice - repetitive tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search**").as("getStories");

    cy.visit("https://hackernews-seven.vercel.app");
    cy.wait("@getStories");
  });

  const terms = ["reactjs", "vuejs"];

  terms.forEach((term) => {
    it(`searches for "${term}"`, () => {
      cy.search(term, true);

      cy.wait("@getStories");

      cy.get(".table-row").should("have.length", 100);
    });
  });
});
