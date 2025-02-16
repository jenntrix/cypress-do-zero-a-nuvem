it('testa a página da política de privacidade de forma independente', () => {

    cy.visit('./src/privacy.html') //Isso e o q significa testar una pagina independente, visitando ela aparte.

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
    .should('be.visible')

    cy.contains('p', 'Talking About Testing')
      .should('be.visible')
})