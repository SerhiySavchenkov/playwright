import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../misc/reporters/step";

export class NavBar extends Component {
  private readonly toolbar = this.page.locator('app-navbar');
  private readonly sideMenuButton = this.page.getByLabel('Open Sidenav');
  private readonly backToHomePageButton = this.page.getByLabel('Back to homepage');
  private readonly searchButton = this.page.getByText('search');
  private readonly accountButton = this.page.getByLabel('Show/hide account menu');
  private readonly basketButton = this.page.getByLabel('Show the shopping cart');
  private readonly basketItemsCount = this.page.locator('span[class*=fa-layers-counter]');
  private readonly chooseLanguageButton = this.page.getByLabel('Language selection menu');
  private readonly userProfileItem = this.page.getByRole('menuitem', { name: 'Go to user profile' });
  private readonly firstProfileMenuItem = this.page.locator('#mat-menu-panel-0');

  @step()
  async expectLoaded (message = 'Expected toolbar to be loaded'): Promise<void> {
    await expect(this.toolbar, message).toBeVisible();
  }

  @step('Click on left side menu button')
  async openSideMenu(): Promise<void> {
    await this.sideMenuButton.click();
  }

  @step()
  async goBackToHomePage(): Promise<void> {
    await this.backToHomePageButton.click();
  }

  @step()
  async openAccountMenu(): Promise<void> {
    await this.accountButton.click();
  }

  @step()
  async openProfile(): Promise<void> {
    await this.openAccountMenu();
    await this.userProfileItem.click();
  }

  @step('Click on Basket button')
  async openBasket(): Promise<void> {
    await this.basketButton.click();
  }

  @step()
  async getBasketItemsCount(): Promise<number> {
    return Number(await this.basketItemsCount.textContent());
  }

  @step()
  async expectUserLoggedIn(userName: string): Promise<void> {
    await this.openAccountMenu();
    await expect(this.firstProfileMenuItem).toContainText(userName);
  }
}
