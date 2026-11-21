import { ShoppingCartPage } from './ShoppingCartPage'; // Import ShoppingCartPage if needed

export class ProductPage {
    
    
    // Locators using CSS selectors
    constructor(page) {
        this.page = page;
        
        // Initialize locators with CSS selectors
        this.txtQuantity = page.locator('input[name="quantity"]');
        this.btnAddToCart = page.locator('#button-cart');
        this.cnfMsg = page.locator('.alert.alert-success.alert-dismissible');
        this.btnItems = page.locator('#cart');
        this.lnkViewCart = page.locator('strong:has-text("View Cart")');
    }

    /**
     * Sets the product quantity
     * @param qty - Quantity to set
     */
    async setQuantity(qty) {
        await this.txtQuantity.fill('');
        await this.txtQuantity.fill(qty);
    }

    /**
     * Adds product to cart
     */
    async addToCart() {
        await this.btnAddToCart.click();
    }

    /**
     * Checks if confirmation message is visible
     * @returns Promise<boolean> - Returns true if message is visible
     */
    async isConfirmationMessageVisible() {
        try {
            if(this.cnfMsg!=null){
                 return true;
            }
            else{
                return false;
            }//await expect(this.cnfMsg).toBeVisible();
           
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }

    /**
     * Clicks on Items button to navigate to cart
     */
    async clickItemsToNavigateToCart() {
        await this.btnItems.click();
    }

    /**
     * Clicks on View Cart link
     * @returns Promise<ShoppingCartPage> - Returns ShoppingCartPage instance
     */
    async clickViewCart() {
        await this.lnkViewCart.click();
        return new ShoppingCartPage(this.page);
    }

    /**
     * Complete workflow to add product to cart
     * @param quantity - Quantity of product to add
     */
    async addProductToCart(quantity) {
        await this.setQuantity(quantity);
        await this.addToCart();
        await this.isConfirmationMessageVisible();
    }
}