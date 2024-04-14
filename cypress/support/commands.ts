/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add(
  "drag",
  { prevSubject: "element" },
  (
    subject: Cypress.JQueryWithSelector<HTMLElement>,
    target: Cypress.JQueryWithSelector<HTMLElement>,
    options?: Partial<Cypress.TypeOptions>,
  ) => {
    cy.wrap(subject).trigger("dragstart").trigger("dragleave");

    if (options?.wait) {
      cy.wait(800); // it's used to see drop effect
    }
    target
      .trigger("dragenter")
      .trigger("dragover")
      // .trigger("drop")
      .trigger("dragend")
      .trigger("dropend");
  },
);

// Prevent TypeScript from reading file as legacy script
export {};
