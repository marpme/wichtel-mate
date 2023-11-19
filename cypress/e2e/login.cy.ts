describe("login", () => {
  it("should correctly authenticate user", () => {
    cy.visit("http://localhost:3000");

    // enter login data as redeem code
    cy.get('[data-testid="login-input-field"]').type("VWwByBEw1z");

    // login via clicking the login button
    cy.get('[data-testid="login-submit-button"]').click();

    cy.url().should("include", "/dashboard");
  });
});
