/// <reference types="cypress"/>

describe('template spec', () => {

  it('Caso de teste: Login', () => {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')

    cy.get('.borderM > :nth-child(1) > .btn').click()
    cy.get('#userSelect').select('Harry Potter')
    cy.get('form.ng-valid > .btn').click()
    cy.get('.fontBig').should('have.text', 'Harry Potter')
  })

  it('Caso de teste: Depositar', () => {
    login()
    cy.get('[ng-class="btnClass2"]').click()
    cy.get('.form-control').type(100)
    cy.get('form.ng-dirty > .btn').click()
    cy.get('.error').should('have.text', 'Deposit Successful')
  })

  it('Caso de teste: Sacar', () => {
    login()
    depositar100()
    cy.get('[ng-class="btnClass3"]').click().wait(1000)
    cy.get('.form-control').click().type(50)
    cy.get('form.ng-dirty > .btn').click()
    cy.get('.error').should('have.text', 'Transaction successful')
  })

  it('Caso de teste: Sacar mais do que tem na conta', () => {
    login()
    depositar100()
    cy.get('[ng-class="btnClass3"]').click().wait(1000)
    cy.get('.form-control').click().type(500)
    cy.get('form.ng-dirty > .btn').click()
    cy.get('.error').should('have.text', 'Transaction Failed. You can not withdraw amount more than the balance.')
  })
})

function login(){
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')

    cy.get('.borderM > :nth-child(1) > .btn').click()
    cy.get('#userSelect').select('Harry Potter')
    cy.get('form.ng-valid > .btn').click()
    cy.get('.fontBig').should('have.text', 'Harry Potter')
}

function depositar100(){
    login()
    cy.get('[ng-class="btnClass2"]').click()
    cy.get('.form-control').type(100)
    cy.get('form.ng-dirty > .btn').click()
    cy.get('.error').should('have.text', 'Deposit Successful')
}