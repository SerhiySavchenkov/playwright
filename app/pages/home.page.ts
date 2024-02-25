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
  //private readonly dismissLanguageButton = this.page.getByLabel('Force page reload');
  //private readonly dismissLanguageButton = this.page.locator('simple-snack-bar .mat-button');

  @step()
  async expectLoaded (message = 'Expected Home page to be opened'): Promise<void> {
    await this.dismissWelcomeButton.click();
    await this.dismissCookieButton.click();
    await expect(this.gridlist, message).toBeVisible();
  }

  @step()
  async expectTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }
}
