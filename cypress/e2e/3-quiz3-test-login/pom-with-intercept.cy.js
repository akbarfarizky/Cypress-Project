import loginPage from "../../support/pageObjects/loginPage";
import loginData from "../../fixtures/loginData.json";


describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    loginPage.visit();
    });

  it('TC01 - Login valid', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('loginRequest');

    loginPage.verifyBaseURL();
    loginPage.inputUser(loginData.validUser);
    loginPage.inputPass(loginData.validPass);
    loginPage.login_btn();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    loginPage.VerifyLoginSuccess();
  });

  it('TC02 - Login dengan username salah', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('LoginRequest');

    loginPage.verifyBaseURL();
    loginPage.inputUser(loginData.invalidUser);
    loginPage.inputPass(loginData.validPass);
    loginPage.login_btn();

    cy.wait('@LoginRequest').its('response.statusCode').should('eq',304);

    loginPage.VerifyLoginError();
  });

  it('TC03 - Login dengan password salah', () => {
    cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('LoginRequest');

    loginPage.verifyBaseURL();
    loginPage.inputUser(loginData.validUser);
    loginPage.inputPass(loginData.invalidPass);
    loginPage.login_btn();

    cy.wait('@LoginRequest').its('response.statusCode').should('eq',304);

    loginPage.VerifyLoginError();
  });

  it('TC04 - Login dengan username kosong', () => {
    //Jika Field kosong , tidak bisa melakukan intercept karena tidak ada pengiriman/permintaan/pertukaran data
    loginPage.verifyBaseURL();
    loginPage.inputUser('');
    loginPage.inputPass(loginData.validPass);
    loginPage.login_btn();
    loginPage.verifyEmptyInput();
  });

  it('TC05 - Login dengan password kosong', () => {
    //Jika Field kosong , tidak bisa melakukan intercept karena tidak ada pengiriman/permintaan/pertukaran data
    loginPage.verifyBaseURL();
    loginPage.inputUser(loginData.validUser);
    loginPage.inputPass('');
    loginPage.login_btn();
    loginPage.verifyEmptyInput();
  });

  it('TC06 - Login dengan username dan password kosong', () => {
    //Jika Field kosong , tidak bisa melakukan intercept karena tidak ada pengiriman/permintaan/pertukaran data
    loginPage.verifyBaseURL();
    loginPage.inputUser('');
    loginPage.inputPass('');
    loginPage.login_btn();
    loginPage.verifyEmptyInput();
    });
})
