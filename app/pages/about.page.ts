import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';
import { NavBar } from "../components/navigationbar.component";

export class About extends AppPage {
  public pagePath = '/#/about';
  public navbar = new NavBar(this.page);
  private readonly aboutCard = this.page.locator('app-about .mat-card');
  private readonly header = this.page.locator('h1');

  @step()
  async expectLoaded (message = 'Expected About page to be opened') {
    await expect(this.aboutCard, message).toBeVisible();
  }

  @step()
  async expectHeaderText (title: string | RegExp) {
    await expect(this.header).toContainText(title);
  }
}
