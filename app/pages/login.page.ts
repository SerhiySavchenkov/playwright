import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';
import { NavBar } from "../components/navigationbar.component";

export class Login extends AppPage {
  public pagePath = '/#/login';
  public navbar = new NavBar(this.page);
  private readonly loginCard = this.page.locator('app-login .mat-card');
  private readonly emailInput = this.page.locator('#email');
  private readonly passwordInput = this.page.locator('#password');
  private readonly loginButton = this.page.locator('#loginButton')

  @step()
  async expectLoaded (message = 'Expected Login page to be opened') {
    await expect(this.loginCard, message).toBeVisible();
  }

  @step()
  async logInWithNewUser (user: { email: string, password: string }) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
};
