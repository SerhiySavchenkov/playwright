import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';

export class Completion extends AppPage {
  public pagePath = '/#/order-completion';
  private readonly orderCard = this.page.locator('app-order-completion');
  private readonly header = this.page.locator('h1');
  private readonly orderTable = this.page.locator('mat-table');

  @step()
  async expectLoaded (message = 'Expected Order Summary page to be opened') {
    await expect(this.orderCard, message).toBeVisible();
  }

  @step()
  async expectHeaderText (title: string | RegExp) {
    await expect(this.header).toContainText(title);
  }

  @step()
  async expectOrderPresent (title: string | RegExp) {
    await expect(this.orderTable).toContainText(title);
  }
}
