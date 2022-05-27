/// <reference types="cypress" />

import { createNumArrInRange } from "../../support/utils";

describe("Add to Cart", () => {
  const itemNums = createNumArrInRange(6);
  const itemAddToCartLocators = {
    1: "[data-test=add-to-cart-sauce-labs-backpack]",
    2: "[data-test=add-to-cart-sauce-labs-bike-light]",
    3: "[data-test=add-to-cart-sauce-labs-bolt-t-shirt]",
    4: "[data-test=add-to-cart-sauce-labs-fleece-jacket]",
    5: "[data-test=add-to-cart-sauce-labs-onesie]",
    6: "[data-test='add-to-cart-test.allthethings()-t-shirt-(red)']",
  };

  const itemRemoveLocators = {
    1: "[data-test=remove-sauce-labs-backpack]",
    2: "[data-test=remove-sauce-labs-bike-light]",
    3: "[data-test=remove-sauce-labs-bolt-t-shirt]",
    4: "[data-test=remove-sauce-labs-fleece-jacket]",
    5: "[data-test=remove-sauce-labs-onesie]",
    6: "[data-test='remove-test.allthethings()-t-shirt-(red)']",
  };

  beforeEach(() => {
    cy.loginWithUI();
  });

  it("should display text 'remove' after clicking 'add to cart' button and display 'add to cart' after click 'remove'", () => {
    for (const itemNum of itemNums) {
      cy.addItemToCartWithUI(itemNum);
      cy.get(itemRemoveLocators[itemNum])
        .should("contain.text", "Remove")
        .click();

      cy.get(itemAddToCartLocators[itemNum]).should(
        "contain.text",
        "Add to cart"
      );
    }
  });

  it("should increase the item amount number on badge after adding an item to cart", () => {
    for (const itemNum of itemNums) {
      cy.addItemToCartWithUI(itemNum);
      cy.get(".shopping_cart_badge").should("contain.text", itemNum);
    }
  });

  it("should decrease the item amount number on badge after removing an item from cart", () => {
    for (const itemNum of itemNums) {
      cy.addItemToCartWithUI(itemNum);
    }

    for (const itemNum of itemNums.reverse()) {
      cy.removeItemFromCartWithUI(itemNum);

      // Do not check for 0, check for '' instead as badge will not exist.
      let itemNumOnBadge = itemNum - 1 === 0 ? "" : itemNum - 1;
      itemNumOnBadge
        ? cy.get(".shopping_cart_badge").should("contain.text", itemNumOnBadge)
        : cy.get(".shopping_cart_badge").should("not.exist");
    }
  });
});
