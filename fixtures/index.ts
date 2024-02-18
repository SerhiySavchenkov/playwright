import { test, expect } from '@playwright/test';
import { Application } from "../app/index";
import { API } from '../api';

const adminUser = {
  email: 'admin@juice-sh.op',
  password: 'admin123'
}

export const baseFixture = test.extend<{ app: Application }>({
  app: async ({ page }, use) => {
    const app = new Application(page);
    await app.home.open();
    await use(app);
  }
});

export const loggedInAsAdminFixture = baseFixture.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    await app.login.open();
    await app.login.logInWithNewUser(adminUser);
    await app.search.isLoaded();
    await app.search.removeMessages();
    await use(app);
  }
});

/*
interface UserContext { user: { adminUser: UserCreateRequest, logAdminUser: UserCreatedResponse } }

export const loggedInAsAdminFixture = baseFixture.extend<UserContext>({
  user: async ({ app, page }, use) => {
    const adminUser = {
      email: 'admin@juice-sh.op',
      password: 'admin123'
    };
    const logAdminUser = await new API().loginUser(adminUser)
    await app.home.open();
    await page.evaluate((token) => {
      window.localStorage.setItem('token', token)
    }, logAdminUser.token);
    const cookies = [
      { name: 'token', value: logAdminUser.authentication.token, path: '/', domain: '127.0.0.1' }
    ]
    await page.context().addCookies(cookies);
    await use({ adminUser, logAdminUser });
  }
});
*/
/*
export async function setCookieVals() {
  const cookies = [
      {name:"cookie1", value:"349", path:"/", domain:"stackoverflow"},
      {name:"cookie2", value:"1", path:"/", domain:"stackoverflow"},
      {name:"cookie3", value:"4000", path:"/", domain:"stackoverflow"},
  ]
  return cookies;
}
*/
