describe('Central de atendimento ao cliente TAT', () => {
  it('Verifica o titulo da aplicação', () => {
    
    //Entra na página da aplicação
    cy.visit('../../src/index.html')
    //Validação do título da página
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
})