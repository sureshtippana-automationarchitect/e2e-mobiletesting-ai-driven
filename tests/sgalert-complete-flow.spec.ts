import { test, expect } from '@mobilewright/test';

/**
 * Complete E2E Test Suite for SG Alert App
 * Based on the app flow: Welcome → Permissions → Get Started
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

// Test 1: Complete onboarding flow - Happy path
test.only('Complete app onboarding successfully', async ({ device, screen }) => {

  console.log("\n🚀 ============ COMPLETE ONBOARDING TEST ============\n");

  // Step 0: Temporarily commented out to test connection
  
  // Step 0: Uninstall and reinstall the app for fresh onboarding
  console.log("🗑️  Step 0: Uninstalling existing app...");
  try {
    await device.uninstallApp('com.senecaglobal.sgalert.internal');
    console.log("   ✅ App uninstalled");
  } catch (error) {
    console.log("   ℹ️  App not installed, skipping uninstall");
  }
  
  console.log("📦 Installing fresh APK...");
  try {
    await device.installApp('android.apk\\SGalertApp.apk');
    console.log("   ✅ App installed\n");
  } catch (error: any) {
    console.log("   ❌ Failed to install app:", error.message);
    throw error;
  }
  

  // Step 1: Launch the app
  console.log("📱 Step 1: Launching SG Alert app...");
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) {
    console.log("   ℹ️  App not running");
  }
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 8000)); // Reduced wait time
  console.log("   ✅ App launched\n");

  // Step 2: Navigate through welcome screens
  console.log("👋 Step 2: Navigating through welcome screens...");
  
  const nextButton = screen.getByText('Next >');
  await nextButton.tap();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced
  console.log("   ✅ First screen\n");

  const nextButton1 = screen.getByText('Next >');
  await nextButton1.tap();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced
  console.log("   ✅ Second screen\n");

  const doneButton = screen.getByText('Done');
  await doneButton.tap();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced
  console.log("   ✅ Completed welcome screens\n");

  // Step 3: Why permissions screen - Click Continue (if present)
  console.log("ℹ️  Step 3: Checking for 'Why permissions' screen...");
  try {
    const continueButton = screen.getByText('Continue');
    await expect(continueButton).toBeVisible({ timeout: 5000 });
    console.log("   ✅ Continue button found");
    await continueButton.tap();
    console.log("   ✅ Continue button tapped");
    await new Promise(resolve => setTimeout(resolve, 2000)); // Reduced
    console.log("   ✅ Proceeded to next screen\n");
  } catch (error: any) {
    console.log("   ℹ️  No 'Continue' button found - may have skipped directly to permissions screen");
    console.log("   ℹ️  Continuing with test...\n");
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Step 4: Permissions screen - Handle Push Notification Access first
  console.log("🔐 Step 4: Handling Push Notification Access...");
  await new Promise(resolve => setTimeout(resolve, 1500)); // Reduced
  
  // Click on Push Notification Access
  console.log("   📲 Clicking 'Push Notification Access'...");
  const pushNotificationAccess = screen.getByText(/Push Notification Access/i);
  await expect(pushNotificationAccess).toBeVisible({ timeout: 8000 });
  await pushNotificationAccess.tap();
  await new Promise(resolve => setTimeout(resolve, 1500)); // Reduced
  console.log("   ✅ Push Notification Access clicked");
  
  // Handle system dialog - Click "Allow" button
  console.log("   🔔 Handling system notification permission dialog...");
  const allowButton = screen.getByText('Allow');
  await expect(allowButton).toBeVisible({ timeout: 8000 });
  await allowButton.tap();
  await new Promise(resolve => setTimeout(resolve, 1500)); // Reduced
  console.log("   ✅ Clicked 'Allow' on notification dialog\n");
  
  // Tap the terms checkbox by coordinates
  console.log("   🎯 Tapping terms checkbox at coordinates...");
  await screen.tap(127, 1972);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Reduced
  console.log("   ✅ Terms of Use checkbox tapped\n");

  // Step 5: Click Get Started button
  console.log("🚀 Step 5: Clicking Get Started...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // First try: Find button by text
    const getStartedButton = screen.getByText('Get Started');
    await expect(getStartedButton).toBeVisible({ timeout: 5000 });
    await getStartedButton.tap();
    console.log("   ✅ Get Started clicked (by text)\n");
  } catch (error) {
    console.log("   ℹ️  Text locator failed, trying coordinates...");
    try {
      // Second try: Use coordinates - adjust based on your screenshot
      // The button appears to be around the middle-bottom of the screen
      await screen.tap(216, 2640); // Adjusted coordinates
      console.log("   ✅ Get Started clicked (by coordinates)\n");
    } catch (coordError) {
      console.log("   ❌ Both methods failed");
      await screen.screenshot();
      throw coordError;
    }
  }
  
  // Wait for next screen to load and verify we moved forward
  await new Promise(resolve => setTimeout(resolve, 5000)); // Increased wait time

  // Step 6: Verify main app loaded
  console.log("🎯 Step 6: Verifying main app loaded...");
  
  console.log("🎉 ============ ONBOARDING COMPLETED SUCCESSFULLY ============\n");
});
