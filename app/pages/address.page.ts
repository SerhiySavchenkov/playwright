import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';

export class Address extends AppPage {
  public pagePath = '/#/address/select';
  private readonly addressCard = this.page.locator('mat-card');
  private readonly header = this.page.locator('h1');
  private readonly firstRadioButton = this.page.locator('mat-radio-button[class*="mat-radio-button"]').first();
  private readonly continueButton = this.page.getByLabel('Proceed to payment selection');

  @step()
  async expectLoaded (message = 'Expected Address page to be opened') {
    await expect(this.addressCard, message).toBeVisible();
  }

  @step()
  async expectHeaderText (title: string | RegExp) {
    await expect(this.header).toContainText(title);
  }

  @step()
  async selectFirstAddress () {
    await this.firstRadioButton.click();
  }

  @step()
  async clickContinue () {
    await this.continueButton.click();
  }
}
