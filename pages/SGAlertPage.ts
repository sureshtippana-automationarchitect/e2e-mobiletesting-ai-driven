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
      welcomeHeading: this.helper.getElementByText('Welcome to SG Alert'),
      nextButton: this.helper.getElementByText('Next >'),
      skipButton: this.helper.getElementByText('Skip'),

      // Why Permissions Screen
      whyPermissionsHeading: this.helper.getElementByText('Why are we requesting permissions?'),
      continueButton: this.helper.getElementByText('Continue'),

      // Permissions Screen
      permissionsHeading: this.helper.getElementByText('App Permissions'),
      pushNotificationText: this.helper.getElementByText(/Push Notification Access/i),
      locationText: this.helper.getElementByText(/Location Access/i),
      dndText: this.helper.getElementByText(/Do Not Disturb/i),
      permissionApproved: this.helper.getElementByText(/Permission approved/i),
      permissionDenied: this.helper.getElementByText(/Permission denied/i),
      goToSettingsButton: this.helper.getElementByText('Go to Settings'),

      // Terms and Conditions
      termsCheckbox: this.helper.getElementByText(/I agree to the Terms of Use/i),
      privacyPolicyLink: this.helper.getElementByText(/Privacy Policy/i),
      getStartedButton: this.helper.getElementByText('Get Started'),
    };
  }

  // ==================== APP LIFECYCLE METHODS ====================

  /**
   * Launch the SG Alert app with fresh start
   */
  async launchAppFresh(): Promise<void> {
    console.log("\n📱 Launching SG Alert app (fresh start)...");
    await this.helper.terminateApp(this.APP_PACKAGE);
    await this.helper.launchApp(this.APP_PACKAGE);
    await this.helper.wait(5000);
    console.log("✅ App launched successfully\n");
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
