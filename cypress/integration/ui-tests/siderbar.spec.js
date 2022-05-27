/// <reference types="cypress" />

describe("Sidebar", () => {
  beforeEach(() => {
    cy.loginWithUI();
  });

  it("should open and close the sidebar menu", () => {
    cy.get("#react-burger-menu-btn").should("be.visible").click();
    cy.get(".bm-menu-wrap").should("be.visible").matchImageSnapshot("Open sidebar");

    cy.get("#react-burger-cross-btn").should("be.visible").click();
    cy.get(".bm-menu-wrap").should("not.be.visible").matchImageSnapshot("Closed sidebar");
  });

  it("should navigate to saucelabs.com when clicking about link on the menu", () => {
    cy.get("#react-burger-menu-btn").should("be.visible").click();
    cy.get("#about_sidebar_link").should("be.visible").click();

    cy.url().should("eq", "https://saucelabs.com/");
  });

  it("should logout using the sidebar menu", () => {
    cy.logoutWithUI();

    cy.url().should("eq", "https://www.saucedemo.com/");

    cy.get(".login_wrapper").should("be.visible");
  });
});
