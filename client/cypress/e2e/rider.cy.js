const faker = require('faker');

const randomEmail = faker.internet.email();

describe('The rider Dashboard', function () {
	it('Cannot be visited if the user is not a rider', function () {
		cy.intercept('POST', 'sign_up').as('signUp');
		cy.intercept('POST', 'log_in').as('logIn');
		cy.visit('/#/sign-up');
		cy.get('input#username').type(randomEmail);
		cy.get('input#firstName').type('Gary');
		cy.get('input#lastName').type('Cole');
		cy.get('input#password').type('pAssw0rd', { log: false });
		cy.get('select#group').select('driver');
		cy.get('input#photo').attachFile('images/photo.jpg');
		cy.get('button').contains('Sign up').click();
		cy.wait('@signUp');
		cy.hash().should('eq', '#/log-in');
		// log in
		cy.visit('/#/log-in');
		cy.get('input#username').type(randomEmail);
		cy.get('input#password').type('pAssw0rd', { log: false });
		cy.get('button').contains('Log in').click();
		cy.hash().should('eq', '#/');
		cy.get('button').contains('Log out');
		cy.wait('@logIn');
		cy.visit('/#/rider');
		cy.hash().should('eq', '#/');
	});
});
