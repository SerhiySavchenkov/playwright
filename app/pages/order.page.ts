import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';

export class Order extends AppPage {
  public pagePath = '/#/order-summary';
  private readonly orderBasket = this.page.locator('app-purchase-basket');
  private readonly header = this.page.locator('h1');
  private readonly orderTable = this.page.locator('mat-table');
  private readonly completePurchaseButton = this.page.getByLabel('Complete your purchase');

  @step()
  async expectLoaded(message = 'Expected Order page to be opened'): Promise<void> {
    await expect(this.orderBasket, message).toBeVisible();
  }

  @step()
  async expectHeaderText(title: string | RegExp): Promise<void> {
    await expect(this.header).toContainText(title);
  }

  @step()
  async expectOrderPresent(title: string | RegExp): Promise<void> {
    await expect(this.orderTable).toContainText(title);
  }

  @step()
  async clickContinue(): Promise<void> {
    await this.completePurchaseButton.click();
  }
}
