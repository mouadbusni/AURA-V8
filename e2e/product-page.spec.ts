import { test, expect } from '@playwright/test';

test.describe('Product Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('displays product grid', async ({ page }) => {
    await expect(page.locator('.grid')).toBeVisible();
    const products = await page.locator('[data-testid="product-card"]').count();
    expect(products).toBeGreaterThan(0);
  });

  test('filters products by category', async ({ page }) => {
    await page.click('text=T-Shirts');
    await expect(page.url()).toContain('category=t-shirts');
    const products = await page.locator('[data-testid="product-card"]').count();
    expect(products).toBeGreaterThan(0);
  });

  test('adds product to cart', async ({ page }) => {
    await page.hover('[data-testid="product-card"]');
    await page.click('text=Quick Add');
    await expect(page.locator('text=Added ✓')).toBeVisible();
  });

  test('adds product to wishlist', async ({ page }) => {
    await page.click('[aria-label="Add to favorites"]');
    await expect(page.locator('[aria-label="Remove from favorites"]')).toBeVisible();
  });
});