Feature: Home Screen
  As a user
  I want to see the home screen and a new title
  So that I can navigate through the app

  Scenario: View home screen title
    Given I am on the home screen
    When I should see the "MODAK TC" title
    And I tap on the first product
    Then I should see the product details screen
