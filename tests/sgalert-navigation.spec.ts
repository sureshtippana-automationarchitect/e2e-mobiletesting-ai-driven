import { test, expect } from '@mobilewright/test';

/**
 * Example test showing how to write locators based on the UI tree
 * 
 * Run `node inspect-ui.js` anytime to see available elements
 */

test('Navigate through SG Alert onboarding', async ({ device, screen }) => {

  console.log("\n🚀 ============ STARTING TEST ============");
  console.log("📱 Watch your emulator!\n");

  // Launch the app
  console.log("🚀 Step 1: Launching app...");
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) {
    // App not running, that's fine
  }
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("   ✅ App launched\n");

  // Verify welcome screen
  console.log("🔍 Step 2: Verifying welcome screen...");
  const welcomeHeading = screen.getByText('Welcome to SG Alert');
  await expect(welcomeHeading).toBeVisible();
  console.log("   ✅ Welcome screen visible\n");

  // Take screenshot of welcome screen
  console.log("📸 Step 3: Capturing welcome screen...");
  await screen.screenshot();
  console.log("   ✅ Screenshot saved\n");

  // Click "Next" button
  console.log("👆 Step 4: Tapping 'Next' button...");
  const nextButton = screen.getByText('Next >');
  await nextButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log("   ✅ Next button tapped\n");

  // Verify we moved to next screen (whatever comes after welcome)
  console.log("🔍 Step 5: Checking next screen...");
  await new Promise(resolve => setTimeout(resolve, 2000));
  await screen.screenshot();
  console.log("   ✅ Next screen captured\n");

  console.log("🎉 ============ TEST COMPLETED ============\n");
  
  await new Promise(resolve => setTimeout(resolve, 2000));
});

// Alternative: Test the Skip button
test('Skip onboarding using Skip button', async ({ device, screen }) => {

  console.log("\n🚀 Testing Skip button\n");

  // Launch app
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
  } catch (error) {}
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Click Skip button instead
  console.log("👆 Tapping 'Skip' button...");
  const skipButton = screen.getByText('Skip');
  await skipButton.tap();
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log("   ✅ Skipped onboarding\n");

  await screen.screenshot();
  await new Promise(resolve => setTimeout(resolve, 2000));
});

// Example: Using different locator types
test('Different ways to find the same element', async ({ device, screen }) => {

  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Method 1: By exact text
  const nextButton1 = screen.getByText('Next >');
  
  // Method 2: By partial text (case insensitive)
  const nextButton2 = screen.getByText(/next/i);
  
  // Method 3: By element type (less reliable, finds first TextView)
  const textElement = screen.getByType('android.widget.TextView');
  
  // Use any method
  await nextButton1.tap();
  
  await new Promise(resolve => setTimeout(resolve, 2000));
});
