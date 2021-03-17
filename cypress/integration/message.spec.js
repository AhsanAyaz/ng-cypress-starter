/// <reference types="cypress" />

context("Message", () => {
  beforeEach(() => {
    cy.visit("/message/1");
  });

  it("Should show the message after landing on the page", () => {
    cy.get(".card-body .card-text").should((cardText) => {
      expect(cardText.text().trim()).eq("Hi");
    });
  });

  it("Should delete the message and go back to the home page", () => {
    cy.get(".card").contains("Delete").click();

    cy.url().should("eq", "http://localhost:4200/chat");
    cy.get(".messages-list .message-item").should((messagesList) => {
      expect(messagesList).to.have.length(3);
    });
  });
});
