import { test, expect } from '@playwright/test';

test.describe('Functional End-to-End Tests', () => {

  test('Page Navigation & Routing - all main routes render correctly', async ({ page }) => {
    const routes = [
      { path: '/', titlePart: 'PrimeTurf' },
      { path: '/turf', titlePart: 'Turf' },
      { path: '/pricing', titlePart: 'Pricing' },
      { path: '/gallery', titlePart: 'Gallery' },
      { path: '/about', titlePart: 'About' },
      { path: '/contact', titlePart: 'Contact' },
      { path: '/book', titlePart: 'Book' },
      { path: '/my-bookings', titlePart: 'Bookings' },
      { path: '/owner', titlePart: 'Owner' },
    ];

    for (const route of routes) {
      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      expect(response.status()).toBe(200);
      const h1Count = await page.locator('h1, h2').count();
      expect(h1Count).toBeGreaterThan(0);
    }
  });

  test('Slot Finder & Filter Flow - sport switching and slot selection', async ({ page }) => {
    await page.goto('/book');
    await page.waitForLoadState('networkidle');

    // Sport switching
    const footballBtn = page.locator('button:has-text("Football")').first();
    const cricketBtn = page.locator('button:has-text("Box Cricket")').first();

    if (await cricketBtn.isVisible()) {
      await cricketBtn.click();
      await expect(cricketBtn).toHaveClass(/active/);
    }

    if (await footballBtn.isVisible()) {
      await footballBtn.click();
      await expect(footballBtn).toHaveClass(/active/);
    }

    // Date pill selection
    const datePills = page.locator('.date-pill');
    if (await datePills.count() > 1) {
      await datePills.nth(1).click();
      await expect(datePills.nth(1)).toHaveClass(/selected/);
    }

    // Selecting available slot
    const availableSlot = page.locator('.slot-pill:not(.unavailable):not(.booked)').first();
    if (await availableSlot.isVisible()) {
      await availableSlot.click();
      await expect(availableSlot).toHaveClass(/selected/);

      // Check Proceed / Book button appears
      const proceedBtn = page.locator('button:has-text("Proceed to Book"), button:has-text("Book Now")').first();
      await expect(proceedBtn).toBeVisible();
    }
  });

  test('Full Booking Flow - from slot selection to booking confirmation & history', async ({ page }) => {
    await page.goto('/book');
    await page.waitForLoadState('networkidle');

    // Select available slot
    const availableSlot = page.locator('.slot-pill:not(.unavailable):not(.booked)').first();
    if (await availableSlot.isVisible()) {
      await availableSlot.click();

      // Click Book / Proceed button
      const bookBtn = page.locator('button:has-text("Proceed to Book"), button:has-text("Book Now")').first();
      if (await bookBtn.isVisible()) {
        await bookBtn.click();
      }
    }

    // Verification of modal or modal step 1
    const modal = page.locator('.modal-card');
    if (await modal.isVisible()) {
      // Step 1: Validation failure test with empty fields
      const submitStep1 = modal.locator('button[type="submit"], button:has-text("Proceed to Payment")').first();
      await submitStep1.click();

      // Check validation error message
      const errorMsg = modal.locator('.error-text, .field-error');
      await expect(errorMsg.first()).toBeVisible();

      // Fill in valid details
      await modal.locator('input[name="fullName"]').fill('Test Player');
      await modal.locator('input[name="phone"]').fill('9876543210');
      await modal.locator('input[name="email"]').fill('testplayer@example.com');

      // Submit step 1
      await submitStep1.click();

      // Step 2: Review screen
      await page.waitForTimeout(300);
      const confirmPaymentBtn = page.locator('button:has-text("Confirm & Pay"), button:has-text("Pay")').first();
      if (await confirmPaymentBtn.isVisible()) {
        await confirmPaymentBtn.click();

        // Step 4: Confirmation screen
        await expect(page.locator('text=Booking Confirmed!')).toBeVisible({ timeout: 10000 });

        // Navigate to My Bookings and verify booking entry exists
        await page.goto('/my-bookings');
        await expect(page.locator('text=Test Player')).toBeVisible();
      }
    }
  });

  test('FAQ Accordion - toggle expand and collapse', async ({ page }) => {
    await page.goto('/');
    const faqItem = page.locator('.faq-item').first();
    if (await faqItem.isVisible()) {
      const faqQuestion = faqItem.locator('.faq-question, button');
      await faqQuestion.click();
      await expect(faqItem).toHaveClass(/open|active/);

      // Click again to collapse
      await faqQuestion.click();
      await expect(faqItem).not.toHaveClass(/open/);
    }
  });

  test('Gallery Lightbox Modal - open image and close modal', async ({ page }) => {
    await page.goto('/gallery');
    const galleryImage = page.locator('.gallery-card img, .gallery-item img').first();
    if (await galleryImage.isVisible()) {
      await galleryImage.click();

      // Check lightbox modal is displayed
      const lightbox = page.locator('.lightbox-overlay, .lightbox-modal');
      await expect(lightbox).toBeVisible();

      // Close modal
      const closeBtn = page.locator('.lightbox-close, button[aria-label="Close"]');
      await closeBtn.click();
      await expect(lightbox).not.toBeVisible();
    }
  });

  test('Owner Admin Console - tab navigation and settings control', async ({ page }) => {
    await page.goto('/owner');
    await page.waitForLoadState('networkidle');

    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();

    // Test tab navigation inside owner dashboard
    const tabs = page.locator('.admin-tab, .tab-btn');
    const count = await tabs.count();
    for (let i = 0; i < count; i++) {
      await tabs.nth(i).click();
      await expect(tabs.nth(i)).toHaveClass(/active/);
    }
  });

});
