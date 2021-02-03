/* eslint "prefer-arrow-callback": [0] */
// exercises 5.17 through 5.22 are covered in this file
// all tests passing. exercises complete

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:4000/api/testing/reset');
    const user = {
      username: 'tester',
      name: 'Tester McTesterson',
      password: 'testing123',
    };

    cy.request('POST', 'http://localhost:4000/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  // test for 5.17. checks if login form is displayed on page load
  it('Login form is displayed', function () {
    cy.contains('Log In');
  });

  // describe block added for 5.18
  describe('Login', function () {
    it('login succeeds with valid credentials', function () {
      cy.signIn('tester', 'testing123');
      // check that the proper notification is displayed for a successful login
      cy.contains('Successfully logged in as Tester McTesterson');
      cy.contains('Blogs');
    });

    it('login fails with invalid credentials', function () {
      cy.signIn('tester', 'testing125');

      // cy.contains('Incorrect username or password');

      // bonus exercise
      // background color is given in hex in css file. equivalent rgb value used here
      cy.get('#notification')
        .should('contain', 'Invalid Username or Password')
        .and('have.css', 'background-color', 'red');
    });
  });

  // describe block for 5.19 to check that a logged in user can submit a blog
  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.signIn('tester', 'testing123');
    });

    it('Logged in user can submit a blog', function () {
      cy.get('.toggle-button').click();
      cy.get('#title-inp').type('Testing React');
      cy.get('#author-inp').type('React Tester');
      cy.get('#url-inp').type('www.reacttester.com/1');
      cy.get('#submit-new').click();

      // blog display div will only contain successfully submitted blogs
      cy.get('.blog-display')
        .should('contain', 'Testing React');
    });

    // test for 5.20 to confirm user can like a submitted blog
    it('User can like a blog', function () {
      cy.addNote();
      cy.get('.toggleDisplayBtn').click();
      cy.get('.blog-display')
        .should('contain', 'Likes: 0');
      cy.get('.likeButton').click();
      cy.get('.blog-display')
        .should('contain', 'Likes: 1');
    });

    // test for 5.21
    it('user can delete a blog', function() {
      // test passing
      cy.addNote();
      cy.get('.toggleDisplayBtn').click();
      cy.deleteOne();
      cy.get('#blog-list').children().should('have.length', 1);
      // the one child above should be the h2 containing 'Blogs'
    });

    // bonus exercise for 5.21
    // test passing succesfully
    it('unauthorized user cannot delete a blog', function() {
      cy.addNote();
      cy.get('#logout-button').click();
      // create new user and sign in as them
      cy.request('POST', 'http://localhost:4000/api/users/', {
        username: 'tester2',
        password: 'tester2',
        name: 'tester junior'
      });
      
      cy.signIn('tester2', 'tester2');
      cy.get('.toggleDisplayBtn').click();
      cy.deleteOne();
      cy.get('#blog-list').children().should('have.length', 2);
      // try to delete first user's blog as second user
    });

    // test for exercise 5.22. check if blogs are ordered by likes
    // test passing
    it('check that blogs are ordered by likes', () => {
      cy.addNote('Note 1', 'Axe', 'axe.com/note');
      cy.get('.blog-display:first').find('.toggleDisplayBtn').click();
      cy.get('.likeButton:first').click().click();
      cy.addNote('Note 2', 'Axe', 'axe.com/note');      
      cy.get('.blog-display:last').find('.toggleDisplayBtn').click();
      cy.get('.likeButton:last').click().click().click().click();
      // page reload needed as blogs order isn't live updated as likes are added.
      cy.reload();
      cy.get('.blog-display:first').contains('Note 2 -- Axe');
      cy.get('.blog-display:last').contains('Note 1 -- Axe');
    });
  });
});
