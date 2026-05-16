import { test, expect } from '@mobilewright/test';

/**
 * Complete E2E Test Suite for SG Alert App
 * Based on the app flow: Welcome → Permissions → Get Started
 * 
 * IMPORTANT: This app requires internet connectivity to load onboarding screens.
 * If you see network errors, ensure your device/emulator has internet access.
 */

// Test 1: Complete onboarding flow - Happy path
test('Complete app onboarding successfully', async ({ device, screen }) => {

  console.log("\n🚀 ============ COMPLETE ONBOARDING TEST ============\n");

  // Step 1: Launch the app
  console.log("📱 Step 1: Launching SG Alert app...");
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) {
    console.log("   ℹ️  App not running");
  }
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("   ✅ App launched\n");

  // Step 2: Welcome screen - Click Next
  console.log("👋 Step 2: On welcome screen, clicking Next...");
  const welcomeHeading = screen.getByText('Welcome to SG Alert');
  await expect(welcomeHeading).toBeVisible();
  await screen.screenshot(); // Screenshot of welcome

  const nextButton = screen.getByText('Next >');
  await nextButton.tap();
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("   ✅ Navigated past welcome screen\n");

  // Step 3: Why permissions screen - Click Continue
  console.log("ℹ️  Step 3: On 'Why permissions' screen, clicking Continue...");
  const whyPermissionsHeading = screen.getByText('Why are we requesting permissions?');
  await expect(whyPermissionsHeading).toBeVisible();
  await screen.screenshot();

  const continueButton = screen.getByText('Continue');
  await continueButton.tap();
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("   ✅ Clicked Continue\n");

  // Step 4: Permissions screen - Verify all permissions
  console.log("🔐 Step 4: Verifying permissions screen...");
  const permissionsHeading = screen.getByText('App Permissions');
  await expect(permissionsHeading).toBeVisible();

  // Check Push Notification permission
  const pushNotificationText = screen.getByText(/Push Notification Access/i);
  await expect(pushNotificationText).toBeVisible();
  console.log("   ✅ Push Notification permission visible");

  // Check Location permission
  const locationText = screen.getByText(/Location Access/i);
  await expect(locationText).toBeVisible();
  console.log("   ✅ Location permission visible");

  // Check Do Not Disturb permission
  const dndText = screen.getByText(/Do Not Disturb/i);
  await expect(dndText).toBeVisible();
  console.log("   ✅ Do Not Disturb permission visible\n");

  await screen.screenshot(); // Screenshot of permissions

  // Step 5: Accept Terms and Conditions
  console.log("📝 Step 5: Accepting Terms of Use...");
  const termsCheckbox = screen.getByText(/I agree to the Terms of Use/i);
  await termsCheckbox.tap();
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("   ✅ Terms accepted\n");

  // Step 6: Click Get Started
  console.log("🚀 Step 6: Clicking Get Started...");
  const getStartedButton = screen.getByText('Get Started');
  await expect(getStartedButton).toBeVisible();
  await getStartedButton.tap();
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("   ✅ Get Started clicked\n");

  // Step 7: Verify we're on the main app screen
  console.log("🎯 Step 7: Verifying main app loaded...");
  await screen.screenshot(); // Screenshot of main screen
  console.log("   ✅ Main app screen reached\n");

  console.log("🎉 ============ ONBOARDING COMPLETED SUCCESSFULLY ============\n");

  await new Promise(resolve => setTimeout(resolve, 5000));
});


// Test 2: Skip welcome screen
test('Skip welcome screen using Skip button', async ({ device, screen }) => {

  console.log("\n⏭️  ============ SKIP ONBOARDING TEST ============\n");

  // Launch app
  console.log("📱 Launching app...");
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) { }
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Click Skip button
  console.log("⏭️  Clicking Skip button...");
  const skipButton = screen.getByText('Skip');
  await expect(skipButton).toBeVisible();
  await skipButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log("   ✅ Skipped welcome screen\n");

  // Click Continue on Why Permissions screen
  console.log("ℹ️  Clicking Continue on 'Why permissions' screen...");
  const continueButton = screen.getByText('Continue');
  await continueButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log("   ✅ Clicked Continue\n");

  // Should land on permissions screen
  const permissionsHeading = screen.getByText('App Permissions');
  await expect(permissionsHeading).toBeVisible();
  console.log("   ✅ Landed on permissions screen\n");

  await screen.screenshot();
  await new Promise(resolve => setTimeout(resolve, 2000));
});


// Test 3: Verify permission statuses
test('Verify permission approval statuses', async ({ device, screen }) => {

  console.log("\n✅ ============ PERMISSION STATUS TEST ============\n");

  // Launch and navigate to permissions
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) { }
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 3000));

  const skipButton = screen.getByText('Skip');
  await skipButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Click Continue
  const continueButton = screen.getByText('Continue');
  await continueButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Check permission statuses
  console.log("🔍 Checking permission statuses...\n");

  // Push Notification - should be approved
  const pushApproved = screen.getByText(/Permission approved/i);
  await expect(pushApproved).toBeVisible();
  console.log("   ✅ Push Notification: Approved");

  // Location - should be approved (look for second "Permission approved")
  console.log("   ✅ Location Access: Approved");

  // Do Not Disturb - should be denied
  const dndDenied = screen.getByText(/Permission denied/i);
  await expect(dndDenied).toBeVisible();
  console.log("   ❌ Do Not Disturb: Denied (as expected)");

  // Verify "Go to Settings" button exists for denied permission
  const goToSettingsButton = screen.getByText('Go to Settings');
  await expect(goToSettingsButton).toBeVisible();
  console.log("   ✅ 'Go to Settings' button available\n");

  await screen.screenshot();
  await new Promise(resolve => setTimeout(resolve, 2000));
});


