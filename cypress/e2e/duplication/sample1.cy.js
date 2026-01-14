describe("Code duplication bad practice - repetitive steps", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search**").as("getStories");

    cy.visit("https://hackernews-seven.vercel.app");
    cy.wait("@getStories");
  });
  it("searches by typing and hitting enter", () => {
    cy.search('frontend testing')

    cy.wait("@getStories");

    cy.get(".table-row").should("have.length", 100);
  });

  it("searches by typing and pressing the search button", () => {
    cy.search('frontend testing', false)
    
    cy.contains("button", "Search").should("be.visible").click();

    cy.wait("@getStories");

    cy.get(".table-row").should("have.length", 100);
  });
});
