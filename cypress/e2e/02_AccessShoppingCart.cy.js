const vars = Cypress.env();

describe("Add items to cart and access shopping cart page from different ways", () => {
  beforeEach(() => {
    //visit the page
    cy.visitMainPage(vars.mainPage);
  });

  it("Add items to cart and access the shopping cart from confirmation message", () => {
    //command to select and add items to cart
    cy.selectAddItemsToCart("Search");

    //click on the link from the confirmation message
    cy.accessTheShoppingCart("Confirmation message");

    //verify the url
    cy.url().should("include", "/checkout/cart");
    //verify page title
    cy.get(".page-title").should("contain.text", "Shopping Cart");
    //verify that item exists
    cy.get(".cart.item").should("have.length", 1);
  });

  it("Add items to cart and access the shopping cart from the mini-cart from the header", () => {
    //command to select and add items to cart
    cy.selectAddItemsToCart("Search");

    //click on mini-cart
    cy.accessTheShoppingCart("Mini-Cart");

    //access the cart
    cy.contains("View and Edit Cart").click();

    //verify the url
    cy.url().should("include", "/checkout/cart");
    //verify page title
    cy.get(".page-title").should("contain.text", "Shopping Cart");
    //verify that item exists
    cy.get(".cart.item").should("have.length", 1);
  });
});
