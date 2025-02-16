/*describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})*/
 
  describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
      cy.visit('/src/index.html');
    })
  
   it('verifica o título da aplicação', () => {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    }) 

  it('Preenche os campos obrigatórios e envia o formulário', () => {

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('Jenn')
    cy.get('#lastName').type('Peres')
    cy.get('#email').type('jennperes@supermail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  }) 

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Jenn')
    cy.get('#lastName').type('Peres')
    cy.get('#email').type('jennperes')
    cy.get('#open-text-area').type('Legal')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  }) 

  it('campo telefone cotinua vazio quando preenchido com um valor nao-numerico', () => {

    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')

  }) 

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Jenn')
    cy.get('#lastName').type('Peres')
    cy.get('#email').type('jennperes@supermail.com')
    cy.get('#phone-checkbox').click();
    cy.get('#open-text-area').type('Legal')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  }) 

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
      .type('Jenn')
      .should('have.value','Jenn')
      .clear()
      .should('have.value','')

    cy.get('#lastName')
      .type('Peres')
      .should('have.value','Peres')
      .clear()
      .should('have.value','')

    cy.get('#email')
      .type('jennperes@supermail.com')
      .should('have.value','jennperes@supermail.com')
      .clear()
      .should('have.value','')

    cy.get('#phone')
      .type('8495331713')
      .should('have.value','8495331713')
      .clear()
      .should('have.value','')

    cy.get('#open-text-area')
      .type('Legal')
      .should('have.value','Legal')
      .clear()
      .should('have.value','')

  }) 

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  }) 

  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  }) 

  it('envia o formuário com diferentes valores com sucesso usando um comando customizado', () => {

    const data = {
      firstName: 'Isis',
      lastName: 'Herrera',
      email: 'isisherrera@supermail.com',
      text: 'Text.'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')

  }) 

  it('envia o formuário com valores default com sucesso usando um comando customizado', () => {

    /*const data = {
      firstName: 'Isis',
      lastName: 'Herrera',
      email: 'isisherrera@supermail.com',
      text: 'Text.'
    }*/

    cy.fillMandatoryFieldsAndSubmit() //No esta pasando nada entonces agarra el valor default que hice en data de John Doe.

    cy.get('.success').should('be.visible')

  }) 

  it('Para o botao, usar cy.contains() no lugar do cy.get()', () => {

    cy.get('#firstName').type('Jenn')
    cy.get('#lastName').type('Peres')
    cy.get('#email').type('jennperes@supermail.com')
    cy.get('#open-text-area').type('Legal')
    cy.contains('button', 'Enviar').click() //tambien funciona cy.contains('Enviar').click() | cy.get('#white-background > form > button').contains('Enviar').click()

  }) 

  /* AULA 3 */

  it('seleciona um produto (YouTube) por seu texto', () => {

    cy.get('#product')
      .select('YouTube') 
      .should('have.value', 'youtube')

  })  

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })
  
  it('seleciona um produto (Blog) por seu índice', () => {

    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  }) 

  /* AULA 4 */

  it('marca o tipo de atendimento "Feedback"', () => {

    cy.get('input[type=radio][value=feedback]')
      .check()
      .should('be.checked')
  }) 

  it('marca cada tipo de atendimento', () => {

    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
      
  }) 

/* AULA 5 */

it('marca ambos checkboxes, depois desmarca o último', () => {

  cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')

  /*cy.get('#email-checkbox')
    .check()
    .should('be.checked')
  
    cy.get('#phone-checkbox')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')*/

    })

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

  cy.get('#phone-checkbox')
      .check()
      .should('be.checked')

  cy.get('button[type="submit"]').click()

  cy.get('.error').should('be.visible')
    
  })

  /* AULA 6 */

it('seleciona um arquivo da pasta fixtures', () => {

  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
            })
        
})    
  
it('seleciona um arquivo simulando um drag-and-drop', () => {
     
  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})  
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
          })
              
})    

          
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
     
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
    .selectFile('@sampleFile')  
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
      })
                
})    

  /* AULA 7 */

it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  
  //cy.get('#privacy > a')
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      //.and('have.attr', 'target', '_blank')    
})    

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {

  /*cy.get('#privacy > a').invoke('removeAttr', 'target')
    .click()*/

    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')

})


}) 