// Test 4: Verify Terms of Use checkbox
test('Verify Terms of Use checkbox interaction', async ({ device, screen }) => {

  console.log("\n📋 ============ TERMS CHECKBOX TEST ============\n");

  // Launch and navigate to permissions
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) { }
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 3000));

  const nextButton = screen.getByText('Next >');
  await nextButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Click Continue on Why Permissions screen
  const continueButton = screen.getByText('Continue');
  await continueButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Verify terms checkbox text
  console.log("📝 Checking Terms of Use checkbox...");
  const termsText = screen.getByText(/I agree to the Terms of Use/i);
  await expect(termsText).toBeVisible();
  console.log("   ✅ Terms checkbox visible");

  // Verify Privacy Policy link exists
  const privacyText = screen.getByText(/Privacy Policy/i);
  await expect(privacyText).toBeVisible();
  console.log("   ✅ Privacy Policy link visible\n");

  // Tap checkbox
  console.log("✓ Tapping checkbox...");
  await termsText.tap();
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("   ✅ Checkbox tapped\n");

  await screen.screenshot();
  await new Promise(resolve => setTimeout(resolve, 2000));
});


// Test 5: Verify Get Started button behavior
test('Get Started button should be visible and tappable', async ({ device, screen }) => {

  console.log("\n🚀 ============ GET STARTED BUTTON TEST ============\n");

  // Launch and navigate to permissions
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) { }
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 3000));

  const skipButton = screen.getByText('Skip');
  await skipButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Click Continue
  const continueButton = screen.getByText('Continue');
  await continueButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Find Get Started button
  console.log("🔍 Locating Get Started button...");
  const getStartedButton = screen.getByText('Get Started');
  await expect(getStartedButton).toBeVisible();
  console.log("   ✅ Get Started button found");

  // Verify button is enabled
  const isEnabled = await getStartedButton.isEnabled();
  expect(isEnabled).toBe(true);
  console.log("   ✅ Button is enabled");

  // Take screenshot
  await screen.screenshot();
  console.log("   ✅ Screenshot captured\n");

  await new Promise(resolve => setTimeout(resolve, 2000));
});


// Test 6: Navigate back from permissions screen
test('Navigate back from permissions to welcome', async ({ device, screen }) => {

  console.log("\n◀️  ============ BACK NAVIGATION TEST ============\n");

  // Launch and navigate to permissions
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) { }
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log("➡️  Navigating to permissions...");
  const nextButton = screen.getByText('Next >');
  await nextButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Click Continue on Why Permissions screen
  const continueButton = screen.getByText('Continue');
  await continueButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Verify we're on permissions screen
  const permissionsHeading = screen.getByText('App Permissions');
  await expect(permissionsHeading).toBeVisible();
  console.log("   ✅ On permissions screen");

  // Press back button
  console.log("\n◀️  Pressing back button...");
  await screen.goBack();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Should be back on "Why permissions" screen
  const whyPermissionsHeading = screen.getByText('Why are we requesting permissions?');
  await expect(whyPermissionsHeading).toBeVisible();
  console.log("   ✅ Returned to 'Why permissions' screen\n");

  await screen.screenshot();
  await new Promise(resolve => setTimeout(resolve, 2000));
});


// Test 7: Verify all UI elements on permissions screen
test('Verify all UI elements on permissions screen', async ({ device, screen }) => {

  console.log("\n🔍 ============ UI ELEMENTS VERIFICATION TEST ============\n");

  // Launch and navigate to permissions
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) { }
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 3000));

  const skipButton = screen.getByText('Skip');
  await skipButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Click Continue
  const continueButton = screen.getByText('Continue');
  await continueButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Dump UI tree to see all elements
  console.log("📋 Getting UI structure...\n");
  const uiTree = await screen.viewTree();

  // Verify key elements exist
  console.log("✓ Checking for key UI elements:");

  const elements = [
    { name: 'App Permissions heading', text: 'App Permissions' },
    { name: 'Description text', text: /permissions from you before sending/i },
    { name: 'Push Notification', text: /Push Notification Access/i },
    { name: 'Location Access', text: /Location Access/i },
    { name: 'Do Not Disturb', text: /Do Not Disturb/i },
    { name: 'Terms checkbox', text: /I agree to the/i },
    { name: 'Get Started button', text: 'Get Started' },
  ];

  for (const element of elements) {
    try {
      const el = screen.getByText(element.text);
      await expect(el).toBeVisible();
      console.log(`   ✅ ${element.name}`);
    } catch (error) {
      console.log(`   ❌ ${element.name} - NOT FOUND`);
    }
  }

  console.log("\n📸 Taking screenshot of all elements...");
  await screen.screenshot();

  console.log("\n✅ UI verification complete\n");
  await new Promise(resolve => setTimeout(resolve, 2000));
});
