/// <reference types="cypress" />

import { createArrInRange } from "../../support/utils";

describe("Item Detail Page", () => {
  const itemNums = createArrInRange(6, 1);

  beforeEach(() => {
    cy.loginWithUI();
  });

  for (const itemNum of itemNums) {
    it(`should display item (${itemNum}) image, name, description, price`, () => {
      cy.get(":nth-child(1) > .inventory_item_name")
        .eq(itemNum - 1)
        .click();

      cy.get(".inventory_details_name").should("be.visible");
      cy.get(".inventory_details_desc").should("be.visible");
      cy.get(".inventory_details_price").should("be.visible");
      cy.get(".inventory_details_img").should("be.visible");
      cy.get("#inventory_item_container").matchImageSnapshot();
    });
  }

  it("should redirect to inventory when clicking 'back to products' button", () => {
    cy.get(":nth-child(1) > .inventory_item_name").first().click();

    cy.get("[data-test=back-to-products]").should("be.visible").click();
  });

  for (const itemNum of itemNums) {
    it("should display 'add to cart' button on detail page if item was NOT added to cart previously", () => {
      cy.get(":nth-child(1) > .inventory_item_name")
        .eq(itemNum - 1)
        .click();

      cy.get("button").should("contain.text", "Add to cart");
    });
  }

  for (const itemNum of itemNums) {
    it("should display 'remove' button on detail page if item was added to cart previously", () => {
      cy.get(".inventory_item")
        .eq(itemNum - 1)
        .within(() => {
          cy.get(".btn").should("be.visible").click();
        });

      cy.get(":nth-child(1) > .inventory_item_name")
        .eq(itemNum - 1)
        .click();

      cy.get(".btn").should("contain.text", "Remove");
    });
  }
});
