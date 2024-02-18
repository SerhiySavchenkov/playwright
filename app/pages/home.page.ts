import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';
import { NavBar } from "../components/navigationbar.component";

export class Home extends AppPage {
  public pagePath = '/';

  public navbar = new NavBar(this.page);

  private readonly gridlist = this.page.locator('app-search-result .mat-grid-list');
  private readonly dismissWelcomeButton = this.page.getByLabel('Close Welcome Banner');
  private readonly dismissCookieButton = this.page.getByLabel('dismiss cookie message');
  private readonly dismissLanguageButton = this.page.locator('snack-bar-container button');

  @step()
  async expectLoaded (message = 'Expected Home page to be opened') {
    await this.dismissWelcomeButton.click();
    await this.dismissCookieButton.click();
    await this.dismissLanguageButton.click();
    await expect(this.gridlist, message).toBeVisible();
  }

  @step()
  async expectTitle (title: string | RegExp) {
    await expect(this.page).toHaveTitle(title);
  }
}
