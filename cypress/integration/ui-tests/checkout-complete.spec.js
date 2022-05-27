/// <reference types="cypress" />

describe("Checkout Complete", () => {
  beforeEach(() => {
    cy.loginWithUI();
    cy.addItemToCartWithUI(1);
    cy.get(".shopping_cart_link").click();
    cy.get("[data-test=checkout]").click();
    cy.checkoutWithUI();
  });

  it("should display thank you for you order text and pony express image", () => {
    cy.get(".complete-header")
      .should("contain.text", "THANK YOU FOR YOUR ORDER")
      .matchImageSnapshot("Thank you for your order");

    cy.get(".pony_express").should("be.visible").matchImageSnapshot("pony express logo");
  });

  it("should redirect to 'inventory' when clicking back to home button", () => {
    cy.get("[data-test=back-to-products]").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });
});
