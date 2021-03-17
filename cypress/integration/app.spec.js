/// <reference types="cypress" />

context("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // https://on.cypress.io/interacting-with-elements

  it('Should have title "NG Cypress Starter"', () => {
    // https://on.cypress.io/title
    cy.title().should("eq", "NG Cypress Starter");
  });
});
