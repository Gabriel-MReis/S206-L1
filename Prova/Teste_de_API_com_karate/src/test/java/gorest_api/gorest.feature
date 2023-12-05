Feature: Testes para a API V2 https://gorest.co.in/

Background: Executa antes dos testes
    * def url_base = 'https://gorest.co.in/public/v2/'

Scenario: Listar todos os usuários na API V2
    Given url url_base
    And path 'users'
    When method get
    Then status 200
Scenario: Verificar usuario 5710543
    Given url url_base
    And path 'users/5710543'
    When method get
    Then status 200
    And  match response.name == "Karthik Sethi"
    And match response.email == "karthik_sethi@stroman-rowe.test"
    And match response.gender == "male"
    And match response.status == "active"

Scenario: Falha na autenticacao 
    Given url url_base
    And path 'users'
    And request {name: "John Doe", gender: "male", email: "john.doe@example.com", status: "active"}
    When method post
    Then status 401

Scenario: Criar novo usuário
    Given url url_base
    And path 'users'
    And headers { Authorization: 'Bearer 5e95b75cca8feedee5ced257b5af4f48c5280150e294dfdd5edfe49ba795a6bd'}
    And request { name: "John Doe", gender: "male", email: "john.doe@example.com", status: "active" }
    When method post
    Then status 201
Scenario: Verificar posts 87749
    Given url url_base
    And path 'posts/87749'
    When method get
    Then status 200
    And  match response.user_id == "#number"
    And match response.title == "Complectus eius vesco acceptus vinculum."
    And match response.body == "#string"