import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';

export class Delivery extends AppPage {
  public pagePath = '/#/delivery-method';
  private readonly basketCard = this.page.locator('mat-card');
  private readonly header = this.page.locator('h1');
  private readonly standardDeliveryButton = this.page.getByRole('row', { name: 'Standard Delivery' }).locator('label');
  private readonly continueButton = this.page.getByLabel('Proceed to delivery method');

  @step()
  async expectLoaded(message = 'Expected Basket page to be opened'): Promise<void> {
    await expect(this.basketCard, message).toBeVisible();
  }

  @step()
  async expectHeaderText(title: string | RegExp): Promise<void> {
    await expect(this.header).toContainText(title);
  }

  @step()
  async chooseStandardDeliverySpeed(): Promise<void> {
    await this.standardDeliveryButton.click();
  }

  @step()
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
