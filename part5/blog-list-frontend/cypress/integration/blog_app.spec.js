/* eslint "prefer-arrow-callback": [0]*/ 
// exercises 5.17 through 5.22 are covered in this file

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:4000/api/testing/reset');
  
    const user = {
      username: 'tester',
      name: 'Tester McTesterson',
      password: 'testing123'
    }

    cy.request('POST', 'http://localhost:4000/api/users/', user);

    cy.visit('http://localhost:3000');
  });
  
  // test for 5.17. checks if login form is displayed on page load
  it('Login form is displayed', function() {
    cy.contains('Sign In');
    cy.contains('Log In');
  });

  // describe block added for 5.18
  describe('Login', function() {
    it('login succeeds with valid credentials', function() {
      cy.get('#username').type('tester');
      cy.get('#password').type('testing123');
      cy.get('#login-button').click();
      // check that the proper notification is displayed for a successful login
      cy.contains('Successfully logged in as Tester McTesterson');
      cy.contains('Blogs');
    });

    it('login fails with invalid credentials', function() {
      cy.get('#username').type('tester');
      cy.get('#password').type('testing125');
      cy.get('#login-button').click();

      // cy.contains('Incorrect username or password');

      // bonus exercise
      // background color is given in hex in css file. equivalent rgb value used here
      cy.get('#notification')
        .should('contain', 'Incorrect username or password')
        .and('have.css', 'background-color', 'rgb(207, 19, 19)'); 
    });
  });

  // describe block for 5.19 to check that a logged in user can submit a blog
  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('tester');
      cy.get('#password').type('testing123');
      cy.get('#login-button').click();
    });

    it('Logged in user can submit a blog', function() {
      cy.get('.toggle-button').click();
      cy.get('#title-inp').type('Testing React');
      cy.get('#author-inp').type('React Tester');
      cy.get('#url-inp').type('www.reacttester.com/1');
      cy.get('#submit-new').click();
      
      // blog display div will only contain successfully submitted blogs
      cy.get('.blog-display')
        .should('contain', 'Testing React');
    });
  });

});
