/// <reference types="cypress" />

import { createArrInRange } from "../../support/utils";

describe("Inventory", () => {
  const itemNums = createArrInRange(6, 1);

  beforeEach(() => {
    cy.loginWithUI();
  });

  it("should display all items images, names, descriptions and prices", () => {
    cy.get(".inventory_item").each(($item, index) => {
      cy.get($item).within(() => {
        cy.get(".inventory_item_img").should("be.visible");
        cy.get(".inventory_item_name").should("be.visible");
        cy.get(".inventory_item_desc").should("be.visible");
        cy.get(".inventory_item_price").should("be.visible");
      })
      .matchImageSnapshot(`Inventory item (${index + 1})`);
    });
  });

  for (const itemNum of itemNums) {
    it(`should redirect to item(${itemNum}) detail page when clicking on item name`, () => {
      cy.get(":nth-child(1) > .inventory_item_name")
        .eq(itemNum - 1) // eq item indexes start at 0
        .click();

      cy.url().should(
        "contain",
        "https://www.saucedemo.com/inventory-item.html"
      );
      cy.get("#inventory_item_container")
        .should("be.visible")
        .matchImageSnapshot();
    });
  }

  it("should redirect to shopping cart when clicking shopping cart icon", () => {
    cy.get(".shopping_cart_link").should("be.visible").click();

    cy.url().should("eq", "https://www.saucedemo.com/cart.html");
    cy.get("#cart_contents_container").should("be.visible");
  });
});
