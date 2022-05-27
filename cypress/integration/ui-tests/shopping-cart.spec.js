/// <reference types="cypress" />

import { createArrInRange } from "../../support/utils";

describe("Shopping Cart", () => {
  const itemNums = createArrInRange(6, 1);

  beforeEach(() => {
    cy.clearLocalStorage();
    Cypress.Cookies.preserveOnce("session-username");
    cy.loginWithUI();
  });

  for (const itemNum of itemNums) {
    it(`should display ${itemNum} added items on shopping cart`, () => {
      cy.addItemToCartWithUI(itemNum, true);

      cy.get(".shopping_cart_link").click();
      cy.get(".cart_item").should("have.length", itemNum);
      cy.get(".cart_list").matchImageSnapshot();
    });
  }

  it("should display item name, description and price and quantity", () => {
    cy.addItemToCartWithUI(1);

    cy.get(".shopping_cart_link").click();
    cy.get(".cart_item").each(($child) => {
      cy.get($child).within(() => {
        cy.get(".inventory_item_name").should("be.visible");
        cy.get(".inventory_item_desc").should("be.visible");
        cy.get(".inventory_item_price").should("be.visible");
      }).matchImageSnapshot();
    });
  });

  it("should redirect to inventory when clicking 'continue shopping'", () => {
    cy.addItemToCartWithUI(1);
    cy.get(".shopping_cart_link").click();
    cy.get("[data-test=continue-shopping]").click();

    cy.url().should("contain", "https://www.saucedemo.com/inventory.html");
  });

  it("should remove an item when clicking on the item's 'remove' button", () => {
    cy.addItemToCartWithUI(1);
    cy.get(".shopping_cart_link").click();

    cy.get(".cart_item").should("be.visible");
    cy.get("[data-test=remove-sauce-labs-backpack]").click();

    cy.get(".cart_item").should("not.exist");
  });

  it("should redirect to 'checkout-step-one' when clicking checkout button", () => {
    cy.addItemToCartWithUI(1);
    cy.get(".shopping_cart_link").click();

    cy.get("[data-test=checkout]").click();
    cy.url().should(
      "contain",
      "https://www.saucedemo.com/checkout-step-one.html"
    );
  });
});
