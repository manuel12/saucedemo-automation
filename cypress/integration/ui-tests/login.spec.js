/// <reference types="cypress" />

const validUsernames = [
  "standard_user",
  "locked_out_user",
  "problem_user",
  "performance_glitch_user",
];

const username = validUsernames[0];
const password = "secret_sauce";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  for (const username of validUsernames) {
    if (username === "locked_out_user") {
      it(`should NOT login with username: ${username}`, () => {
        cy.loginWithUI(username, password);

        cy.url().should("eq", Cypress.config().baseUrl);
        cy.get(".login_wrapper").should("be.visible");
        cy.get("form > :nth-child(1) > .svg-inline--fa").should("be.visible");

        cy.get(".error-message-container")
          .should("be.visible")
          .and(
            "contain.text",
            "Epic sadface: Sorry, this user has been locked out."
          )
          .matchImageSnapshot();
      });
    } else {
      it(`should login with username: ${username}`, () => {
        cy.loginWithUI(username, password);

        cy.waitForInventoryImgsToLoad();
        cy.get("#header_container").should("be.visible");
        cy.get("#inventory_container")
          .should("be.visible")
          .matchImageSnapshot();
      });
    }
  }

  it("shoud NOT login when leaving username empty", () => {
    cy.loginWithUI(null, password);

    cy.url().should("eq", Cypress.config().baseUrl);
    cy.get(".login_wrapper").should("be.visible");

    cy.get("form > :nth-child(1) > .svg-inline--fa").should("be.visible");

    cy.get(".error-message-container")
      .should("be.visible")
      .and("contain.text", "Epic sadface: Username is required")
      .matchImageSnapshot();
  });

  it("shoud NOT login when leaving password empty", () => {
    cy.loginWithUI(username, null);

    cy.url().should("eq", Cypress.config().baseUrl);
    cy.get(".login_wrapper").should("be.visible");

    cy.get("form > :nth-child(1) > .svg-inline--fa").should("be.visible");

    cy.get(".error-message-container")
      .should("be.visible")
      .and("contain.text", "Epic sadface: Password is required")
      .matchImageSnapshot();
  });

  it("should NOT login when username or password are invalid", () => {
    const usernamePasswordCombinations = [
      {
        user: "invalidUsername",
        pass: password,
      },
      {
        user: username,
        pass: "invalidPassword",
      },
    ];

    for (const userPassCombiantion of usernamePasswordCombinations) {
      cy.loginWithUI(userPassCombiantion.user, userPassCombiantion.pass);

      cy.url().should("eq", Cypress.config().baseUrl);
      cy.get(".login_wrapper").should("be.visible");

      cy.get("form > :nth-child(1) > .svg-inline--fa").should("be.visible");
      cy.get("form > :nth-child(2) > .svg-inline--fa").should("be.visible");

      cy.get(".error-message-container")
        .should("be.visible")
        .and(
          "contain.text",
          "Epic sadface: Username and password do not match any user in this service"
        )
        .matchImageSnapshot();
    }
  });

  it("should remove all error labels from form after clicking (x) button", () => {
    cy.loginWithUI("invalidUsername", "invalidPassword");

    cy.get("form > :nth-child(1) > .svg-inline--fa").should("be.visible");
    cy.get("form > :nth-child(2) > .svg-inline--fa").should("be.visible");

    cy.get(".error-message-container")
      .should("be.visible")
      .and(
        "contain.text",
        "Epic sadface: Username and password do not match any user in this service"
      );

    cy.get(".error-button").should("be.visible").click();
    cy.get(".error-button").should("not.exist");

    cy.get("form > :nth-child(1) > .svg-inline--fa").should("not.exist");
    cy.get("form > :nth-child(2) > .svg-inline--fa").should("not.exist");

    cy.get(".login_wrapper-inner").matchImageSnapshot();
  });
});
