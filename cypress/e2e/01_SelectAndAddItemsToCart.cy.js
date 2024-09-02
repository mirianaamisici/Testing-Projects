const vars = Cypress.env();

import { getRandomItem } from "../support/utils";
import {
  sizeSelectors,
  colorSelectors,
  quatityArray,
} from ".././fixtures/selectors";

describe("Selecting items from different ways and add them to cart", () => {
  beforeEach(() => {
    //visit the page
    cy.visitMainPage(vars.mainPage);
  });

  it("Browse items from header menu and add it to the cart", () => {
    //select tops subcatagory from women category
    cy.selectAddItemsToCart("Header menu");

    cy.get(".message-success", { timeout: 5000 }).should(
      "contain.text",
      "You added Breathe-Easy Tank to your shopping cart."
    );

    //verify the cart counter from the header
    //use the stored value from window object from the command selectAddItemsToCart
    cy.window().then((window) => {
      cy.get(".counter-label").should("contain.text", window.randomQuantity);
    });
  });

  it("Serach for a specific item in the serach box and add it to the cart", () => {
    //this command use the search method to add the item to cart
    cy.selectAddItemsToCart("Search");

    //verify the sucsess message
    cy.get(".message-success", { timeout: 5000 }).should(
      "contain.text",
      "You added Olivia 1/4 Zip Light Jacket to your shopping cart."
    );

    //verify the cart counter from the header
    //use the stored value from window object from the command selectAddItemsToCart
    cy.window().then((window) => {
      cy.get(".counter-label").should("contain.text", window.randomQuantity);
    });
  });

  it("Serach for a specific item in the serach box and add it to the cart using directly from the main page", () => {
    //search for a specific product
    cy.get("#search").type("Olivia 1/4 Zip Light Jacket{enter}");

    //select a random size
    const randomSizeSelector = getRandomItem(sizeSelectors);
    cy.get(randomSizeSelector).first().click();

    //select a random color
    const randomcolorSelectors = getRandomItem(colorSelectors);
    cy.get(randomcolorSelectors).first().click();

    //click on add to cart
    cy.contains("Add to Cart").first().click({ force: true });
    cy.wait(2000);

    //verify the sucsess message
    cy.get(".message-success", { timeout: 5000 }).should(
      "contain.text",
      "You added Olivia 1/4 Zip Light Jacket to your shopping cart."
    );

    //verify the cart counter from the header
    cy.get(".counter-label").should("contain.text", "1");
  });
});
