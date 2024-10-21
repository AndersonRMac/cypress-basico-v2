Cypress.Commands.add('fillMandatoryFieldsAndSubmit',() => {
    cy.get('#firstName').type('Anderson');
    cy.get('#lastName').type('Maciel');
    cy.get('#email').type('anderson.maciel@gmail.com');
    cy.get('#open-text-area').type('TESTE ANDERSON');
    cy.contains('.button', 'Enviar').click();
});