const vars = Cypress.env();
let totalPrice = "";

describe("Add items to cart and update the order from the shopping cart", () => {
  beforeEach(() => {
    //visit the page
    cy.visitMainPage(vars.mainPage);
  });

  it("Add items to cart and update the quantity from the shopping cart", () => {
    //command to select and add items to cart
    cy.selectAddItemsToCart("Search");

    //click on the link from the confirmation message
    cy.accessTheShoppingCart("Confirmation message");

    //save the initial price
    cy.get(".col.subtotal .price")
      .invoke("text")
      .then((price) => {
        totalPrice = price;
      });

    //update the quantity
    cy.get(".input-text.qty").type("3");

    //click on update shopping cart button
    cy.contains("Update Shopping Cart").click();

    //wait so the page will load
    cy.get(".loading-mask").should("not.exist");

    //check the price was updated
    cy.get(".col.subtotal .price").then((element) => {
      cy.wrap(element).should("not.contain", totalPrice);
    });
  });

  it("Add items to cart and navigate back to the product page using the pencil icon", () => {
    //command to select and add items to cart
    cy.selectAddItemsToCart("Search");

    //click on the link from the confirmation message
    cy.accessTheShoppingCart("Confirmation message");

    //click on the pencil icon
    cy.get(".action.action-edit").click();

    //verify the user is redirected to the product page
    cy.url().should("include", "/checkout/cart/configure");
  });

  it("Add items to cart and delete a product from the shopping cart", () => {
    //command to select and add items to cart
    cy.selectAddItemsToCart("Search");

    //click on the link from the confirmation message
    cy.accessTheShoppingCart("Confirmation message");

    //click on the delete icon
    cy.get(".action-delete").click();

    //wait so the page will load
    cy.get(".loading-mask").should("not.exist");

    //verify the item was deleted
    cy.get(".cart-empty").should(
      "contain.text",
      "You have no items in your shopping cart."
    );
  });
});
