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
  // Check if test failed
  if (testInfo.status !== 'passed') {
    console.log(`\n❌ Test Failed: ${testInfo.title}`);
    
    // Create helper instance to capture failure screenshot
    const { HelperMethods } = await import('../helpers/HelperMethods');
    const helper = new HelperMethods(screen, device);
    
    // Take failure screenshot with test name
    await helper.takeFailureScreenshot(testInfo.title);
  }
});

// Test 1: Complete onboarding flow - Happy path using POM
test('POM: Complete app onboarding successfully', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);

  // Execute complete onboarding flow using page methods
  await sgAlertPage.completeOnboardingFlow();
});


// Test 2: Skip welcome screen using POM
test('POM: Skip welcome screen using Skip button', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);

  console.log("\n⏭️  ============ SKIP ONBOARDING TEST ============\n");

  // Launch app
  await sgAlertPage.launchAppFresh();

  // Click Skip button
  await sgAlertPage.clickSkipOnWelcome();

  // Click Continue on Why Permissions screen
  await sgAlertPage.clickContinueOnWhyPermissions();

  // Verify we landed on permissions screen
  await sgAlertPage.verifyPermissionsScreen();

  await sgAlertPage.getHelperMethods().takeScreenshot('After Skip Flow');
  await sgAlertPage.getHelperMethods().wait(2000);
});


// Test 3: Verify permission statuses using POM
test('POM: Verify permission approval statuses', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);

  console.log("\n✅ ============ PERMISSION STATUS TEST ============\n");

  // Navigate to permissions screen
  await sgAlertPage.navigateToPermissionsScreen();

  // Verify permission statuses
  await sgAlertPage.verifyPermissionStatuses();

  await sgAlertPage.getHelperMethods().takeScreenshot('Permission Statuses');
  await sgAlertPage.getHelperMethods().wait(2000);
});


// Test 4: Verify Terms of Use checkbox using POM
test('POM: Verify Terms of Use checkbox interaction', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);

  console.log("\n📋 ============ TERMS CHECKBOX TEST ============\n");

  // Navigate to permissions screen
  await sgAlertPage.launchAppFresh();
  await sgAlertPage.clickNextOnWelcome();
  await sgAlertPage.clickContinueOnWhyPermissions();

  // Verify terms checkbox
  await sgAlertPage.verifyTermsCheckbox();

  // Tap checkbox
  await sgAlertPage.tapTermsCheckbox();

  await sgAlertPage.getHelperMethods().takeScreenshot('Terms Checkbox');
  await sgAlertPage.getHelperMethods().wait(2000);
});


// Test 5: Verify Get Started button behavior using POM
test('POM: Get Started button should be visible and tappable', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);

  console.log("\n🚀 ============ GET STARTED BUTTON TEST ============\n");

  // Navigate to permissions screen
  await sgAlertPage.navigateToPermissionsScreen();

  // Verify Get Started button
  await sgAlertPage.verifyGetStartedButton();

  // Accept terms
  await sgAlertPage.acceptTermsOfUse();

  // Click Get Started
  await sgAlertPage.clickGetStarted();

  // Verify main app screen
  await sgAlertPage.verifyMainAppScreen();

  console.log("🎉 ============ GET STARTED TEST COMPLETED ============\n");
});


// Test 6: Complete flow with Skip button using single page method
test('POM: Complete onboarding with Skip using single method', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);

  // Execute complete onboarding with skip using single page method
  await sgAlertPage.completeOnboardingWithSkip();
});


// Test 7: Verify all permissions are displayed
test('POM: Verify all permissions are displayed on screen', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);

  console.log("\n🔐 ============ VERIFY ALL PERMISSIONS TEST ============\n");

  // Navigate to permissions screen
  await sgAlertPage.navigateToPermissionsScreen();

  // Verify all permissions
  await sgAlertPage.verifyAllPermissions();

  await sgAlertPage.getHelperMethods().takeScreenshot('All Permissions');

  console.log("🎉 ============ ALL PERMISSIONS VERIFIED ============\n");
});


// Test 8: Restart app and verify welcome screen
test('POM: Restart app and verify welcome screen', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);

  console.log("\n🔄 ============ APP RESTART TEST ============\n");

  // Restart app
  await sgAlertPage.restartSGAlertApp();

  // Verify welcome screen appears
  await sgAlertPage.verifyWelcomeScreen();

  console.log("🎉 ============ APP RESTART TEST COMPLETED ============\n");
});
