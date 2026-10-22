import locators from '../locators/swagLabsLocators.json' with { type: 'json' };
import 'dotenv/config';

class SwagLabsPage {
    constructor(page) {
        this.page = page;

        this.username = page.locator(locators.logIn.username);
        this.password = page.locator(locators.logIn.password);
        this.loginButton = page.locator(locators.logIn.loginButton);
        //product link
        this.product = page.locator(locators.homePage.product);
        //add to cart
        this.addToCartButton = page.locator(locators.productPage.addToCartButton);

        this.shoppingCart = page.locator(locators.productPage.shoppingCart);

        this.checkoutButton = page.locator(locators.addToCart.checkoutButton);

        this.fristName = page.locator(locators.informationPage.firstName);
        this.lastName = page.locator(locators.informationPage.lastName);
        this.zipCode = page.locator(locators.informationPage.zipCode);
        this.continueButton = page.locator(locators.informationPage.continueButton);

        this.finishButton = page.locator(locators.overview.finishButton);
    }

    async openWebsite() {
        await this.page.goto(process.env.BASE_URL);
    }

    // Login to Swag Labs
    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async selectProduct(productName){
        await this.product.filter({ hasText: productName }).click();
    }

    async addToCart(){
        await this.addToCartButton.click();
    }

    async openCart(){
        await this.shoppingCart.click();
    }

    async clickCheckout(){
        await this.checkoutButton.click();
    }

    async enterCheckoutInformation(firstname, lastname, zipcode) {
        await this.fristName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(zipcode);
        await this.continueButton.click();
    }

    async finishOrder(){
        await this.finishButton.click();
    }

}

export default SwagLabsPage;