// here are written the custom commands used accross multiple tests

import { getRandomItem } from "../support/utils";
import {
  sizeSelectors,
  colorSelectors,
  quatityArray,
} from ".././fixtures/selectors";

Cypress.Commands.add("visitMainPage", (pageURL) => {
  cy.visit(pageURL);
});

Cypress.Commands.add("selectAddItemsToCart", (option) => {
  if (option === "Header menu") {
    //select tops subcatagory from women category
    cy.get('[role="menuitem"]')
      .contains("Women")
      .trigger("mouseover")
      .then(() => {
        cy.get('[role="menu"]').contains("Tops").click();
      });
  }

  if (option === "Search") {
    //search for a specific product
    cy.get("#search").type("Olivia 1/4 Zip Light Jacket{enter}");
  }
  //select the first item
  cy.get(".product-item").first().click();
  cy.wait(2000);

  //select a random size
  const randomSizeSelector = getRandomItem(sizeSelectors);

  //save the variable in the window object
  //this is used in some tests for checks
  cy.window().then((window) => {
    window.randomSizeSelector = randomSizeSelector;
  });
  cy.get(randomSizeSelector).click();

  //select a random color
  const randomcolorSelectors = getRandomItem(colorSelectors);

  //save the variable in the window object
  //this is used in some tests for checks
  cy.window().then((window) => {
    window.randomcolorSelectors = randomcolorSelectors;
  });
  cy.get(randomcolorSelectors).click();

  //select random quantity between 1-10
  const randomQuantity = getRandomItem(quatityArray);

  //save the variable in the window object
  //this is used in some tests for checks
  cy.window().then((window) => {
    window.randomQuantity = randomQuantity;
  });
  cy.get("#qty").type(randomQuantity);

  //Add item to cart
  cy.contains("Add to Cart").click();
  cy.wait(2000);

  //this is a timeout added for the delay of the website when the item is aded to cart
  cy.get(".message-success", { timeout: 5000 }).should("be.visible");
});

Cypress.Commands.add("accessTheShoppingCart", (option) => {
  if (option === "Confirmation message") {
    cy.get(".message-success").contains("shopping cart").click();
  }
  if (option === "Mini-Cart") {
    cy.get(".action.showcart").click();
  }
});
