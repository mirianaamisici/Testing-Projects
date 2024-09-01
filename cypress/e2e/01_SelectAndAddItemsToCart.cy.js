const vars = Cypress.env();

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
    //this command use the search to add the item to cart
    cy.selectAddItemsToCart("Search");

    //verify the sucsess message
    cy.get(".message-success").should(
      "contain.text",
      "You added Olivia 1/4 Zip Light Jacket to your shopping cart."
    );
    //verify the cart counter from the header
    //use the stored value from window object from the command selectAddItemsToCart
    cy.window().then((window) => {
      cy.get(".counter-label").should("contain.text", window.randomQuantity);
    });
  });
});
