import { HelperMethods } from '../helpers/HelperMethods';

/**
 * BasePage - Foundation class for Page Object Model
 * Provides access to HelperMethods and basic page setup
 * 
 * This class follows the Page Object Model (POM) design pattern:
 * - Separates test logic from page-specific code
 * - Provides reusable helper methods through HelperMethods class
 * - Easy maintenance when UI changes
 * - Improves test readability
 */
export class BasePage {
  protected helper: HelperMethods;
  protected screen: any;
  protected device: any;

  /**
   * Constructor - Initializes the BasePage with screen and device instances
   * @param screen - Screen instance for mobile testing
   * @param device - Device instance for mobile testing
   */
  constructor(screen: any, device: any) {
    this.screen = screen;
    this.device = device;
    this.helper = new HelperMethods(screen, device);
  }

  /**
   * Gets the HelperMethods instance for advanced operations
   * @returns HelperMethods instance associated with this page
   * 
   * @example
   * const helperMethods = page.getHelperMethods();
   * await helperMethods.takeScreenshot('onboarding-screen');
   */
  public getHelperMethods(): HelperMethods {
    return this.helper;
  }

  /**
   * Gets the screen instance
   * @returns Screen instance
   */
  protected getScreen(): any {
    return this.screen;
  }

  /**
   * Gets the device instance
   * @returns Device instance
   */
  protected getDevice(): any {
    return this.device;
  }
}
