import { expect } from '@playwright/test';

export class LoginPage {
   
    constructor(page) {
        this.page = page;
        
        // Initialize locators with CSS selectors
        this.txtEmailAddress = page.locator('#input-email');
        this.txtPassword = page.locator('#input-password');
        this.btnLogin = page.locator('input[value="Login"]');
        this.txtErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
    }

    /**
     * Sets the email address in the email field
     * @param email - Email address to enter
     */
    async setEmail(email){
        await this.txtEmailAddress.fill(email);
    }

    /**
     * Sets the password in the password field
     * @param pwd - Password to enter
     */
    async setPassword(pwd) {
        await this.txtPassword.fill(pwd);
    }

    /**
     * Clicks the login button
     */
    async clickLogin(){
        await this.btnLogin.click();
    }

    /**
     * Performs complete login action
     * @param email - Email address to enter
     * @param password - Password to enter
     */
    async login(email, password){
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLogin();
    }

    async getloginErrorMessage(){
       
        return(this.txtErrorMessage.textContent());
    }
    
}