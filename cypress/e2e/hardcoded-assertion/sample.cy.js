import { hits } from '../../fixtures/stories.json'

describe("Hardcoded assertion bad practice", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search**", { fixture: "stories" }).as("getStories");

    cy.visit("https://hackernews-seven.vercel.app");
    cy.wait("@getStories");
  });

  it("searches", function () {
    cy.search("cypress.io");
    cy.wait("@getStories");

    cy.get(".table-row").as("tableRows").should("have.length", hits.length);

    hits.forEach((story, index) => {
      cy.get("@tableRows").eq(index).should("contain", story.title);
    });
  });
});
