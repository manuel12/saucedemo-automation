// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  failureThreshold: 3,
  failureThresholdType: "percent",
});

import { createArrInRange } from "./utils";

const testuserData = require("../fixtures/testuser.json");

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
   * until reaching the itemNum. So if itemNum 4 and multiple
   * is set to true then it will add items 1, 2, 3, and 4 to cart.
   */

  // If we are not in inventory we are on cart, and we need to navigate
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
    for (let item of createArrInRange(itemNum, 1)) {
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

Cypress.Commands.add("checkoutWithUI", ({
  onlyFirstStep = false,
  onlySecondStep = false,
}) => {
  /**
   * Go through the checkout flow.
   */

  cy.url().then((url) => {
    if(url !== "https://www.saucedemo.com/checkout-step-one.html") {
      cy.visit("https://www.saucedemo.com/checkout-step-one.html");
    }    
  })

  
  // Step One.
  cy.get("[data-test=firstName]").type("first name");
  cy.get("[data-test=lastName]").type("last name");
  cy.get("[data-test=postalCode]").type("30-444");

  cy.get("[data-test=continue]").should("be.visible").click();
  if(onlyFirstStep) return;

  // Step Two.
  cy.get("[data-test=finish]").click();
  if(onlySecondStep) return;
  
  // Complete!
  cy.get(".header_secondary_container").should("be.visible");
});
