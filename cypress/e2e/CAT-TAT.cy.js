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
    cy.contains('.button', 'Enviar').click();
    cy.get('.success > strong').contains('Mensagem enviada com sucesso').should('be.visible')
  });
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Anderson',{delay: 200})
    cy.get('#lastName').type('Maciel', {delay: 100})
    cy.get('#email').type('anderson.maciel@gmail.')
    cy.get('#open-text-area').type('TESTE ANDERSON')
    cy.contains('.button', 'Enviar').click();
    cy.get('.error > strong').contains('Valide os campos obrigatórios!').should('be.visible')

  });
  it('Teste: Campo telefone deve apenas aceitar valores numericos', () => {
    cy.get('#phone')
      .type('texto')
      .should('have.value', '');


    cy.get('#phone')
      .type('123')
      .should('have.value', '123')
  });

  it('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulario', () => {
    cy.get('#firstName').type('Anderson',{delay: 200})
    cy.get('#lastName').type('Maciel', {delay: 100})
    cy.get('#email').type('anderson.maciel@gmail.')
    cy.get('#open-text-area').type('TESTE ANDERSON')
    cy.contains('.button', 'Enviar').click();
    cy.get('.error > strong').contains('Valide os campos obrigatórios!').should('be.visible')
  });

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName').type('Anderson',{delay: 200}).should('have.value', 'Anderson').clear().should('have.value', '');    
    cy.get('#lastName').type('Maciel', {delay: 100}).should('have.value', 'Maciel').clear().should('have.value', '');    
    cy.get('#email').type('anderson.maciel@gmail.com').should('have.value', 'anderson.maciel@gmail.com').clear().should('have.value', '');
    cy.get('#phone').type('123').should('have.value', '123').clear().should('have.value', '');
    
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.contains('.button', 'Enviar').click();
    cy.get('.error').should('be.visible')

  });
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible')
  });
  it.only('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('youtube')
    .should('have.value', 'Youtube');

  });

})