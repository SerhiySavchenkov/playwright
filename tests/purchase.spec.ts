import { loggedInAsAdminFixture } from '../fixtures';

const fixture = loggedInAsAdminFixture;

fixture('fixt: Logged in admin user can buy a product', async ({ app }) => {
  await app.basket.open();
  await app.basket.clearBasket();
  await app.search.open();
  await app.search.addProductByName('Apple Juice (1000ml)');
  await app.search.addProductByName('Melon Bike');
  await app.search.navbar.openBasket();
  await app.basket.expectLoaded();
  await app.basket.checkout();
  await app.address.selectFirstAddress();
  await app.address.clickContinue();
  await app.delivery.chooseStandardDeliverySpeed();
  await app.delivery.clickContinue();
  await app.payment.chooseCard('8108');
  await app.payment.clickContinue();
  await app.order.expectOrderPresent('Apple Juice (1000ml)');
  await app.order.expectOrderPresent('Melon Bike');
  await app.order.clickContinue();
  await app.completion.expectLoaded();
  await app.completion.expectHeaderText('Thank you for your purchase!');
  await app.completion.expectOrderPresent('Apple Juice (1000ml)');
  await app.completion.expectOrderPresent('Melon Bike');
});
