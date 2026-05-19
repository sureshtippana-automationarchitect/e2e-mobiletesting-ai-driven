import { test, expect } from '@mobilewright/test';
import { SGAlertPage } from '../pages/SGAlertPage';

/**
 * Complete E2E Test Suite for SG Alert App - Page Object Model (POM) Approach
 * 
 * This test suite demonstrates the Page Object Model pattern where:
 * - All locators are centralized in the Page class
 * - Helper methods (click, tap, type, wait, etc.) are in BasePage
 * - Page methods encapsulate UI interactions
 * - Test cases are clean and readable
 * 
 * IMPORTANT: This app requires internet connectivity to load onboarding screens.
 * If you see network errors, ensure your device/emulator has internet access.
 */

// Automatic screenshot capture on test failure
test.afterEach(async ({ device, screen }, testInfo) => {
  if (testInfo.status !== 'passed') {
    console.log(`\n❌ Test Failed: ${testInfo.title}`);
    try {
      await screen.screenshot();
      console.log('📸 Failure screenshot captured');
    } catch (error) {
      console.log('⚠️  Could not capture screenshot - connection may have been lost');
    }
  }
});

// Test 1: Complete onboarding flow - Happy path using POM (Exact match to working test)
test.only('POM: Complete app onboarding successfully', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);

  // Execute complete onboarding flow using exact implementation from working test
  await sgAlertPage.completeOnboardingFlowExact();
});
