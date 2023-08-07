describe('Currency Converter E2E Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should convert currency correctly', () => {
    cy.get('input[id="amount"]').type('1');
    cy.get('select[id="currency1"]').select('USD');
    cy.get('select[id="currency2"]').select('USD');
    cy.get('button[id="convert"]').click();
    cy.get('span[id="converted-amount"]').should('contain', '1');
  });

  it('Should display an error message', () => {
    cy.get('button[id="convert"]').click();
    cy.get('small[id="error"]').should('be.visible');
  });

  it('Should paint selected star in yellow', () => {
    cy.get('span[id="tab-1"]').click();
    cy.get('svg.star').first().click();
    cy.get('svg.star').first().should('have.class', 'fill-yellow-300');
  });
});

