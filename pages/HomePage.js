export class HomePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // locators
        this.lnkMyAccount = page.locator('span:has-text("My Account")');
        this.lnkRegister = page.locator('a:has-text("Register")');
        this.linkLogin = page.locator('a:has-text("Login")');
        this.txtSearchbox = page.locator('input[placeholder="Search"]');
        this.btnSearch = page.locator('#search button[type="button"]');
    }

    // action methods

    // Check if HomePage exists
    async isHomePageExists() {
        const title = await this.page.title();
        if (title) {
            return true;
        }
        return false;
    }

    // Click "My Account" link
    async clickMyAccount() {
        try {
            await this.lnkMyAccount.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'My Account': ${error}`);
            throw error;
        }
    }

    // Click "Register" link
    async clickRegister() {
        try {
            await this.lnkRegister.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Register': ${error}`);
            throw error;
        }
    }

    // Click "Login" link
    async clickLogin() {
        try {
            await this.linkLogin.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Login': ${error}`);
            throw error;
        }
    }

    /**
     * Enter product name in the search box
     * @param {string} pName
     */
    async enterProductName(pName) {
        try {
            await this.txtSearchbox.fill(pName);
        } catch (error) {
            console.log(`Exception occurred while entering product name: ${error}`);
            throw error;
        }
    }

    // Click the search button
    async clickSearch() {
        try {
            await this.btnSearch.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Search': ${error}`);
            throw error;
        }
    }
}