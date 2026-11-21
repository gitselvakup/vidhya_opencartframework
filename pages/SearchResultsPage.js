import { ProductPage } from './ProductPage'; // Import ProductPage if needed

export class SearchResultsPage {
       
    // Locators using CSS selectors
   
    constructor(page) {
        this.page = page;
        
        // Initialize locators with CSS selectors
        this.searchPageHeader = page.locator('#content h1');
        this.searchProducts = page.locator('h4>a'); // 3 elements with product names in search results
        
    }

    /**
     * Verify if the search results page exists by checking the header text
     * @returns Promise<boolean> - true if the search results page exists
     */
    async isSearchResultsPageExists() {
        try {
            const headerText = await this.searchPageHeader.textContent();
            return headerText?.includes('Search -') ?? false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if a product exists in the search results by its name
     * @param productName - The name of the product to search for
     * @returns Promise<boolean> - true if the product exists
     */
    async isProductExist(productName) {
        try {
            const count = await this.searchProducts.count(); // 3
            for (let i = 0; i < count; i++) {
                const product = this.searchProducts.nth(i);
                 const title = await product.textContent();
                 if (title === productName) {
                    return true;
                }
            }
        } catch (error) {
            console.log(`Error checking product existence: ${error}`);
        }
        return false;
    }

    /**
     * Select a product from the search results by its name
     * @param productName - The name of the product to select
     * @returns Promise<ProductPage> - ProductPage instance after selecting the product
     */
    async selectProduct(productName) {
        try {
            const count = await this.searchProducts.count();
            for (let i = 0; i < count; i++) {
                const product = this.searchProducts.nth(i);
                const title = await product.textContent();
                if (title === productName) {
                    await product.click();
                    return new ProductPage(this.page);
                }
            }
            console.log(`Product not found: ${productName}`);
        } catch (error) {
            console.log(`Error selecting product: ${error}`);
        }
        return null;
    }

    /**
     * Get count of products in search results
     * @returns Promise<number> - Number of products found
     */
    async getProductCount() {
        return await this.searchProducts.count();
    }
}