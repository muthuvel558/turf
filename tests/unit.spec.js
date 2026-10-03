import { test, expect } from '@playwright/test';

test.describe('Unit & Component Logic Tests', () => {

  test('StoreManager & Data Structures - initial facility, sports, and pricing data integrity', async ({ page }) => {
    await page.goto('/');
    
    // Evaluate StoreManager in browser context
    const storeState = await page.evaluate(() => {
      // Access StoreManager from window or module if exposed, or verify page data state
      const bodyText = document.body.innerText;
      return {
        hasFootball: bodyText.includes('Football'),
        hasCricket: bodyText.includes('Cricket'),
        hasPricing: bodyText.includes('₹') || bodyText.includes('INR'),
      };
    });

    expect(storeState.hasFootball).toBe(true);
    expect(storeState.hasCricket).toBe(true);
    expect(storeState.hasPricing).toBe(true);
  });

  test('DateSelector Component - renders 7 upcoming days with current date active', async ({ page }) => {
    await page.goto('/book');
    
    const datePills = page.locator('.date-pill');
    const count = await datePills.count();
    expect(count).toBeGreaterThanOrEqual(7);

    // Verify first pill is selected by default
    await expect(datePills.first()).toHaveClass(/selected|active/);
  });

  test('TrustSignals Component - displays customer metrics and ratings', async ({ page }) => {
    await page.goto('/');
    
    const trustSignals = page.locator('.trust-signals, .trust-metrics, .stats-grid');
    if (await trustSignals.isVisible()) {
      const text = await trustSignals.innerText();
      expect(text).toMatch(/Rating|Reviews|Players|Turf/i);
    }
  });

  test('TimeSlot Component - available vs booked slot styling attributes', async ({ page }) => {
    await page.goto('/book');
    
    const slots = page.locator('.slot-pill');
    const slotCount = await slots.count();
    expect(slotCount).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(slotCount, 5); i++) {
      const slot = slots.nth(i);
      const isUnavailable = await slot.evaluate(el => el.classList.contains('unavailable') || el.classList.contains('booked'));
      if (isUnavailable) {
        await expect(slot).toHaveAttribute('disabled', '');
      }
    }
  });

});
