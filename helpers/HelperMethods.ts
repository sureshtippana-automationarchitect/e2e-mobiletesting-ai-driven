import { Locator, expect } from '@playwright/test';

/**
 * HelperMethods class provides reusable utility methods for mobile test automation
 * including element interactions, waiting strategies, mobile gestures, and logging actions.
 */
export class HelperMethods {
    private screen: any;
    private device: any;
    private readonly defaultTimeout: number = 60000;

    /**
     * Constructor to initialize the HelperMethods class
     * @param screen - Screen instance for mobile testing
     * @param device - Device instance for mobile testing
     */
    constructor(screen: any, device: any) {
        this.screen = screen;
        this.device = device;
    }

    /**
     * Waits for an element to be hidden
     * @param locator - Element locator
     * @param timeout - Maximum wait time in milliseconds (default: 60000)
     */
    async waitForElementToBeHidden(locator: any, timeout: number = 60000): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout });
    }

    /**
     * Waits until a locator is visible, validates it, and returns it
     * @param locator - Element locator
     * @param timeout - Maximum wait time in milliseconds (default: 60000)
     * @returns The visible locator
     */
    async waitForElementToBeVisible(locator: any, timeout: number = 60000): Promise<any> {
        await locator.waitFor({ state: 'visible', timeout });
        await expect(locator).toBeVisible();
        return locator;
    }

    /**
     * Waits until a locator is hidden, validates it, and returns it
     * @param locator - Element locator
     * @param timeout - Maximum wait time in milliseconds (default: 40000)
     * @returns The hidden locator
     */
    async waitForElementNotToBeVisible(locator: any, timeout: number = 40000): Promise<any> {
        await locator.waitFor({ state: 'hidden', timeout });
        await expect(locator).not.toBeVisible();
        return locator;
    }

    /**
     * Validates that an element is visible and logs a message
     * @param locator - Element locator
     * @param logMessage - Message to log after validation
     */
    async validate(locator: any, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        console.log(logMessage);
    }

    /**
     * Validates that an element has a specific value and logs a message
     * @param locator - Element locator
     * @param expectedValue - Expected value
     * @param logMessage - Message to log after validation
     */
    async validateValue(locator: any, expectedValue: string, logMessage: string): Promise<void> {
        await expect(locator).toHaveValue(expectedValue);
        console.log(logMessage);
    }

    /**
     * Validates that an element contains specific text and logs a message
     * @param locator - Element locator
     * @param expectedValue - Expected text
     * @param logMessage - Message to log after validation
     */
    async validateTextContains(locator: any, expectedValue: string, logMessage: string): Promise<void> {
        await expect(locator).toContainText(expectedValue);
        console.log(logMessage);
    }

    /**
     * Taps/Clicks an element after waiting for it to be visible and logs the action
     * @param locator - Element locator
     * @param logMessage - Message to log after tapping
     */
    async tapElement(locator: any, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.tap();
        console.log(logMessage);
    }

    /**
     * Alias for tapElement - clicks an element (mobile tap)
     * @param locator - Element locator
     * @param logMessage - Message to log after clicking
     */
    async clickElement(locator: any, logMessage: string): Promise<void> {
        await this.tapElement(locator, logMessage);
    }

    /**
     * Fills an input field after clearing it and logs the action
     * @param locator - Element locator
     * @param value - Value to fill in the input
     * @param logMessage - Message to log after filling
     */
    async fillInput(locator: any, value: string, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.clear();
        await locator.fill(value);
        console.log(logMessage);
    }

    /**
     * Types input character by character to trigger auto-complete/auto-suggest functionality.
     * Use this for fields with auto-suggestions instead of fillInput().
     * @param locator - Element locator
     * @param value - Value to type
     * @param logMessage - Message to log after typing
     * @param delay - Delay between keystrokes in milliseconds (default: 50ms)
     */
    async typeInput(locator: any, value: string, logMessage: string, delay: number = 50): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.clear();
        await locator.pressSequentially(value, { delay });
        console.log(logMessage);
    }

    /**
     * Gets the text content of an element
     * @param locator - Element locator
     * @returns Text content of the element
     */
    async getText(locator: any): Promise<string> {
        await this.waitForElementToBeVisible(locator);
        return await locator.textContent() || '';
    }

    /**
     * Checks if an element is visible
     * @param locator - Element locator
     * @returns Boolean indicating visibility
     */
    async isVisible(locator: any): Promise<boolean> {
        try {
            return await locator.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Checks if an element is enabled
     * @param locator - Element locator
     * @returns Boolean indicating if element is enabled
     */
    async isEnabled(locator: any): Promise<boolean> {
        return await locator.isEnabled();
    }

    /**
     * Swipe in a specified direction (mobile gesture)
     * @param direction - Direction to swipe ('up', 'down', 'left', 'right')
     * @param duration - Duration of swipe in milliseconds (default: 500)
     */
    async swipe(direction: 'up' | 'down' | 'left' | 'right', duration: number = 500): Promise<void> {
        console.log(`👉 Swiping ${direction}...`);
        await this.screen.swipe({ direction, duration });
        console.log(`✅ Swiped ${direction}`);
    }

    /**
     * Scroll to element
     * @param locator - Element to scroll to
     */
    async scrollToElement(locator: any): Promise<void> {
        await locator.waitFor({ state: 'attached', timeout: 60000 });
        await locator.scrollIntoView();
    }

    /**
     * Take screenshot
     * @param description - Description for the screenshot
     */
    async takeScreenshot(description: string = 'current screen'): Promise<void> {
        console.log(`📸 Taking screenshot: ${description}`);
        await this.screen.screenshot();
    }

    /**
     * Wait for specified duration
     * @param milliseconds - Time to wait in milliseconds
     */
    async wait(milliseconds: number): Promise<void> {
        console.log(`⏱️  Waiting for ${milliseconds}ms...`);
        await new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    /**
     * Get current date and time in MMDDHHmmss format
     * @returns Formatted date-time string
     */
    async getCurrentDateTime(): Promise<string> {
        const now = new Date();
        console.log("date is:", now);
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `${month}${day}${hours}${minutes}${seconds}`;
    }

    /**
     * Check an element after waiting for it to be visible and logs the action
     * @param locator - Element locator
     * @param logMessage - Message to log after checking
     */
    async checkElement(locator: any, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.check();
        console.log(logMessage);
    }

    /**
     * Double taps an element after waiting for it to be visible and logs the action
     * @param locator - Element locator
     * @param logMessage - Message to log after double tapping
     */
    async doubleTapElement(locator: any, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.dblclick();
        console.log(logMessage);
    }

    /**
     * Long press on an element (mobile gesture)
     * @param locator - Element locator
     * @param duration - Duration of long press in milliseconds (default: 1000)
     * @param logMessage - Message to log after long press
     */
    async longPress(locator: any, duration: number = 1000, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        // Implement long press based on your mobile testing framework capabilities
        await locator.press({ duration });
        console.log(logMessage);
    }

    /**
     * Get element by text from screen
     * @param text - Text to find (string or RegExp)
     * @returns Element locator
     */
    getElementByText(text: string | RegExp): any {
        return this.screen.getByText(text);
    }

    /**
     * Terminate app
     * @param packageName - Package name of the app
     */
    async terminateApp(packageName: string): Promise<void> {
        try {
            console.log(`🛑 Terminating app: ${packageName}...`);
            await this.device.terminateApp(packageName);
            console.log(`✅ App terminated`);
        } catch (error) {
            console.log(`ℹ️  App not running or already terminated`);
        }
    }

    /**
     * Launch app
     * @param packageName - Package name of the app
     */
    async launchApp(packageName: string): Promise<void> {
        console.log(`🚀 Launching app: ${packageName}...`);
        await this.device.launchApp(packageName);
        console.log(`✅ App launched`);
    }

    /**
     * Restart app
     * @param packageName - Package name of the app
     */
    async restartApp(packageName: string): Promise<void> {
        await this.terminateApp(packageName);
        await this.wait(1000);
        await this.launchApp(packageName);
    }

    /**
     * Get the screen instance
     * @returns Screen instance
     */
    public getScreen(): any {
        return this.screen;
    }

    /**
     * Get the device instance
     * @returns Device instance
     */
    public getDevice(): any {
        return this.device;
    }
}
