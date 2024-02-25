import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';

export class Profile extends AppPage {
  public pagePath = '/profile';
  private readonly profileCard = this.page.locator('#card');
  private readonly emailInput = this.page.locator('#email');

  @step()
  async expectLoaded(message = 'Expected About page to be opened'): Promise<void> {
    await expect(this.profileCard, message).toBeVisible();
  }

  async expectUserEmail(userEmail: string): Promise<void> {
    expect(await this.emailInput.getAttribute('value')).toEqual(userEmail);
  }
};
