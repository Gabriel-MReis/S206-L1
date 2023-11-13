/// <reference types="cypress"/>


describe('Criando cenário de testes para o site demoblaze', () => {

  let signUpAlert = false; 
  let productAddedAlert = false;
  let loginAlert = false;

  it('Caso de teste: signup', () => {
    let randomValue = Math.floor(Math.random() * 1000000); // Gera um número aleatório entre 0 e 999999
    let user = 'user' + randomValue
    let senha = 'senha' + randomValue

    cy.visit('https://www.demoblaze.com/')
    cy.get('#signin2').click()
    cy.get('#sign-username').type(user,{ force: true })
    cy.get('#sign-password').type(senha, { force: true })
    cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Sign up successful.')
    })
  })

  it('Caso de teste: login', () => {
    let info = criarUsuario()
    cy.get('#login2').click()
    cy.get('#loginusername').type(info[0], { force: true })
    cy.get('#loginpassword').type(info[1], { force: true })
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.get('#nameofuser').should('have.text', `Welcome ${info[0]}`)
  })

  it('Caso de teste: adicionar produto no carrinho', () => {
    let info = criarUsuario()
    cy.login(info[0], info[1])
    cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click()
    cy.get('.col-sm-12 > .btn').click()
    cy.on('window:alert', (str) => {
      if (str === 'Product added.') {
        productAddedAlert = true;
        expect(str).to.equal('Product added.')
      }
    })
  })

  it('Caso de test: Remover produto do carrinho', () => {
    addProduct()
    cy.get('#cartur').click()
    cy.get('.success > :nth-child(4) > a').click()
    cy.get('#totalp').should('have.text','')
  })

  it('Caso de test: login sem o nome', () => {
    let info = criarUsuario()
    cy.get('#login2').click()
    //cy.get('#loginusername').type(info[0], { force: true })
    cy.get('#loginpassword').type(info[1], { force: true })
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.on('window:alert', (str) => {
      if (str === 'Please fill out Username and Password.') {
        loginAlert = true;
        expect(str).to.equal('Please fill out Username and Password.')
      }
    })
  })

  it('Caso de test: Comprar produto', () => {
    addProduct()
    cy.get('#cartur').click()
    cy.get('.col-lg-1 > .btn').click()
    cy.get('#name').type('user1', { force: true })
    cy.get('#country').type('country1', { force: true })
    cy.get('#city').type('city1', { force: true })
    cy.get('#card').type('1232', { force: true })
    cy.get('#month').type('11', { force: true })
    cy.get('#year').type('2023', { force: true })
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.get('.sweet-alert > h2').should('have.text','Thank you for your purchase!')
    cy.get('.confirm').click()
  })

  function criarUsuario(){

    let randomValue = Math.floor(Math.random() * 1000000); // Gera um número aleatório entre 0 e 999999
    let user = 'user' + randomValue
    let senha = 'senha' + randomValue
    let userInfo = [user, senha]

    cy.visit('https://www.demoblaze.com/')
    cy.get('#signin2').click()
    cy.get('#sign-username').type(user,{ force: true })
    cy.get('#sign-password').type(senha, { force: true })
    cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.on('window:alert', (str) => {
      if (str === 'Sign up successful.') {
        signUpAlert = true;
      }
    })
    
    return userInfo
  }

  function addProduct(){
    let info = criarUsuario()
    cy.login(info[0], info[1])
    cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click()
    cy.get('.col-sm-12 > .btn').click()
    cy.on('window:alert', (str) => {
      if (str === 'Product added.') {
        productAddedAlert = true;
        expect(str).to.equal('Product added.')
      }
    })
  }
})