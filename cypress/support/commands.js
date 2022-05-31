import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";
import { createNumArrInRange } from "./utils";
const testuserData = require("../fixtures/testuser.json");

addMatchImageSnapshotCommand({
  failureThreshold: 3,
  failureThresholdType: "percent",
});

Cypress.Commands.add("loginWithUI", (username, password) => {
  /**
   * Login the a normal user by interacting with the UI.
   */

  cy.visit("/");

  if (!username && !password) {
    cy.get("[data-test=username]").type(testuserData.username);
    cy.get("[data-test=password]").type(testuserData.password);
  } else {
    // Add username or password to input only if present
    // to accomodate for tests that require adding one
    // and leaving the other empty.
    username && cy.get("[data-test=username]").type(username);
    password && cy.get("[data-test=password]").type(password);
  }

  cy.get("[data-test=login-button]").click();
});

Cypress.Commands.add("logoutWithUI", () => {
  /**
   * Logout the usen by clicking on the logout link.
   */

  cy.get("#react-burger-menu-btn").click();
  cy.get("#logout_sidebar_link").should("be.visible").click();
});

Cypress.Commands.add("addItemToCartWithUI", (itemNum, multiple = false) => {
  /**
   * Add a specific item to the cart.
   *
   * If multiple is set to true it will add all items
   * until reaching the set itemNum. So if itemNum 4 and multiple
   * is set to true then it will add items 1, 2, 3, and 4 to cart.
   */

  // In case are not in inventory and we are on cart, we need to navigate
  // to inventory.
  cy.get("body").then((body) => {
    if (body.find("[data-test=continue-shopping]").length > 0) {
      cy.get("[data-test=continue-shopping]").click();
    }
  });

  const itemLocators = {
    1: "[data-test=add-to-cart-sauce-labs-backpack]",
    2: "[data-test=add-to-cart-sauce-labs-bike-light]",
    3: "[data-test=add-to-cart-sauce-labs-bolt-t-shirt]",
    4: "[data-test=add-to-cart-sauce-labs-fleece-jacket]",
    5: "[data-test=add-to-cart-sauce-labs-onesie]",
    6: "[data-test='add-to-cart-test.allthethings()-t-shirt-(red)']",
  };

  if (multiple) {
    for (let item of createNumArrInRange(itemNum, 1)) {
      cy.get(itemLocators[item]).click();
    }
  } else {
    cy.get(itemLocators[itemNum]).click();
  }
});

Cypress.Commands.add("removeItemFromCartWithUI", (itemNum) => {
  /**
   * Add a specific item to the cart.
   */

  const itemLocators = {
    1: "[data-test=remove-sauce-labs-backpack]",
    2: "[data-test=remove-sauce-labs-bike-light]",
    3: "[data-test=remove-sauce-labs-bolt-t-shirt]",
    4: "[data-test=remove-sauce-labs-fleece-jacket]",
    5: "[data-test=remove-sauce-labs-onesie]",
    6: "[data-test='remove-test.allthethings()-t-shirt-(red)']",
  };

  cy.get(itemLocators[itemNum]).click();
});

Cypress.Commands.add("checkoutWithUI", (upToFirstStep = false) => {
  /**
   * Goes through the checkout flow.
   *
   * The function can go through specific steps on the checkout
   * flow.
   *
   * If upToFirstStep is set to true it will complete step one
   * of the checkout flow and leave the user on step two of the flow.
   * 
   * If no arguments are passed the function will complete all steps
   * of the checkout flow and leave the user on checkout completed step.
   */

  cy.url().then((url) => {
    if (url !== "https://www.saucedemo.com/checkout-step-one.html") {
      cy.visit("https://www.saucedemo.com/checkout-step-one.html");
    }
  });

  // Step One.
  cy.get("[data-test=firstName]").type("first name");
  cy.get("[data-test=lastName]").type("last name");
  cy.get("[data-test=postalCode]").type("30-444");

  cy.get("[data-test=continue]").should("be.visible").click();
  if (upToFirstStep) return;

  // Step Two.
  cy.get("[data-test=finish]").click();
});

Cypress.Commands.add("waitForInventoryImgsToLoad", () => {
  /**
   * Waits for all the inventory images to load.
   */
  cy.get("img.inventory_item_img").each(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });
  cy.wait(500);
})