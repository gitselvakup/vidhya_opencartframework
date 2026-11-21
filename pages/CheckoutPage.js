import { expect } from '@playwright/test';

export class CheckoutPage {
    
    constructor(page) {
        this.page = page;
        
        // Initialize locators with CSS selectors
        this.radioGuest = page.locator('input[value="guest"]');
        this.btnContinue = page.locator('#button-account');
        this.txtFirstName = page.locator('#input-payment-firstname');
        this.txtLastName = page.locator('#input-payment-lastname');
        this.txtAddress1 = page.locator('#input-payment-address-1');
        this.txtAddress2 = page.locator('#input-payment-address-2');
        this.txtCity = page.locator('#input-payment-city');
        this.txtPin = page.locator('#input-payment-postcode');
        this.drpCountry = page.locator('#input-payment-country');
        this.drpState = page.locator('#input-payment-zone');
        this.btnContinueBillingAddress = page.locator('#button-payment-address');
        this.btnContinueDeliveryAddress = page.locator('#button-shipping-address');
        this.txtDeliveryMethod = page.locator('textarea[name="comment"]');
        this.btnContinueShippingAddress = page.locator('#button-shipping-method');
        this.chkboxTerms = page.locator('input[name="agree"]');
        this.btnContinuePaymentMethod = page.locator('#button-payment-method');
        this.lblTotalPrice = page.locator('strong:has-text("Total:") + td');
        this.btnConfOrder = page.locator('#button-confirm');
        this.lblOrderConMsg = page.locator('#content h1');
    }

    // Check if checkout page exists
    async isCheckoutPageExists() {
        try {
            await expect(this.page).toHaveTitle("Checkout");
            return true;
        } catch (error) {
            return false;
        }
    }
    
    // Choose checkout option
    async chooseCheckoutOption(checkOutOption){
        if (checkOutOption === "Guest Checkout") {
            await this.radioGuest.click();
        }
    }

    // Click on continue button
    async clickOnContinue(){
        await this.btnContinue.click();
    }

    // Form field methods
    async setFirstName(firstName){
        await this.txtFirstName.fill(firstName);
    }

    async setLastName(lastName){
        await this.txtLastName.fill(lastName);
    }

    async setAddress1(address1) {
        await this.txtAddress1.fill(address1);
    }

    async setAddress2(address2){
        await this.txtAddress2.fill(address2);
    }

    async setCity(city){
        await this.txtCity.fill(city);
    }

    async setPin(pin){
        await this.txtPin.fill(pin);
    }

    async setCountry(country){
        await this.drpCountry.selectOption({ label: country });
    }

    async setState(state){
        await this.drpState.selectOption({ label: state });
    }

    // Continue button methods
    async clickOnContinueAfterBillingAddress() {
        await this.btnContinueBillingAddress.click();
    }

    async clickOnContinueAfterDeliveryAddress() {
        await this.btnContinueDeliveryAddress.click();
    }

    // Delivery method
    async setDeliveryMethodComment(deliveryMsg) {
        await this.txtDeliveryMethod.fill(deliveryMsg);
    }

    async clickOnContinueAfterDeliveryMethod() {
        await this.btnContinueShippingAddress.click();
    }

    // Terms and conditions
    async selectTermsAndConditions() {
        await this.chkboxTerms.check();
    }

    async clickOnContinueAfterPaymentMethod() {
        await this.btnContinuePaymentMethod.click();
    }

    // Order confirmation
    async getTotalPriceBeforeConfOrder() {
        return await this.lblTotalPrice.textContent();
    }

    async clickOnConfirmOrder() {
        await this.btnConfOrder.click();
    }

    async isOrderPlaced() {
        try {
            // Handle alert if present
            if (this.page.on('dialog', dialog => dialog.accept())) {
                await this.page.waitForEvent('dialog');
            }
            
            await expect(this.lblOrderConMsg).toHaveText("Your order has been placed!");
            return true;
        } catch (error) {
            console.log(`Error verifying order placement: ${error}`);
            return false;
        }
    }
}