# Saucedemo Automation

[![saucedemo-automation](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/2zh6uw&style=plastic&logo=cypress)](https://dashboard.cypress.io/projects/2zh6uw/runs)

A project to showcase E2E test automation done against the mock website https://www.saucedemo.com/ by https://saucelabs.com/ using [Cypress](https://www.cypress.io/).

The tests include UI and visual tests.


## Tests

| Type | Location                                 |
| ---- | ---------------------------------------- |
| UI/Visual   | [cypress/integration/ui-tests](cypress/integration/ui-tests)   |

The snapshots from visual tests can be found on [cypress/snapshots](cypress/snapshots).

## Running tests
For running the tests run:

    npm run test
For running the tests on headless mode run:

    npm run test:headless
For opening cypress client run:

    npm run test:open