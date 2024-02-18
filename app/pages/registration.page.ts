import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from '../../misc/reporters/step';
import { NavBar } from "../components/navigationbar.component";

export class Register extends AppPage {
  public pagePath = '/#/register';
  public navbar = new NavBar(this.page);
  private readonly registerCard = this.page.locator('app-register');

  private readonly emailInput = this.page.locator('#emailControl');
  private readonly passwordInput = this.page.locator('#passwordControl')
  private readonly repeatPasswordInput = this.page.locator('#repeatPasswordControl')
  private readonly securityQuestionDropdown = this.page.locator('mat-select[role=combobox]')
  private readonly securityQuestionListBox = this.page.locator('div[role=listbox]')
  private readonly securityAnswerInput = this.page.locator('#securityAnswerControl')
  private readonly registerButton = this.page.locator('#registerButton')
  private readonly error = this.page.locator('div.error')

  @step()
  async expectLoaded (message = 'Expected Register page to be opened') {
    await expect(this.registerCard, message).toBeVisible();
  }

  @step()
  async selectSecurityQuestion (question: string) {
    await this.securityQuestionDropdown.click();
    await expect(this.securityQuestionListBox).toBeVisible();
    await this.securityQuestionListBox.filter({ hasText: question }).click();
  }

  @step()
  async signUpNewUser (user: { email: string, password: string }) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.repeatPasswordInput.fill(user.password);
    await this.selectSecurityQuestion('Mother\'s maiden name?');
    await this.securityAnswerInput.fill('Kitty');
    await this.registerButton.click();
  }

  @step()
  async expectErrorMessage (message: string) {
    await expect(this.error).toContainText(message);
  }
}
