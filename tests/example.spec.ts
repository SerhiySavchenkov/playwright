import { test, expect } from '@playwright/test';
import { Application } from '../app';

const homePageTitle = "OWASP Juice Shop";
const aboutPageTitle = "About Us";

test(`Home page has title '${homePageTitle}'`, async ({ page }) => {
  const app = new Application(page);
  await app.home.open();
  await app.home.expectTitle(homePageTitle);
});

test(`About page has header '${aboutPageTitle}'`, async ({ page }) => {
  const app = new Application(page);
  await app.home.open();
  await app.about.open();
  await app.about.expectHeaderText(aboutPageTitle);
});
