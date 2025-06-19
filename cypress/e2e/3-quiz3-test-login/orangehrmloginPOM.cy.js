import loginPage from "../../support/pageObjects/loginPage";
import loginData from "../../fixtures/loginData.json";


describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    loginPage.visit();
    });

  it('TC01 - Login valid', () => {
    loginPage.verifyBaseURL();
    loginPage.inputUser(loginData.validUser);
    loginPage.inputPass(loginData.validPass);
    loginPage.login_btn();
    loginPage.VerifyLoginSuccess();
  });

  it('TC02 - Login dengan username salah', () => {
    loginPage.verifyBaseURL();
    loginPage.inputUser(loginData.invalidUser);
    loginPage.inputPass(loginData.validPass);
    loginPage.login_btn();
    loginPage.VerifyLoginError();
  });

  it('TC03 - Login dengan password salah', () => {
    loginPage.verifyBaseURL();
    loginPage.inputUser(loginData.validUser);
    loginPage.inputPass(loginData.invalidPass);
    loginPage.login_btn();
    loginPage.VerifyLoginError();
  });

  it('TC04 - Login dengan username kosong', () => {
    loginPage.verifyBaseURL();
    loginPage.inputUser('');
    loginPage.inputPass(loginData.validPass);
    loginPage.login_btn();
    loginPage.verifyEmptyInput();
  });

  it('TC05 - Login dengan password kosong', () => {
    loginPage.verifyBaseURL();
    loginPage.inputUser(loginData.validUser);
    loginPage.inputPass('');
    loginPage.login_btn();
    loginPage.verifyEmptyInput();
  });

  it.only('TC06 - Login dengan username dan password kosong', () => {
    loginPage.verifyBaseURL();
    loginPage.inputUser('');
    loginPage.inputPass('');
    loginPage.login_btn();
    loginPage.verifyEmptyInput();
    });
})
