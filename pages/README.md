# Page Object Model (POM) - Documentation

## 📚 Overview

This project implements the **Page Object Model (POM)** design pattern for mobile test automation following industry best practices. The POM pattern provides:

- **Better maintainability**: Changes to UI only require updates in one place
- **Code reusability**: Helper methods can be used across multiple tests
- **Improved readability**: Test cases are clean and express intent clearly
- **Separation of concerns**: Test logic is separate from page interaction logic
- **Scalability**: Easy to add new pages and test scenarios

## 🏗️ Architecture

```
├── helpers/
│   ├── HelperMethods.ts      # Reusable utility methods for interactions
│   ├── index.ts              # Helper exports
│   └── README.md             # Helper documentation
│
├── pages/
│   ├── BasePage.ts           # Base class that initializes HelperMethods
│   ├── SGAlertPage.ts        # SGAlert-specific page class
│   ├── index.ts              # Central export point
│   └── README.md             # This file
│
└── tests/
    ├── sgalert-complete-flow.spec.ts      # Traditional approach
    └── sgalert-complete-flow-pom.spec.ts  # POM approach
```

## 🎯 Design Pattern

### Three-Layer Architecture

#### 1. **HelperMethods Layer** (`helpers/HelperMethods.ts`)
Contains low-level reusable utility methods:
- Element interactions (tap, fill, type)
- Waiting strategies (visible, hidden)
- Validations (text, value, visibility)
- Mobile gestures (swipe, scroll, long press)
- App lifecycle (launch, terminate, restart)

#### 2. **BasePage Layer** (`pages/BasePage.ts`)
- Initializes `HelperMethods` instance
- Provides access to screen and device instances
- Serves as foundation for all page classes

#### 3. **Page Object Layer** (`pages/SGAlertPage.ts`)
- Contains page-specific elements (getter pattern)
- Implements page-specific actions using helper methods
- Provides high-level business logic methods

### Pattern Example

```typescript
// Page Object
export class SGAlertPage extends BasePage {
  // Element getter - always fresh, never stale
  public get sgAlertPageElements() {
    return {
      welcomeHeading: this.helper.getElementByText('Welcome to SG Alert'),
      nextButton: this.helper.getElementByText('Next >'),
      skipButton: this.helper.getElementByText('Skip'),
    };
  }

  // Page-specific action using helper
  async clickNextOnWelcome(): Promise<void> {
    console.log("👋 Step: Clicking Next on Welcome Screen...");
    await this.helper.tapElement(this.sgAlertPageElements.nextButton, '✓ Clicked Next button');
    await this.helper.wait(5000);
    console.log("✅ Navigated past welcome screen\n");
  }
}
```

## 🔧 BasePage - Foundation Class

The `BasePage` class provides the foundation for all page objects:

### Key Features

- **Automatic Helper Initialization**: Every page gets a `HelperMethods` instance
- **Screen/Device Access**: Protected access to screen and device instances
- **Helper Access**: `getHelperMethods()` method for advanced operations

### Usage in Page Classes

```typescript
export class MyPage extends BasePage {
  constructor(screen: any, device: any) {
    super(screen, device);
    // this.helper is now available
  }
}
```

## 📱 SGAlertPage - Page Object Class

The `SGAlertPage` class extends `BasePage` and contains page-specific elements and methods.

### 1. Element Getter Pattern

All locators are defined using a **public getter** that returns fresh locators:

```typescript
public get sgAlertPageElements() {
  return {
    welcomeHeading: this.helper.getElementByText('Welcome to SG Alert'),
    nextButton: this.helper.getElementByText('Next >'),
    skipButton: this.helper.getElementByText('Skip'),
    // ... more elements
  };
}
```

**Benefits:**
- **Always Fresh**: Locators are never stale
- **Type-Safe**: TypeScript autocomplete support
- **Easy Access**: `this.sgAlertPageElements.nextButton`

### 2. Page Methods

Page methods use `this.helper` to interact with elements:

#### App Lifecycle Methods
- `launchAppFresh()` - Launch app with fresh start
- `restartSGAlertApp()` - Restart the app

#### Welcome Screen Methods
- `verifyWelcomeScreen()` - Verify welcome screen is displayed
- `clickNextOnWelcome()` - Click Next button
- `clickSkipOnWelcome()` - Click Skip button

#### Why Permissions Screen Methods
- `verifyWhyPermissionsScreen()` - Verify screen is displayed
- `clickContinueOnWhyPermissions()` - Click Continue button

#### Permissions Screen Methods
- `verifyPermissionsScreen()` - Verify screen is displayed
- `verifyAllPermissions()` - Verify all permissions are listed
- `verifyPermissionStatuses()` - Verify permission statuses

