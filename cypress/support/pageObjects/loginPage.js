import loginData from "../../fixtures/loginData.json";

class loginPage {
    visit(){
        cy.visit('/web/index.php/auth/login')
    }
    inputUser(username){
        cy.xpath('//input[@placeholder="Username"]').should('be.visible')
        cy.xpath('//input[@placeholder="Username"]').clear()

    if (username !== '') {
        cy.xpath('//input[@placeholder="Username"]').type(username).should('have.value', username)
    }
    }
    inputPass(password){
        cy.get('input[name="password"]').should('be.visible')
        cy.get('input[name="password"]').clear()
        
    if (password !== '') {
        cy.get('input[name="password"]').type(password).should('have.value',password) 
    }
          
    }
    login_btn(){
        cy.get('button[type="submit"]').should('be.visible')
        cy.get('button[type="submit"]').click()
    }
    VerifyLoginSuccess(){
        cy.url().should('include', '/dashboard')
    }
    verifyBaseURL(){
        cy.url().should('include','orangehrmlive')
        cy.title().should('include','OrangeHRM')
    }
    VerifyLoginError(){
        cy.xpath('//p[@class="oxd-text oxd-text--p oxd-alert-content-text"]').should('contain', 'Invalid credentials')
    }
    verifyEmptyInput(){
        cy.get('.oxd-input-field-error-message').should('contain', 'Required');
    }
}

export default new loginPage
