import { HomePage } from './HomePage';

export class LogoutPage {
  
    constructor(page) {
        this.page = page;
        // Using CSS selector with :has-text() pseudo-class for text matching
        this.btnContinue = page.locator('.btn.btn-primary');
        //this.btnContinue = page.locator('a:has-text("Continue")');
    }

    /**
     * Clicks the Continue button after logout
     * @returns Promise<HomePage> - Returns instance of HomePage
     */
    async clickContinue() {
        await this.btnContinue.click();
        return new HomePage(this.page);
    }

    /**
     * Verifies if the Continue button is visible
     * @returns Promise<boolean> - Returns true if button is visible
     */
    async isContinueButtonVisible() {
        return await this.btnContinue.isVisible();
    }
}