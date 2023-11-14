Feature: testando API Pokemon

Background: API pokemon
    * def url_base = 'https://pokeapi.co/api/v2/'

Scenario: Testando move thunder shock do pikachu.
        Given url url_base
        And path 'pokemon/pikachu'
        When method get
        Then status 200
        And match response.name == "pikachu"
        And match response.moves[17].move.name == "thunder-shock"

Scenario: Testando tipo do marowak.
        Given url url_base
        And path 'pokemon/marowak'
        When method get
        Then status 200
        And match response.types[0].type.name == "ground"

Scenario: Testando pokemon/6.
        Given url url_base
        And path 'pokemon/6'
        When method get
        Then status 200
        And match response.name == 'charizard'