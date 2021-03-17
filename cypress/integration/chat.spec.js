/// <reference types="cypress" />

context("Chat", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have 4 chat messages as seed by default", () => {
    cy.get(".messages-list .message-item").should((messagesList) => {
      expect(messagesList).to.have.length(4);
    });
  });

  it("should add a new message to the list", () => {
    cy.get(".write-box textarea").type("Hello, World");
    cy.get(".send-button button").click();
    cy.get(".messages-list .message-item").should((messagesList) => {
      expect(messagesList).to.have.length(5);
    });
  });

  it("should remove a message when the delete button is clicked from the list", () => {
    cy.get(".messages-list .message-item")
      .eq(2)
      .find(".delete-btn")
      .click({ force: true });
    cy.get(".messages-list .message-item").should((messagesList) => {
      expect(messagesList).to.have.length(3);
    });
  });

  it("should navigate to the desired message detail page on message click", () => {
    cy.get(".messages-list .message-item").eq(2).click();
    cy.url().should("eq", "http://localhost:4200/message/2");
  });
});
