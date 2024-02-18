import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';
import { NavBar } from "../components/navigationbar.component";

export class Basket extends AppPage {
  public pagePath = '/#/basket';
  public navbar = new NavBar(this.page);
  private readonly basketCard = this.page.locator('mat-card');
  private readonly header = this.page.locator('h1');
  private readonly checkoutButton = this.page.locator('#checkoutButton');
  private readonly basketTable = this.page.locator('[class*="mat-table"]');
  private readonly basketRows = this.page.locator('[class*="mat-row"]');
  private readonly basketRemoveButtons = this.page.locator('[class*=mat-column-remove] button');
  /*
  await page.getByRole('row', { name: 'Apple Juice (1000ml) Apple' }).getByRole('button').nth(2).click();
  await page.getByRole('row', { name: 'Apple Pomace Apple Pomace 1 0' }).getByRole('button').nth(2).click();
  await page.getByRole('row', { name: 'Banana Juice (1000ml) Banana' }).getByRole('button').nth(2).click();
  await page.getByLabel('Back to homepage').click();
  await page.locator('mat-card').filter({ hasText: 'Apple Juice (1000ml) 1.99¤Add' }).getByLabel('Add to Basket').click();
  await page.locator('mat-card').filter({ hasText: 'Apple Pomace 0.89¤Add to' }).getByLabel('Add to Basket').click();
  await page.locator('mat-card').filter({ hasText: 'Banana Juice (1000ml) 1.99¤' }).getByLabel('Add to Basket').click();
  await page.getByLabel('Show the shopping cart').click();
  await page.getByText('Your Basket (admin@juice-sh.op) Apple Juice (1000ml) 1 1.99¤ Apple Pomace 1 0.').click();
  await page.locator('mat-card').click();
*/
  @step()
  async expectLoaded (message = 'Expected Basket page to be opened') {
    if (await this.navbar.getBasketItemsCount() > 0) {
      await expect(this.basketRows.first(), message).toBeVisible();
    } else {
      await expect(this.basketTable, message).toBeVisible();
    }
  }

  @step()
  async expectHeaderText (title: string | RegExp) {
    await expect(this.header).toContainText(title);
  }

  @step()
  async clearBasket () {
    for (const btn of (await this.basketRemoveButtons.all()).reverse()) {
      await btn.click();
    }
  }

  @step()
  async checkout () {
    await this.checkoutButton.click();
  }
}
