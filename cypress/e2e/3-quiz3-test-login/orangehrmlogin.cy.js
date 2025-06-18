describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC01 - Login valid', () => {
    cy.xpath('//input[@placeholder="Username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('TC02 - Login dengan username salah', () => {
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.xpath('//p[@class="oxd-text oxd-text--p oxd-alert-content-text"]').should('contain', 'Invalid credentials');
  });

  it('TC03 - Login dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC04 - Login dengan username kosong', () => {
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC05 - Login dengan password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('TC06 - Login dengan username dan password kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('have.length', 2);
    cy.get('.oxd-input-field-error-message').each(($el) => {
    cy.wrap($el).should('contain', 'Required');
    });
})
})
