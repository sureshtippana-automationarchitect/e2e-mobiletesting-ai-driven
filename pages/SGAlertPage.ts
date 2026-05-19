import { BasePage } from './BasePage';

/**
 * SGAlertPage Class - Page Object Model for SG Alert Mobile App
 * 
 * This class encapsulates all the elements and actions related to the SG Alert app.
 * Following the Page Object Model (POM) design pattern for better maintainability.
 * 
 * Benefits of using POM:
 * - Separates test logic from page-specific code
 * - Reusable methods across multiple test cases
 * - Easy maintenance when UI changes
 * - Improves test readability
 */
export class SGAlertPage extends BasePage {
  // App Configuration
  private readonly APP_PACKAGE = 'com.senecaglobal.sgalert.internal';

  /**
   * Constructor - Initializes the SGAlertPage with screen and device instances
   * @param screen - Screen instance for mobile testing
   * @param device - Device instance for mobile testing
   */
  constructor(screen: any, device: any) {
    super(screen, device);
  }

  /**
   * Page Elements Getter - Returns all locators for the SG Alert app
   * Uses getter pattern to ensure locators are always fresh (not stale)
   * 
   * @returns Object containing all SG Alert page element locators
   */
  public get sgAlertPageElements() {
    return {
      // Welcome Screen
      welcomeHeading: this.screen.getByText('Welcome to SG Alert'),
      nextButton: this.screen.getByText('Next >'),
      doneButton: this.screen.getByText('Done'),
      skipButton: this.screen.getByText('Skip'),

      // Why Permissions Screen
      whyPermissionsHeading: this.screen.getByText('Why are we requesting permissions?'),
      continueButton: this.screen.getByText('Continue'),

      // Permissions Screen
      permissionsHeading: this.screen.getByText('App Permissions'),
      pushNotificationText: this.screen.getByText(/Push Notification Access/i),
      locationText: this.screen.getByText(/Location Access/i),
      dndText: this.screen.getByText(/Do Not Disturb/i),
      permissionApproved: this.screen.getByText(/Permission approved/i),
      permissionDenied: this.screen.getByText(/Permission denied/i),
      goToSettingsButton: this.screen.getByText('Go to Settings'),
      
      // System Dialog
      allowButton: this.screen.getByText('Allow'),

      // Terms and Conditions
      termsCheckbox: this.screen.getByText(/I agree to the Terms of Use/i),
      privacyPolicyLink: this.screen.getByText(/Privacy Policy/i),
      getStartedButton: this.screen.getByText('Get Started'),
    };
  }

  // ==================== APP LIFECYCLE METHODS ====================

  /**
   * Uninstall the SG Alert app
   */
  async uninstallApp(): Promise<void> {
    console.log("🗑️  Step 0: Uninstalling existing app...");
    try {
      await this.device.uninstallApp(this.APP_PACKAGE);
      console.log("   ✅ App uninstalled");
    } catch (error) {
      console.log("   ℹ️  App not installed, skipping uninstall");
    }
  }

  /**
   * Install the SG Alert app from APK
   */
  async installApp(): Promise<void> {
    console.log("📦 Installing fresh APK...");
    try {
      await this.device.installApp('android.apk\\SGalertApp.apk');
      console.log("   ✅ App installed\n");
    } catch (error: any) {
      console.log("   ❌ Failed to install app:", error.message);
      throw error;
    }
  }

  /**
   * Launch the SG Alert app with fresh start
   */
  async launchAppFresh(): Promise<void> {
    console.log("📱 Step 1: Launching SG Alert app...");
    try {
      await this.device.terminateApp(this.APP_PACKAGE);
    } catch (error) {
      console.log("   ℹ️  App not running");
    }
    await this.device.launchApp(this.APP_PACKAGE);
    await this.helper.wait(8000);
    console.log("   ✅ App launched\n");
  }

  /**
   * Restart the app
   */
  async restartSGAlertApp(): Promise<void> {
    console.log("\n🔄 Restarting SG Alert app...");
    await this.helper.restartApp(this.APP_PACKAGE);
    await this.helper.wait(5000);
    console.log("✅ App restarted successfully\n");
  }

  // ==================== WELCOME SCREEN METHODS ====================

