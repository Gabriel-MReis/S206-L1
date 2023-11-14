Feature: testando API Pokemon

Background: Executa antes do cada teste
    * def url_base = 'https://pokeapi.co/api/v2/'

Scenario: Testando retorno.
        Given url "https://pokeapi.co/api/v2/pokemon/pikachu"
        When method get
        Then status 200

Scenario: Testando retorno com informações inválidas.
        Given url "https://pokeapi.co/api/v2/pokemon/pikachu/1234"
        When method get
        Then status 404

Scenario: Testando retorno pikachu e JSON.
        Given url url_base
        And path 'pokemon/pikachu'
        When method get
        Then status 200
        And match response.name == "pikachu"
        And match response.id == 25

Scenario: Testando retorno pokemon red entrando em um dos elementos do array de idiomas e testando retorn JSON.
        Given url url_base
        And path 'version/1/'
        When method get
        Then status 200
        And def idioma = $.names[5].language.url
        And print idioma
        And url idioma
        When method get
        Then status 200
        And match response.name == "es"
        And match response.id == 7