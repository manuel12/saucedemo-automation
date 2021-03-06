/// <reference types="cypress" />

import {
  sortAscending,
  sortDescending,
  getNumValuesFromPricesArr,
} from "../../support/utils";

describe("Inventory Filter", () => {
  let itemNames = [];
  let itemPrices = [];
  let itemNumPrices = [];

  const pushElementTextToArr = (element, arr) => {
    return cy.get(element).each(($el) => {
      cy.get($el)
        .invoke("text")
        .then((text) => {
          arr.push(text);
        });
    });
  };

  beforeEach(() => {
    itemNames = [];
    itemPrices = [];

    cy.loginWithUI();
    pushElementTextToArr(".inventory_item_name", itemNames);
    pushElementTextToArr(".inventory_item_price", itemPrices).then(() => {
      itemNumPrices = getNumValuesFromPricesArr(itemPrices);
    });
  });

  it("should order inventory items from z to a when selecting such option", () => {
    const zToAItemNames = [];

    cy.get("[data-test=product_sort_container]").select("Name (Z to A)");
    pushElementTextToArr(
      ":nth-child(1) > .inventory_item_name",
      zToAItemNames
    ).then(() => {
      expect(zToAItemNames).to.deep.equal(itemNames.reverse());
    });

    cy.waitForInventoryImgsToLoad();
    cy.get("#inventory_container").matchImageSnapshot();
  });

  it("should order inventory items from a to z when selecting such option", () => {
    const aToZItemNames = [];

    cy.get("[data-test=product_sort_container]").select("Name (Z to A)");
    cy.get("[data-test=product_sort_container]").select("Name (A to Z)");

    pushElementTextToArr(
      ":nth-child(1) > .inventory_item_name",
      aToZItemNames
    ).then(() => {
      expect(aToZItemNames).to.deep.equal(itemNames);
    });

    cy.waitForInventoryImgsToLoad();
    cy.get("#inventory_container").matchImageSnapshot();
  });

  it("should order inventory items from price low to high when selecting such option", () => {
    let lowToHighPricesStrValues = [];

    cy.get("[data-test=product_sort_container]").select("Price (low to high)");

    pushElementTextToArr(
      ".inventory_item_price",
      lowToHighPricesStrValues
    ).then(() => {
      const lowToHighPricesNumValues = getNumValuesFromPricesArr(
        lowToHighPricesStrValues
      );
      expect(lowToHighPricesNumValues).to.deep.equal(
        itemNumPrices.sort(sortAscending)
      );
    });

    cy.waitForInventoryImgsToLoad();
    cy.get("#inventory_container").matchImageSnapshot();
  });

  it("should order inventory items from price high to low when selecting such option", () => {
    let highToLowPricesStrValues = [];

    cy.get("[data-test=product_sort_container]").select("Price (low to high)");
    cy.get("[data-test=product_sort_container]").select("Price (high to low)");

    pushElementTextToArr(
      ".inventory_item_price",
      highToLowPricesStrValues
    ).then(() => {
      const highToLowPricesNumValues = getNumValuesFromPricesArr(
        highToLowPricesStrValues
      );
      expect(highToLowPricesNumValues).to.deep.equal(
        itemNumPrices.sort(sortDescending)
      );
    });

    cy.waitForInventoryImgsToLoad();
    cy.get("#inventory_container").matchImageSnapshot();
  });
});
