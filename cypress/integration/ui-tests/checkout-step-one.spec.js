/// <reference types="cypress" />

describe("Checkout Step One", () => {
  beforeEach(() => {
    cy.loginWithUI();
    cy.addItemToCartWithUI(1);
    cy.get(".shopping_cart_link").click();
    cy.get("[data-test=checkout]").click();
  });

  it("should redirect back to cart when clicking cancel button", () => {
    cy.get("[data-test=cancel]").click();

    cy.url().should("contain", "https://www.saucedemo.com/cart.html");
  });

  it("should be NOT allowed to continue while leaving first name, last name or zipcode empty", () => {
    cy.get("[data-test=continue]").should("be.visible").click();

    cy.url().should(
      "contain",
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    cy.get(".error-message-container").should(
      "contain",
      "Error: First Name is required"
    ).matchImageSnapshot("First Name is required");

    cy.get("[data-test=firstName]").type("first name");
    cy.get("[data-test=continue]").should("be.visible").click();

    cy.url().should(
      "contain",
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    cy.get(".error-message-container").should(
      "contain",
      "Error: Last Name is required"
    ).matchImageSnapshot("Last Name is required");

    cy.get("[data-test=lastName]").type("last name");
    cy.get("[data-test=continue]").should("be.visible").click();

    cy.url().should(
      "contain",
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    cy.get(".error-message-container").should(
      "contain",
      "Error: Postal Code is required"
    ).matchImageSnapshot("Postal Code is required");
  });

  it("should redirect to checkout step two when filling form and clicking continue button", () => {
    cy.get("[data-test=firstName]").type("first name");
    cy.get("[data-test=lastName]").type("last name");
    cy.get("[data-test=postalCode]").type("30-444");

    cy.get("[data-test=continue]").should("be.visible").click();

    cy.url().should(
      "contain",
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    cy.get(".summary_info").should("be.visible");
  });
});
