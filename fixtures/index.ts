import { test, expect } from '@playwright/test';
import { Application } from "../app/index";
import { addAddressAndPaymentCard, createNewUser } from '../api/utils/user.util';
import { randomUUID } from 'node:crypto';

const adminUser = {
  email: 'admin@juice-sh.op',
  password: 'admin123'
}

const newUser = {
  email: `${randomUUID()}@test.com`,
  password: '123456'
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

export const loggedInAsNewUserFixture = baseFixture.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    await createNewUser(newUser);
    await addAddressAndPaymentCard(newUser);
    await app.login.open();
    await app.login.logInWithNewUser(newUser);
    await app.search.isLoaded();
    await app.search.removeMessages();
    await use(app);
  }
});