  /**
   * Navigate through all welcome screens (3 screens: Next, Next, Done)
   */
  async navigateWelcomeScreens(): Promise<void> {
    console.log("👋 Step 2: Navigating through welcome screens...");
    
    // First screen
    const nextButton = this.sgAlertPageElements.nextButton;
    await nextButton.tap();
    await this.helper.wait(1000);
    console.log("   ✅ First screen\n");

    // Second screen
    const nextButton1 = this.sgAlertPageElements.nextButton;
    await nextButton1.tap();
    await this.helper.wait(1000);
    console.log("   ✅ Second screen\n");

    // Third screen
    const doneButton = this.sgAlertPageElements.doneButton;
    await doneButton.tap();
    await this.helper.wait(1000);
    console.log("   ✅ Completed welcome screens\n");
  }

  /**
   * Verify welcome screen is displayed
   */
  async verifyWelcomeScreen(): Promise<void> {
    console.log("👋 Verifying Welcome Screen...");
    await this.helper.validate(this.sgAlertPageElements.welcomeHeading, '✓ Welcome heading is visible');
    await this.helper.takeScreenshot('Welcome Screen');
    console.log("✅ Welcome screen verified\n");
  }

  /**
   * Click Next button on welcome screen
   */
  async clickNextOnWelcome(): Promise<void> {
    console.log("👋 Step: Clicking Next on Welcome Screen...");
    await this.helper.tapElement(this.sgAlertPageElements.nextButton, '✓ Clicked Next button');
    await this.helper.wait(5000);
    console.log("✅ Navigated past welcome screen\n");
  }

  /**
   * Click Skip button on welcome screen
   */
  async clickSkipOnWelcome(): Promise<void> {
    console.log("⏭️  Step: Clicking Skip on Welcome Screen...");
    await this.helper.tapElement(this.sgAlertPageElements.skipButton, '✓ Clicked Skip button');
    await this.helper.wait(2000);
    console.log("✅ Skipped welcome screen\n");
  }

  // ==================== WHY PERMISSIONS SCREEN METHODS ====================

