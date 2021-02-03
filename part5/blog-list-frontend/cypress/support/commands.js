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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('addNote', (
  title = 'Testing React',
  author = 'React Tester',
  url = 'www.reacttester.com/1'
) => {
  cy.get('.toggle-button').click();
  cy.get('#title-inp').type(title);
  cy.get('#author-inp').type(author);
  cy.get('#url-inp').type(url);
  cy.get('#submit-new').click();
});

Cypress.Commands.add('signIn', (username, password) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});

Cypress.Commands.add('deleteOne', () => {
  cy.get('.delete-blog').click();
  cy.on('window:alert', (str) => {
    expect(str).to.equal('Delete this Blog?')
  })
  cy.on('window:confirm', () => true);
})