/* eslint "prefer-arrow-callback": [0]*/ 
// exercises 5.17 through 5.22 are covered in this file

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:4000/api/testing/reset');
    cy.visit('http://localhost:3000');
  });
  
  // test for 5.17. checks if login form is displayed on page load
  it('Login form is displayed', function() {
    cy.contains('Sign In');
    cy.contains('Log In');
  });
});
