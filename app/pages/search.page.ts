import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';
import { NavBar } from "../components/navigationbar.component";

export class Search extends AppPage {
  public pagePath = '/#/search';

  public navbar = new NavBar(this.page);

  private readonly gridList = this.page.locator('.mat-sidenav-content .mat-grid-list');
  private readonly searchCard = this.page.locator('mat-card');
  private readonly msgRemoveButtons = this.page.locator('mat-card #closeButton');

  @step()
  async expectLoaded (message = 'Expected Search page to be opened') {
    await expect(this.gridList, message).toBeVisible();
  }

  @step()
  async expectTitle (title: string | RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  @step()
  async addProductByName (name: string) {
    const locator = this.page.locator("mat-card:has-text('" + name + "')").locator('[class*=ribbon-top-left]');
    if (await locator.count() > 0) {
      await expect(locator).not.toContainText('Sold Out', { timeout: 1 });
    }
    await this.searchCard.filter({ hasText: name }).getByLabel('Add to Basket').click();
  }

  @step()
  async removeMessages () {
    for (const btn of (await this.msgRemoveButtons.all()).reverse()) {
      await btn.click();
    }
  }
}
