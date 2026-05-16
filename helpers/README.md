# Helpers Directory

This directory contains reusable utility classes that provide common functionality across the mobile testing framework.

## HelperMethods Class

The `HelperMethods` class provides a comprehensive set of utility methods for mobile test automation, including:

### Core Functionality

- **Element Interactions**: `tapElement()`, `clickElement()`, `fillInput()`, `typeInput()`
- **Waiting Strategies**: `waitForElementToBeVisible()`, `waitForElementToBeHidden()`, `wait()`
- **Validations**: `validate()`, `validateValue()`, `validateTextContains()`
- **Mobile Gestures**: `swipe()`, `scrollToElement()`, `longPress()`, `doubleTapElement()`
- **App Lifecycle**: `launchApp()`, `terminateApp()`, `restartApp()`
- **Utilities**: `takeScreenshot()`, `getCurrentDateTime()`, `getText()`, `isVisible()`

### Usage Pattern

The `HelperMethods` class follows a consistent pattern where:

1. **Wait for element** to be visible/ready
2. **Perform action** on the element
3. **Log the action** for better test debugging

Example:
```typescript
await this.helper.tapElement(locator, 'Clicked the Submit button');
```

This method will:
- Wait for the element to be visible
- Tap/click on it
- Log: "Clicked the Submit button"

### Integration with Page Objects

All page classes extend `BasePage`, which automatically initializes a `HelperMethods` instance:

```typescript
export class MyPage extends BasePage {
  constructor(screen: any, device: any) {
    super(screen, device);
    // this.helper is now available
  }

  async clickButton(): Promise<void> {
    await this.helper.tapElement(this.pageElements.button, 'Clicked button');
  }
}
```

## Benefits of This Pattern

### 1. **Separation of Concerns**
- Page Objects focus on **what** to test
- HelperMethods focus on **how** to interact with elements

### 2. **Reusability**
- Common operations are defined once and reused everywhere
- Reduces code duplication

### 3. **Maintainability**
- Changes to interaction logic happen in one place
- Easy to add new helper methods

### 4. **Consistency**
- All tests use the same waiting and interaction strategies
- Uniform logging across all tests

### 5. **Readability**
- Test code is more readable and self-documenting
- Clear separation between element location and action

## Adding New Helper Methods

When adding new helper methods, follow these guidelines:

1. **Use descriptive names**: `tapElement()` not `tap()`
2. **Include JSDoc comments**: Document parameters and return values
3. **Add logging**: Help with debugging by logging actions
4. **Handle waits**: Wait for elements to be ready before acting
5. **Return values when appropriate**: Some methods return the element or text

Example of a well-structured helper method:

```typescript
/**
 * Swipes in a specified direction (mobile gesture)
 * @param direction - Direction to swipe ('up', 'down', 'left', 'right')
 * @param duration - Duration of swipe in milliseconds (default: 500)
 */
async swipe(direction: 'up' | 'down' | 'left' | 'right', duration: number = 500): Promise<void> {
    console.log(`👉 Swiping ${direction}...`);
    await this.screen.swipe({ direction, duration });
    console.log(`✅ Swiped ${direction}`);
}
```

## See Also

- [BasePage.ts](../pages/BasePage.ts) - Base class for all page objects
- [SGAlertPage.ts](../pages/SGAlertPage.ts) - Example page object using HelperMethods
