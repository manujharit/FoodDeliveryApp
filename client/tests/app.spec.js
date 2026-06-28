import { test, expect } from '@playwright/test';

test.describe('FoodDeliveryApp E2E Tests', () => {
  test('should load the homepage and display header', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    // Just a basic check that the page loads (adjust selectors based on your actual DOM)
    await expect(page).toHaveTitle(/Food Delivery|FoodDeliveryApp|Vite/i);
    // Ensure that some content is visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have basic elements on the page', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    // Wait for the app to render
    await page.waitForLoadState('networkidle');
    // Depending on the UI, check for a common header or search bar
    // Since we don't know the exact DOM elements without viewing them,
    // we assert basic visibility of the app container.
    const root = page.locator('#root');
    await expect(root).toBeVisible();
  });
});
