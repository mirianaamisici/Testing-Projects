const vars = Cypress.env();
let totalPrice = "";

describe("Add items to cart and place the order using different ways", () => {
  beforeEach(() => {
    //visit the page
    cy.visitMainPage(vars.mainPage);
  });

  it("Add items to cart and place the order using the button from shopping cart page", () => {
    //this command use the search method to add the item to cart
    cy.selectAddItemsToCart("Search");

    //click on the link from the confirmation message
    cy.accessTheShoppingCart("Confirmation message");
    cy.wait(2000);

    //save the price
    cy.get(".col.subtotal .price")
      .invoke("text")
      .then((price) => {
        totalPrice = price;
      });

    //click on proceed with checkout button
    cy.contains("Proceed to Checkout").click({ force: true });

    //wait so the page will load
    cy.awaitPageLoader();

    //check the url redirect
    cy.url().should("include", "/checkout/#shipping");

    //check main parts of the page
    cy.get(".step-title").first().should("have.text", "Shipping Address");
    cy.get(".step-title").last().should("have.text", "Shipping Methods");

    //complete the form in checkout page
    cy.get("#customer-email")
      .type("elena@gmail.com{enter}")
      .should("have.value", "elena@gmail.com");
    cy.get('[name="firstname"]')
      .type("Elena{enter}")
      .wait(1000)
      .should("have.value", "Elena");
    cy.get('[name="lastname"]')
      .type("Ilie{enter}")
      .wait(1000)
      .should("have.value", "Ilie");
    cy.get('[name="company"]')
      .type("CVP{enter}")
      .wait(1000)
      .should("have.value", "CVP");
    cy.get('[name="street[0]"]')
      .type("W 12th Ave{enter}")
      .wait(1000)
      .should("have.value", "W 12th Ave");
    cy.get('[name="city"]')
      .type("Anchorage{enter}")
      .wait(1000)
      .should("have.value", "Anchorage");
    cy.get('[name="region_id"]').select("Alaska");
    cy.get('[name="postcode"]')
      .type("12345-6789{enter}")
      .wait(1000)
      .should("have.value", "12345-6789");
    cy.get('[name="telephone"]')
      .type("907-456-9789{enter}")
      .wait(1000)
      .should("have.value", "907-456-9789");
    cy.get(".radio").first().click();

    //click on the next button
    cy.contains("Next").click();

    //wait so the page will load
    cy.get(".loading-mask").should("not.be.visible");

    //check the url redirect
    cy.url().should("include", "/checkout/#payment");

    //check main parts of the page
    cy.get(".step-title").eq(2).should("contain.text", "Payment Method");
    cy.get(".title").first().should("contain.text", "Order Summary");
    cy.get(".shipping-information-title")
      .first()
      .should("contain.text", "Ship To:");
    cy.get(".shipping-information-title")
      .last()
      .should("contain.text", "Shipping Method:");

    //billing details
    cy.get(".billing-address-details")
      //I used this method to remove the /n from cypress run
      .invoke("text")
      .then((text) => {
        const newText = text
          .replace(/\n/g, " ") // replace newlines with spaces
          .replace(/\s+/g, " ") // replace multiple spaces with a single space
          .trim();
        expect(newText).to.contain(
          "Elena Ilie W 12th Ave Anchorage, Alaska 12345-6789 United States 907-456-9789"
        );
      });

    //verify total price
    cy.get(".amount .price")
      .eq(2)
      .then((element) => {
        cy.wrap(element).should("not.contain", totalPrice);
      });

    //verify shipping details and shipping method
    cy.get(".shipping-information-content")
      //I used this method to remove the /n from cypress run
      .invoke("text")
      .then((text) => {
        const newText = text
          .replace(/\n/g, " ") // replace newlines with spaces
          .replace(/\s+/g, " ") // replace multiple spaces with a single space
          .trim();

        expect(newText).to.contain(
          "Elena Ilie W 12th Ave Anchorage, Alaska 12345-6789 United States 907-456-9789"
        );
      });
    cy.get(".shipping-information-content")
      .last()
      .should("contain.text", "Best Way - Table Rate");
  });

  it("Add items to cart and place the order using the button from mini-cart from the header", () => {
    //this command use the search method to add the item to cart
    cy.selectAddItemsToCart("Search");

    //click on mini-cart
    cy.accessTheShoppingCart("Mini-Cart");

    //save the price
    cy.get(".subtotal .price")
      .invoke("text")
      .then((price) => {
        totalPrice = price;
      });

    //click on proceed with checkout button
    cy.contains("Proceed to Checkout").click({ force: true });

    //wait so the page will load
    cy.awaitPageLoader();

    //check the url redirect
    cy.url().should("include", "/checkout/#shipping");

    //check main parts of the page
    cy.get(".step-title").first().should("have.text", "Shipping Address");
    cy.get(".step-title").last().should("have.text", "Shipping Methods");

    //complete the form in checkout page
    cy.get("#customer-email")
      .type("elena@gmail.com{enter}")
      .should("have.value", "elena@gmail.com");
    cy.get('[name="firstname"]')
      .type("Elena{enter}")
      .wait(1000)
      .should("have.value", "Elena");
    cy.get('[name="lastname"]')
      .type("Ilie{enter}")
      .wait(1000)
      .should("have.value", "Ilie");
    cy.get('[name="company"]')
      .type("CVP{enter}")
      .wait(1000)
      .should("have.value", "CVP");
    cy.get('[name="street[0]"]')
      .type("W 12th Ave{enter}")
      .wait(1000)
      .should("have.value", "W 12th Ave");
    cy.get('[name="city"]')
      .type("Anchorage{enter}")
      .wait(1000)
      .should("have.value", "Anchorage");
    cy.get('[name="region_id"]').select("Alaska");
    cy.get('[name="postcode"]')
      .type("12345-6789{enter}")
      .wait(1000)
      .should("have.value", "12345-6789");
    cy.get('[name="telephone"]')
      .type("907-456-9789{enter}")
      .wait(1000)
      .should("have.value", "907-456-9789");
    cy.get(".radio").first().click();

    //click on the next button
    cy.contains("Next").click();

    //wait so the page will load
    cy.get(".loading-mask").should("not.be.visible");

    //check the url redirect
    cy.url().should("include", "/checkout/#payment");

    //check main parts of the page
    cy.get(".step-title").eq(2).should("contain.text", "Payment Method");
    cy.get(".title").first().should("contain.text", "Order Summary");
    cy.get(".shipping-information-title")
      .first()
      .should("contain.text", "Ship To:");
    cy.get(".shipping-information-title")
      .last()
      .should("contain.text", "Shipping Method:");

    //billing details
    cy.get(".billing-address-details")
      //I used this method to remove the /n from cypress run
      .invoke("text")
      .then((text) => {
        const newText = text
          .replace(/\n/g, " ") // replace newlines with spaces
          .replace(/\s+/g, " ") // replace multiple spaces with a single space
          .trim();
        expect(newText).to.contain(
          "Elena Ilie W 12th Ave Anchorage, Alaska 12345-6789 United States 907-456-9789"
        );
      });

    //verify total price
    cy.get(".amount .price")
      .eq(2)
      .then((element) => {
        cy.wrap(element).should("not.contain", totalPrice);
      });

    //verify shipping details and shipping method
    cy.get(".shipping-information-content")
      //I used this method to remove the /n from cypress run
      .invoke("text")
      .then((text) => {
        const newText = text
          .replace(/\n/g, " ") // replace newlines with spaces
          .replace(/\s+/g, " ") // replace multiple spaces with a single space
          .trim();

        expect(newText).to.contain(
          "Elena Ilie W 12th Ave Anchorage, Alaska 12345-6789 United States 907-456-9789"
        );
      });
    cy.get(".shipping-information-content")
      .last()
      .should("contain.text", "Best Way - Table Rate");
  });

  //!!!I added only 2 cases of treating the errors!!!
  it("Add items to cart and and check errors from checkout page", () => {
    //this command use the search method to add the item to cart
    cy.selectAddItemsToCart("Search");

    //click on the link from the confirmation message
    cy.accessTheShoppingCart("Confirmation message");
    cy.wait(2000);

    //click on proceed with checkout button
    cy.contains("Proceed to Checkout").click({ force: true });

    //wait so the page will load
    cy.awaitPageLoader();

    //check the url redirect
    cy.url().should("include", "/checkout/#shipping");

    //check main parts of the page
    cy.get(".step-title").first().should("have.text", "Shipping Address");
    cy.get(".step-title").last().should("have.text", "Shipping Methods");

    //add an invalid term for email field and do not complete any other fields
    cy.get("#customer-email")
      .type("notanemail{enter}")
      .should("have.value", "notanemail");

    //click on the next button
    cy.contains("Next").click();

    //wait so the page will load
    cy.awaitPageLoader();

    //check the errors
    cy.get("#customer-email-error").should(
      "contain.text",
      "Please enter a valid email address (Ex: johndoe@domain.com)."
    );

    //check error for missing shipping method
    cy.get(".message span").should(
      "contain.text",
      "The shipping method is missing. Select the shipping method and try again."
    );

    //select shipping method and press next
    cy.get(".radio").first().click();

    //click on the next button
    cy.contains("Next").click();

    //wait so the page will load
    cy.awaitPageLoader();

    //check the rest of the errors for the inputs
    cy.get(".field-error").each((element) => {
      cy.wrap(element).should("contain.text", "This is a required field.");
    });
  });
});
