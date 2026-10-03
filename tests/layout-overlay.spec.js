import { test, expect } from '@playwright/test';

const PAGES_TO_TEST = [
  '/',
  '/turf',
  '/pricing',
  '/gallery',
  '/about',
  '/contact',
  '/book',
  '/my-bookings',
  '/owner',
];

const VIEWPORTS = [
  { name: 'Mobile (375x667)', width: 375, height: 667 },
  { name: 'Tablet (768x1024)', width: 768, height: 1024 },
  { name: 'Laptop (1280x800)', width: 1280, height: 800 },
  { name: 'Desktop (1920x1080)', width: 1920, height: 1080 },
];

test.describe('UI Layout & Component Overlay Audits', () => {

  for (const pageUrl of PAGES_TO_TEST) {

    test(`Horizontal Overflow Check on ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);
      await page.waitForLoadState('domcontentloaded');

      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 2; // allowance of 2px for scrollbar rounding
      });

      expect(isOverflowing, `Horizontal scroll leak detected on page ${pageUrl}`).toBe(false);
    });

    test(`Element Point-Clickability & Occlusion Detector on ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);
      await page.waitForLoadState('domcontentloaded');

      const occlusionIssues = await page.evaluate(() => {
        const interactiveSelectors = 'button, a, input, select, textarea, [role="button"], .slot-pill, .date-pill, .faq-question';
        const elements = Array.from(document.querySelectorAll(interactiveSelectors));
        const issues = [];

        for (const el of elements) {
          // Skip hidden or zero-size elements
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0 || rect.top < 0 && rect.bottom < 0) continue;
          if (window.getComputedStyle(el).display === 'none' || window.getComputedStyle(el).visibility === 'hidden') continue;

          // Check center point clickability
          const cx = Math.floor(rect.left + rect.width / 2);
          const cy = Math.floor(rect.top + rect.height / 2);

          // Only test if within current viewport
          if (cx < 0 || cx > window.innerWidth || cy < 0 || cy > window.innerHeight) continue;

          const elementAtPoint = document.elementFromPoint(cx, cy);
          if (elementAtPoint && !el.contains(elementAtPoint) && !elementAtPoint.contains(el)) {
            // Found occlusion!
            issues.push({
              target: el.outerHTML.slice(0, 80),
              coveringElement: elementAtPoint.outerHTML.slice(0, 80),
              coords: { cx, cy }
            });
          }
        }

        return issues;
      });

      expect(occlusionIssues, `Occlusion detected on ${pageUrl}: ${JSON.stringify(occlusionIssues, null, 2)}`).toHaveLength(0);
    });

    test(`Bounding Box Component Overlay Detector on ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);
      await page.waitForLoadState('domcontentloaded');

      const overlays = await page.evaluate(() => {
        const cardSelectors = '.card-surface, .hero-card, .amenity-card, .price-card, .booking-left-surface, .booking-summary-card';
        const cards = Array.from(document.querySelectorAll(cardSelectors));
        const conflicts = [];

        for (let i = 0; i < cards.length; i++) {
          for (let j = i + 1; j < cards.length; j++) {
            const elA = cards[i];
            const elB = cards[j];

            if (elA.contains(elB) || elB.contains(elA)) continue;

            const rA = elA.getBoundingClientRect();
            const rB = elB.getBoundingClientRect();

            // Calculate intersection rectangle
            const xOverlap = Math.max(0, Math.min(rA.right, rB.right) - Math.max(rA.left, rB.left));
            const yOverlap = Math.max(0, Math.min(rA.bottom, rB.bottom) - Math.max(rA.top, rB.top));
            const overlapArea = xOverlap * yOverlap;

            // Flag if significant unintentional overlap occurs (> 100 sq px)
            if (overlapArea > 100) {
              conflicts.push({
                cardA: elA.className,
                cardB: elB.className,
                overlapArea
              });
            }
          }
        }
        return conflicts;
      });

      expect(overlays, `Unintended component overlap on ${pageUrl}: ${JSON.stringify(overlays, null, 2)}`).toHaveLength(0);
    });

  }

  test('Responsive Viewport Audit across devices', async ({ page }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/book');
      await page.waitForLoadState('domcontentloaded');

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow, `Overflow on viewport ${viewport.name}`).toBe(false);
    }
  });

});
