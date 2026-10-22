import { test, expect } from '@playwright/test';
import  SwagLabsPage  from '../pages/SwagLabsPage.js';
import 'dotenv/config';


test('Swag Labs E2E testing flow', async ({ page }) => {

  const swagLabs = new SwagLabsPage(page);

  const baseUrl = process.env.BASE_URL;
  const username = process.env.SAUCE_USERNAME;
  const password = process.env.SAUCE_PASSWORD;

  await swagLabs.openWebsite(baseUrl);

  await expect(page).toHaveTitle("Swag Labs");

  await swagLabs.login(username, password);

  await expect(page).toHaveURL(/inventory\.html/);

  let productName = ["Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket", "Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"];

  for(let i = 0; i < productName.length; i++){

    if(productName[i] === "Sauce Labs Bolt T-Shirt"){

      await swagLabs.selectProduct(productName[i]);
      break;

    }

  }

  await swagLabs.addToCart();

  await swagLabs.openCart();

  await swagLabs.clickCheckout();

  const firstname = 'Deepak';
  const lastname = 'jena';
  const zipcode = '560006';

  await swagLabs.enterCheckoutInformation(firstname, lastname, zipcode);
  

  let infor = await page.locator('[data-test="payment-info-value"]').innerText();

  console.log("Payment Information: " + infor);

  await swagLabs.finishOrder();

  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

});
