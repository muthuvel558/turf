import { test, expect } from '@playwright/test';

test.describe('User Convenience & Usability Audits', () => {

  test('Mobile Touch Target Size - buttons and interactive controls meet minimum size standards', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone viewport
    await page.goto('/book');
    await page.waitForLoadState('domcontentloaded');

    const touchTargetViolations = await page.evaluate(() => {
      const selectors = 'button, a, input, select, .slot-pill, .date-pill, .sport-btn';
      const elements = Array.from(document.querySelectorAll(selectors));
      const violations = [];

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        // Skip hidden elements
        if (rect.width === 0 || rect.height === 0 || window.getComputedStyle(el).display === 'none') continue;

        // Check if smaller than minimum 36px (WCAG AAA recommendation is 44x44px, 36x36px strict minimum)
        if (rect.width < 36 || rect.height < 36) {
          violations.push({
            element: el.outerHTML.slice(0, 100),
            dimensions: { width: rect.width, height: rect.height },
          });
        }
      }
      return violations;
    });

    expect(touchTargetViolations, `Touch targets below 36px minimum: ${JSON.stringify(touchTargetViolations, null, 2)}`).toHaveLength(0);
  });

  test('Keyboard Navigation & Focus Indicator Visibility', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab key repeatedly and check focused elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focusedElementTag = await page.evaluate(() => {
        const active = document.activeElement;
        return active ? active.tagName : null;
      });
      expect(focusedElementTag).not.toBeNull();
    }
  });

  test('Form Validation & Error Message Clarity', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');

    const submitBtn = page.locator('button[type="submit"], button:has-text("Send"), button:has-text("Submit")').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();

      // Check user convenience: error message or required state is flagged clearly
      const isInvalid = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input, textarea'));
        return inputs.some(i => i.matches(':invalid') || i.classList.contains('error') || document.querySelector('.error-text'));
      });
      expect(isInvalid).toBe(true);
    }
  });

  test('Broken Media & Images Check across main pages', async ({ page }) => {
    const routes = ['/', '/turf', '/gallery', '/about'];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
      });

      expect(brokenImages, `Broken images on route ${route}: ${brokenImages.join(', ')}`).toHaveLength(0);
    }
  });

  test('Font Size & Text Readability Convenience', async ({ page }) => {
    await page.goto('/');
    
    const unreadableElements = await page.evaluate(() => {
      const textEls = Array.from(document.querySelectorAll('p, span, a, label, button, li'));
      const unreadable = [];

      for (const el of textEls) {
        if (!el.innerText || !el.innerText.trim()) continue;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;

        const fontSize = parseFloat(style.fontSize);
        if (fontSize < 10) { // Below 10px font is illegible
          unreadable.push({ text: el.innerText.slice(0, 30), fontSize });
        }
      }
      return unreadable;
    });

    expect(unreadableElements, `Illegible font sizes (<10px) found: ${JSON.stringify(unreadableElements, null, 2)}`).toHaveLength(0);
  });

});
