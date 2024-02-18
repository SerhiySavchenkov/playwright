import { test } from '@playwright/test';
import { Application } from '../app';
import { API } from '../api';
import { randomUUID } from 'node:crypto';

const testUser = {
  email: `test_${randomUUID()}@test.com`,
  password: '123456'
}

const testUser2 = {
  email: `test_${randomUUID()}@test.com`,
  password: '123456'
}

const errorMessage = 'Email must be unique';

test('Registration of the user', async ({ page }) => {
  const app = new Application(page);
  await app.home.open();
  await app.register.open();
  await app.register.signUpNewUser(testUser);
  await app.login.logInWithNewUser(testUser);
  await app.search.expectLoaded();
  await app.search.navbar.expectUserLoggedIn(testUser.email);
  await app.profile.open();
  await app.profile.expectUserEmail(testUser.email);
});

test('Re-registration of the user is prohibited', async ({ page }) => {
  await new API().createNewUser(testUser2);
  const app = new Application(page);
  await app.home.open();
  await app.register.open();
  await app.register.signUpNewUser(testUser2);
  await app.register.expectErrorMessage(errorMessage);
});