#### Terms & Conditions Methods
- `acceptTermsOfUse()` - Accept terms checkbox
- `verifyTermsCheckbox()` - Verify checkbox is visible
- `tapTermsCheckbox()` - Tap the checkbox

#### Get Started Methods
- `clickGetStarted()` - Click Get Started button
- `verifyGetStartedButton()` - Verify button is visible

#### Complete Flow Methods
- `completeOnboardingFlow()` - Complete full onboarding (happy path)
- `completeOnboardingWithSkip()` - Complete onboarding using Skip
- `navigateToPermissionsScreen()` - Navigate to permissions screen

### 3. Method Implementation Example

```typescript
async clickNextOnWelcome(): Promise<void> {
  console.log("👋 Step: Clicking Next on Welcome Screen...");
  // Use helper method for interaction
  await this.helper.tapElement(
    this.sgAlertPageElements.nextButton, 
    '✓ Clicked Next button'
  );
  await this.helper.wait(5000);
  console.log("✅ Navigated past welcome screen\n");
}
```


## 🧪 Writing Tests with POM

### Traditional Approach (Old)

```typescript
test('Complete onboarding', async ({ device, screen }) => {
  // Launch app
  await device.terminateApp('com.senecaglobal.sgalert.internal');
  await device.launchApp('com.senecaglobal.sgalert.internal');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Click Next
  const nextButton = screen.getByText('Next >');
  await nextButton.tap();
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // ... more code ...
});
```

### POM Approach (New)

```typescript
test('POM: Complete onboarding', async ({ device, screen }) => {
  // Initialize Page Object
  const sgAlertPage = new SGAlertPage(screen, device);
  
  // Execute flow using page methods
  await sgAlertPage.completeOnboardingFlow();
});
```

## ✅ Benefits of POM Approach

1. **Single Responsibility**: Each method does one thing
2. **DRY Principle**: Don't Repeat Yourself - reuse methods
3. **Easy Maintenance**: Update locators in one place
4. **Better Logging**: Built-in logging in helper methods
5. **Type Safety**: TypeScript ensures type checking
6. **Scalability**: Easy to add new pages and methods

## 🚀 Running Tests

### Run Traditional Tests
```bash
npx mobilewright test tests/sgalert-complete-flow.spec.ts
```

### Run POM Tests
```bash
npx mobilewright test tests/sgalert-complete-flow-pom.spec.ts
```

### Run Specific POM Test
```bash
npx mobilewright test tests/sgalert-complete-flow-pom.spec.ts -g "Complete app onboarding"
```

## 📝 Best Practices

1. **Keep locators centralized** - All locators in the page class
2. **Use descriptive method names** - Methods should clearly state what they do
3. **Add logging** - Helper methods include console logs for debugging
4. **Use helper methods** - Always use helper methods, not direct element interactions
5. **Create page methods for flows** - Combine helper methods into logical flows
6. **One assertion per test** - Keep tests focused and clear
7. **Use meaningful test names** - Prefix with "POM:" to identify POM tests

## 🔄 Extending the Framework

### Adding a New Page

1. Create a new page class extending `BasePage`
2. Define locators
3. Create page methods
4. Export from `pages/index.ts`

Example:

```typescript
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly locators = {
    emailField: 'Email',
    passwordField: 'Password',
    loginButton: 'Login',
  };

  async login(email: string, password: string) {
    const emailField = this.getElementByText(this.locators.emailField);
    await this.type(emailField, email, 'Email');
    
    const passwordField = this.getElementByText(this.locators.passwordField);
    await this.type(passwordField, password, 'Password');
    
    const loginButton = this.getElementByText(this.locators.loginButton);
    await this.tap(loginButton, 'Login button');
  }
}
```

### Adding New Helper Methods

Add new helper methods to `BasePage.ts`:

```typescript
async doubleTap(element: any, description: string = 'element') {
  console.log(`   👆👆 Double tapping on ${description}...`);
  await element.tap();
  await element.tap();
  console.log(`   ✅ Double tapped on ${description}`);
}
```

## 📊 Comparison

| Aspect | Traditional | POM |
|--------|-------------|-----|
| Test Length | ~100 lines | ~10 lines |
| Maintainability | Low | High |
| Reusability | Low | High |
| Readability | Medium | High |
| Learning Curve | Low | Medium |

## 🎯 Conclusion

The POM approach makes your tests:
- **Cleaner** - Less code in tests
- **More maintainable** - Changes in one place
- **More reusable** - Methods used across tests
- **More readable** - Tests express intent clearly
- **More scalable** - Easy to add new pages and methods

---

*Happy Testing! 🚀*
