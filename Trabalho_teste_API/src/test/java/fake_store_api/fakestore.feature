Feature:Testes para a API https://fakestoreapi.com/

Background: 
    * def url_base = 'https://fakestoreapi.com/'
Scenario:Obter a lista de produtos
    Given url url_base
    And path 'products'
    When method get
    Then status 200
    And match response == "#[]"

Scenario:Obter a lista de produtos invalida
    Given url url_base
    And path 'product'
    When method get
    Then status 404
Scenario:Obter a informacoes do produto 1
    Given url url_base
    And path 'products/1'
    When method get
    Then status 200
    And match response.title == "#string"
    And match response.price == "#number"
    And match response.description == "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"

Scenario:Obter a lista de categorias
    Given url url_base
    And path 'products/categories'
    When method get
    Then status 200
    And match response == "#[]"
    And match response == "#[4]"

Scenario:Buscar categoria inexistente
    Given url url_base
    And path 'products/categories/abacate'
    When method get
    Then status 404

Scenario:Deletando produto 1
    Given url url_base
    And path 'carts/1'
    When method delete
    Then status 200
    And match response.user_id == "#notpresent"