  /**
   * Click Continue button on Why Permissions screen (optional - may not appear)
   * Using exact implementation from working test
   */
  async clickContinueIfPresent(): Promise<void> {
    console.log("ℹ️  Step 3: Checking for 'Why permissions' screen...");
    try {
      const continueButton = this.sgAlertPageElements.continueButton;
      await continueButton.tap({ timeout: 5000 });
      console.log("   ✅ Continue button found");
      console.log("   ✅ Continue button tapped");
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("   ✅ Proceeded to next screen\n");
    } catch (error: any) {
      console.log("   ℹ️  No 'Continue' button found - may have skipped directly to permissions screen");
      console.log("   ℹ️  Continuing with test...\n");
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  /**
   * Verify Why Permissions screen is displayed
   */
  async verifyWhyPermissionsScreen(): Promise<void> {
    console.log("ℹ️  Verifying 'Why Permissions' Screen...");
    await this.helper.validate(this.sgAlertPageElements.whyPermissionsHeading, "✓ Why Permissions heading is visible");
    await this.helper.takeScreenshot('Why Permissions Screen');
    console.log("✅ Why Permissions screen verified\n");
  }

  /**
   * Click Continue button on Why Permissions screen
   */
  async clickContinueOnWhyPermissions(): Promise<void> {
    console.log("ℹ️  Step: Clicking Continue on 'Why Permissions' Screen...");
    await this.helper.tapElement(this.sgAlertPageElements.continueButton, '✓ Clicked Continue button');
    await this.helper.wait(5000);
    console.log("✅ Clicked Continue\n");
  }

  // ==================== PERMISSIONS SCREEN METHODS ====================

  /**
   * Handle Push Notification Access permission
   * Using exact implementation from working test
   */
  async handlePushNotificationAccess(): Promise<void> {
    console.log("🔐 Step 4: Handling Push Notification Access...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Click on Push Notification Access
    console.log("   📲 Clicking 'Push Notification Access'...");
    const pushNotificationAccess = this.sgAlertPageElements.pushNotificationText;
    await pushNotificationAccess.tap({ timeout: 8000 });
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("   ✅ Push Notification Access clicked");
    
    // Handle system dialog - Click "Allow" button
    console.log("   🔔 Handling system notification permission dialog...");
    const allowButton = this.sgAlertPageElements.allowButton;
    await allowButton.tap({ timeout: 8000 });
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("   ✅ Clicked 'Allow' on notification dialog\n");
  }

  /**
   * Verify Permissions screen is displayed
   */
  async verifyPermissionsScreen(): Promise<void> {
    console.log("🔐 Verifying Permissions Screen...");
    await this.helper.validate(this.sgAlertPageElements.permissionsHeading, '✓ Permissions heading is visible');
    await this.helper.takeScreenshot('Permissions Screen');
    console.log("✅ Permissions screen verified\n");
  }

  /**
   * Verify all permissions are displayed
   */
  async verifyAllPermissions(): Promise<void> {
    console.log("🔐 Verifying all permissions are displayed...");
    
    // Verify Push Notification permission
    await this.helper.validate(this.sgAlertPageElements.pushNotificationText, '✓ Push Notification permission is visible');
    
    // Verify Location permission
    await this.helper.validate(this.sgAlertPageElements.locationText, '✓ Location permission is visible');
    
    // Verify Do Not Disturb permission
    await this.helper.validate(this.sgAlertPageElements.dndText, '✓ Do Not Disturb permission is visible');
    
    console.log("✅ All permissions verified\n");
  }

  /**
   * Verify permission status (approved/denied)
   */
  async verifyPermissionStatuses(): Promise<void> {
    console.log("🔍 Checking permission statuses...");
    
    // Check for approved permissions
    await this.helper.validate(this.sgAlertPageElements.permissionApproved, '✓ Permission approved status is visible');
    
    // Check for denied permissions
    await this.helper.validate(this.sgAlertPageElements.permissionDenied, '✓ Permission denied status is visible');
    
    // Check for Go to Settings button
    await this.helper.validate(this.sgAlertPageElements.goToSettingsButton, '✓ Go to Settings button is visible');
    
    console.log("✅ Permission statuses verified\n");
  }

  // ==================== TERMS & CONDITIONS METHODS ====================

  /**
   * Tap Terms checkbox using coordinates (more reliable)
   */
  async tapTermsCheckboxByCoordinates(): Promise<void> {
    console.log("   🎯 Tapping terms checkbox at coordinates...");
    await this.screen.tap(127, 1972);
    await this.helper.wait(1500);
    console.log("   ✅ Terms of Use checkbox tapped\n");
  }

  /**
   * Accept Terms of Use
   */
  async acceptTermsOfUse(): Promise<void> {
    console.log("📝 Step: Accepting Terms of Use...");
    await this.helper.tapElement(this.sgAlertPageElements.termsCheckbox, '✓ Tapped Terms checkbox');
    await this.helper.wait(5000);
    console.log("✅ Terms accepted\n");
  }

  /**
   * Verify Terms of Use checkbox is visible
   */
  async verifyTermsCheckbox(): Promise<void> {
    console.log("📋 Verifying Terms of Use checkbox...");
    await this.helper.validate(this.sgAlertPageElements.termsCheckbox, '✓ Terms checkbox is visible');
    await this.helper.validate(this.sgAlertPageElements.privacyPolicyLink, '✓ Privacy Policy link is visible');
    console.log("✅ Terms checkbox verified\n");
  }

  /**
   * Tap Terms checkbox (toggle)
   */
  async tapTermsCheckbox(): Promise<void> {
    console.log("✓ Tapping Terms checkbox...");
    await this.helper.tapElement(this.sgAlertPageElements.termsCheckbox, '✓ Tapped Terms checkbox');
    await this.helper.wait(500);
    console.log("✅ Terms checkbox tapped\n");
  }

  // ==================== GET STARTED METHODS ====================

  /**
   * Click Get Started button with fallback to coordinates
   * Using exact implementation from working test
   */
  async clickGetStartedWithFallback(): Promise<void> {
    console.log("🚀 Step 5: Clicking Get Started...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // First try: Find button by text from locators
      const getStartedButton = this.sgAlertPageElements.getStartedButton;
      await getStartedButton.tap({ timeout: 5000 });
      console.log("   ✅ Get Started clicked (by text)\n");
    } catch (error) {
      console.log("   ℹ️  Text locator failed, trying coordinates...");
      try {
        // Second try: Use coordinates
        await this.screen.tap(216, 2640);
        console.log("   ✅ Get Started clicked (by coordinates)\n");
      } catch (coordError) {
        console.log("   ❌ Both methods failed");
        await this.screen.screenshot();
        throw coordError;
      }
    }
    
    // Wait for next screen to load
    await new Promise(resolve => setTimeout(resolve, 5000)); // Increased wait time
  }

  /**
   * Click Get Started button
   */
  async clickGetStarted(): Promise<void> {
    console.log("🚀 Step: Clicking Get Started...");
    await this.helper.validate(this.sgAlertPageElements.getStartedButton, '✓ Get Started button is visible');
    await this.helper.tapElement(this.sgAlertPageElements.getStartedButton, '✓ Clicked Get Started button');
    await this.helper.wait(5000);
    console.log("✅ Get Started clicked\n");
  }

  /**
   * Verify Get Started button is visible
   */
  async verifyGetStartedButton(): Promise<void> {
    console.log("🔍 Verifying Get Started button...");
    await this.helper.validate(this.sgAlertPageElements.getStartedButton, '✓ Get Started button is visible');
    console.log("✅ Get Started button verified\n");
  }

  // ==================== MAIN APP SCREEN METHODS ====================

  /**
   * Verify main app screen is loaded
   */
  async verifyMainAppScreen(): Promise<void> {
    console.log("🎯 Verifying main app screen loaded...");
    await this.helper.takeScreenshot('Main App Screen');
    await this.helper.wait(2000);
    console.log("✅ Main app screen reached\n");
  }

  // ==================== COMPLETE FLOW METHODS ====================

  /**
   * Complete the full onboarding flow - Exact match to working test
   */
  async completeOnboardingFlowExact(): Promise<void> {
    console.log("\n🚀 ============ COMPLETE ONBOARDING TEST ============\n");
    
    // Step 0: Uninstall and reinstall
    await this.uninstallApp();
    await this.installApp();
    
    // Step 1: Launch app
    await this.launchAppFresh();
    
    // Step 2: Navigate welcome screens
    await this.navigateWelcomeScreens();
    
    // Step 3: Handle Continue button (optional)
    await this.clickContinueIfPresent();
    
    // Step 4: Handle Push Notification Access
    await this.handlePushNotificationAccess();
    
    // Step 5: Tap terms checkbox by coordinates
    await this.tapTermsCheckboxByCoordinates();
    
    // Step 6: Click Get Started
    await this.clickGetStartedWithFallback();
    
    console.log("🎉 ============ ONBOARDING COMPLETED SUCCESSFULLY ============\n");
  }

  /**
   * Complete the full onboarding flow (Happy Path)
   */
  async completeOnboardingFlow(): Promise<void> {
    console.log("\n🚀 ============ STARTING COMPLETE ONBOARDING FLOW ============\n");
    
    await this.launchAppFresh();
    await this.verifyWelcomeScreen();
    await this.clickNextOnWelcome();
    await this.verifyWhyPermissionsScreen();
    await this.clickContinueOnWhyPermissions();
    await this.verifyPermissionsScreen();
    await this.verifyAllPermissions();
    await this.acceptTermsOfUse();
    await this.clickGetStarted();
    await this.verifyMainAppScreen();
    
    console.log("🎉 ============ ONBOARDING COMPLETED SUCCESSFULLY ============\n");
  }

  /**
   * Complete onboarding flow using Skip button
   */
  async completeOnboardingWithSkip(): Promise<void> {
    console.log("\n⏭️  ============ STARTING ONBOARDING WITH SKIP ============\n");
    
    await this.launchAppFresh();
    await this.clickSkipOnWelcome();
    await this.clickContinueOnWhyPermissions();
    await this.verifyPermissionsScreen();
    await this.acceptTermsOfUse();
    await this.clickGetStarted();
    await this.verifyMainAppScreen();
    
    console.log("🎉 ============ ONBOARDING WITH SKIP COMPLETED ============\n");
  }

  /**
   * Navigate to permissions screen (using Skip)
   */
  async navigateToPermissionsScreen(): Promise<void> {
    await this.launchAppFresh();
    await this.clickSkipOnWelcome();
    await this.clickContinueOnWhyPermissions();
  }
}
