const { it } = require("mocha");

describe('Central de atendimento ao cliente TAT', () => {

  beforeEach(() => {
    cy.visit('../../src/index.html')
  });
  it('Verifica o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  });

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Anderson',{delay: 200})
    cy.get('#lastName').type('Maciel', {delay: 100})
    cy.get('#email').type('anderson.maciel@gmail.com')
    cy.get('#open-text-area').type('TESTE ANDERSON')
    cy.get('.button').click();
    cy.get('.success > strong').contains('Mensagem enviada com sucesso').should('be.visible')
  });
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Anderson',{delay: 200})
    cy.get('#lastName').type('Maciel', {delay: 100})
    cy.get('#email').type('anderson.maciel@gmail.')
    cy.get('#open-text-area').type('TESTE ANDERSON')
    cy.get('.button').click();
    cy.get('.error > strong').contains('Valide os campos obrigatórios!').should('be.visible')

  });
  it('Teste: Campo telefone deve apenas aceitar valores numericos', () => {
    cy.get('#phone').type('texto');
    cy.get('#phone').should('have.value', '');

    cy.get('#phone').type('123')
    cy.get('#phone').should('have.value', '123');
  });

})