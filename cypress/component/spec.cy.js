import App from "../../src/App";

describe("NewsLetterSubscription.cy.js", () => {
  it("Should display a placeholder in the input field", () => {
    cy.mount(<App />);
    cy.get("input[id='amount']").should(
      "have.attr",
      "placeholder",
      "enter a number"
    );
  });

  it("Should display error for non-numeric input in amount field", () => {
    cy.mount(<App />);
    cy.get("input[id='amount']").type("test");
    cy.get("button[id='convert']").click();
    cy.get("[id='error']")
      .should("exist")
      .contains("enter a number");
  });

  it("Should calculate and display the converted amount", () => {
    cy.mount(<App />);
    cy.get("input[id='amount']").type("100");
    cy.get("select[id='currency1']").select("USD");
    cy.get("select[id='currency2']").select("EUR");
    cy.get("button[id='convert']").click();
    cy.get("div[id='converted-amount']").should("contain", /^\d+(\.\d{1,4})?$/);
  });

  it("Should have UAH as an option in the select of base currency", () => {
    cy.mount(<App />);
    cy.get("span[id='tab-1']").click();
    cy.get("select")
      .find("option[value='UAH']")
      .should("exist"); 
  });

});
