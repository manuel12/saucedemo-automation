/// <reference types="cypress" />

describe("Checkout Step Two", () => {
  beforeEach(() => {
    cy.loginWithUI();
    cy.addItemToCartWithUI(1);
    cy.get(".shopping_cart_link").click();
    cy.get("[data-test=checkout]").click();
    cy.checkoutWithUI({ onlyFirstStep: true });
  });

  it("should display item name, description, price and quantity", () => {
    cy.get(".cart_item").each(($child) => {
      cy.get($child).within(() => {
        cy.get(".inventory_item_name").should("be.visible");
        cy.get(".inventory_item_desc").should("be.visible");
        cy.get(".inventory_item_price").should("be.visible");
        cy.get(".cart_quantity").should("be.visible");
      });
    }).matchImageSnapshot();
  });

  it("should display subtotal, tax and total price information", () => {
    cy.get(".summary_info")
      .should("be.visible")
      .and("contain", "Payment Information:")
      .and("contain", "SauceCard #31337")
      .and("contain", "Shipping Information:")
      .and("contain", "FREE PONY EXPRESS DELIVERY!")
      .matchImageSnapshot();

    cy.get(".summary_subtotal_label").should("be.visible");
    cy.get(".summary_tax_label").should("be.visible");
    cy.get(".summary_total_label").should("be.visible");
  });

  it("should redirect to 'inventory' when clicking cancel button", () => {
    cy.get("[data-test=cancel]").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });

  it("should redirect to 'checkout-complete' when clicking finish button", () => {
    cy.get("[data-test=finish]").click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html");
  });
});
