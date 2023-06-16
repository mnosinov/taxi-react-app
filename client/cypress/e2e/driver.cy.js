const faker = require('faker');

const randomEmailDriver = faker.internet.email();
const randomEmailRider = faker.internet.email();

describe('The driver Dashboard', function () {
	it('Cannot be visited if the user is not a driver', function () {
		cy.intercept('POST', 'sign_up').as('signUp');
		cy.intercept('POST', 'log_in').as('logIn');
		cy.visit('/#/sign-up');
		cy.get('input#username').type(randomEmailRider);
		cy.get('input#firstName').type('Gary');
		cy.get('input#lastName').type('Cole');
		cy.get('input#password').type('pAssw0rd', { log: false });
		cy.get('select#group').select('rider');
		cy.get('input#photo').attachFile('images/photo.jpg');
		cy.get('button').contains('Sign up').click();
		cy.wait('@signUp');
		cy.hash().should('eq', '#/log-in');
		// log in
		cy.visit('/#/log-in');
		cy.get('input#username').type(randomEmailRider);
		cy.get('input#password').type('pAssw0rd', { log: false });
		cy.get('button').contains('Log in').click();
		cy.hash().should('eq', '#/');
		cy.get('button').contains('Log out');
		cy.wait('@logIn');
		cy.visit('/#/driver');
		cy.hash().should('eq', '#/');
	});

	it('Can be visited if the user is a driver', function () {
		cy.intercept('POST', 'sign_up').as('signUp');
		cy.intercept('POST', 'log_in').as('logIn');
		cy.visit('/#/sign-up');
		cy.get('input#username').type(randomEmailDriver);
		cy.get('input#firstName').type('Gary');
		cy.get('input#lastName').type('Cole');
		cy.get('input#password').type('pAssw0rd', { log: false });
		cy.get('select#group').select('driver');
		cy.get('input#photo').attachFile('images/photo.jpg');
		cy.get('button').contains('Sign up').click();
		cy.wait('@signUp');
		cy.hash().should('eq', '#/log-in');
		cy.visit('/#/log-in');
		cy.get('input#username').type(randomEmailDriver);
		cy.get('input#password').type('pAssw0rd', { log: false });
		cy.get('button').contains('Log in').click();
		cy.hash().should('eq', '#/');
		cy.get('button').contains('Log out');
		cy.wait('@logIn');
		cy.visit('/#/driver');
		cy.hash().should('eq', '#/driver');
	});
});