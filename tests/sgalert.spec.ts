import { test, expect } from '@mobilewright/test';

test('Launch sgAlert Android App', async ({ device, screen }) => {

  console.log("\n🚀 ============ STARTING TEST ============");
  console.log("📱 Watch your emulator to see the test in action!\n");

  // ✅ Verify device is initialized
  if (!device) {
    throw new Error("❌ Device not initialized properly");
  }

  // 🔄 Terminate app if running, then launch fresh
  console.log("🔄 Step 1: Terminating app if already running...");
  await new Promise(resolve => setTimeout(resolve, 1000)); // Pause so you can watch
  
  try {
    await device.terminateApp('com.senecaglobal.sgalert.internal');
    console.log("   ✓ App terminated");
  } catch (error) {
    console.log("   ℹ️  App was not running");
  }
  
  console.log("\n🚀 Step 2: Launching sgAlert app...");
  await device.launchApp('com.senecaglobal.sgalert.internal');
  console.log("   ✓ App launch command sent");

  // Wait for app to initialize (watch your emulator!)
  console.log("\n⏳ Step 3: Waiting for app to load (watch your emulator)...");
  await new Promise(resolve => setTimeout(resolve, 4000));
  console.log("   ✓ App should be visible now");

  // 🔍 FIRST: Let's see what elements are on the screen!
  console.log("\n🔍 Step 4: Inspecting UI hierarchy (to find available locators)...");
  const uiTree = await screen.viewTree();
  console.log("\n========== UI TREE START ==========");
  console.log(JSON.stringify(uiTree, null, 2));
  console.log("========== UI TREE END ==========\n");
  
  // Now you can see all elements and write locators based on the tree above
  console.log("   ✅ UI tree printed! Look above to find element properties");
  
  // Take a screenshot
  console.log("\n📸 Step 5: Capturing screenshot...");
  const screenshot = await screen.screenshot();
  expect(screenshot).toBeTruthy();
  console.log("   ✅ Screenshot captured successfully!");
  
  console.log("\n🎉 ============ TEST COMPLETED SUCCESSFULLY ============\n");
  
  // Give mobilecli time to clean up connections (Windows workaround)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Example: How to interact with elements after finding them:
  // const nextButton = screen.getByText('Next');
  // await nextButton.tap();
  
  // const emailField = screen.getByLabel('Email');
  // await emailField.fill('test@example.com');
});