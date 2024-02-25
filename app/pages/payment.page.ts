import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';

export class Payment extends AppPage {
  public pagePath = '/#/payment/shop';
  private readonly paymentCard = this.page.locator('mat-card');
  private readonly header = this.page.locator('h1');
  private readonly continueButton = this.page.getByLabel('Proceed to review');

  @step()
  async expectLoaded(message = 'Expected Payment page to be opened'): Promise<void> {
    await expect(this.paymentCard, message).toBeVisible();
  }

  @step()
  async expectHeaderText(title: string | RegExp): Promise<void> {
    await expect(this.header).toContainText(title);
  }

  @step()
  async chooseCard(number: string): Promise<void> {
    await this.page.getByRole('row', { name: number }).locator('label').click();
  }

  @step()
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
