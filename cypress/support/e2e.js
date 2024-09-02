// Import commands.js using ES2015 syntax:
import "./commands";
import "./utils";

//error listener
Cypress.on("uncaught:exception", (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});
