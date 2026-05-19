# Mobile App Locator Guide

## How to Find and Write Locators for Your Mobile App

Unlike web testing where you use browser DevTools, mobile testing uses the **UI hierarchy** or **accessibility tree**.

---

## 🎯 Our Implementation: Centralized Locator Pattern

This project uses a **centralized locator pattern** with all locators defined in a getter method:

### Example from SGAlertPage.ts

```typescript
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
    
    // System Dialog
    allowButton: this.screen.getByText('Allow'),

    // Terms and Conditions
    termsCheckbox: this.screen.getByText(/I agree to the Terms of Use/i),
    privacyPolicyLink: this.screen.getByText(/Privacy Policy/i),
    getStartedButton: this.screen.getByText('Get Started'),
  };
}
```

### Benefits of Getter Pattern

✅ **Fresh Locators**: Elements are resolved each time, preventing stale references  
✅ **Single Source of Truth**: All locators in one place for easy maintenance  
✅ **Easy Updates**: Change text once, updates everywhere  
✅ **Type Safety**: TypeScript autocomplete for all elements  
✅ **Organized by Screen**: Clear structure matching app flow  

### Usage in Methods

```typescript
async navigateWelcomeScreens(): Promise<void> {
  // Get fresh locator from getter
  const nextButton = this.sgAlertPageElements.nextButton;
  await nextButton.tap();
  
  // Use directly
  await this.sgAlertPageElements.doneButton.tap();
}
```

---

## 🎯 Coordinate-Based Interactions

For elements that are difficult to locate reliably, we use coordinate-based tapping:

### When to Use Coordinates

- ✅ Checkboxes that don't respond to element taps
- ✅ Custom UI elements without proper accessibility
- ✅ Fallback when text locators fail
- ❌ Avoid for dynamic layouts (coordinates change)
- ❌ Not for different screen sizes/densities

### Implementation Examples

```typescript
// Terms checkbox - More reliable than element locator
async tapTermsCheckboxByCoordinates(): Promise<void> {
  await this.screen.tap(127, 1972);
  await this.helper.wait(1500);
}

// Get Started with fallback strategy
async clickGetStartedWithFallback(): Promise<void> {
  try {
    // Primary: Try text locator
    const getStartedButton = this.sgAlertPageElements.getStartedButton;
    await getStartedButton.tap({ timeout: 5000 });
  } catch (error) {
    // Fallback: Use coordinates
    await this.screen.tap(216, 2640);
  }
}
```

### Finding Coordinates

1. Enable "Pointer Location" in Developer Options
2. Tap the element you want to interact with
3. Note the X and Y coordinates shown on screen
4. Use those coordinates in your test

---

## 🎯 System Dialog Handling

Android system dialogs (like permission requests) require separate handling:

```typescript
// 1. Click the in-app permission item
const pushNotificationAccess = this.sgAlertPageElements.pushNotificationText;
await pushNotificationAccess.tap({ timeout: 8000 });

// 2. Handle the system dialog that appears
const allowButton = this.sgAlertPageElements.allowButton;
await allowButton.tap({ timeout: 8000 });
```

**Key Points:**
- System dialogs have their own UI hierarchy
- Require separate locators (not nested in app structure)
- Often need longer timeouts for animation
- "Allow", "Deny", "Don't Allow" are common system buttons

---

## Method 1: Inspect UI During Tests

Add this to your test to see all elements:

```typescript
const uiTree = await screen.viewTree();
console.log(JSON.stringify(uiTree, null, 2));
```

## Method 2: Use the Inspector Script

Run this anytime your app is open:

```bash
node inspect-ui.js
```

---

## Available Locator Methods

### 1. By Text Content
Find elements by their visible text:

```typescript
// Exact match
const element = screen.getByText('Welcome to SG Alert');

// Case-insensitive regex
const element = screen.getByText(/welcome to sg alert/i);

// Partial match
const element = screen.getByText('Welcome', { exact: false });

await element.tap();
```

### 2. By Label (Accessibility Label)
Best for accessibility-enabled apps:

```typescript
const element = screen.getByLabel('Email');
await element.fill('test@example.com');
```

### 3. By Test ID (Resource ID)
Most reliable - requires devs to add test IDs:

```typescript
const element = screen.getByTestId('login-button');
await element.tap();
```

### 4. By Role (Semantic)
Finds elements by their type:

```typescript
const button = screen.getByRole('button', { name: 'Sign In' });
await button.tap();
```

### 5. By Type (Android/iOS Element Type)
Direct element type matching:

```typescript
// Android
const element = screen.getByType('android.widget.Button');

// iOS
const element = screen.getByType('XCUIElementTypeButton');

await element.tap();
```

### 6. By Placeholder
For input fields with placeholder text:

```typescript
const searchField = screen.getByPlaceholder('Search...');
await searchField.fill('test query');
```

---

## Common Patterns

### Chain Locators (Narrow Down Search)
Find an element within another element:

```typescript
const row = screen.getByType('android.widget.LinearLayout');
const button = row.getByText('Delete');
await button.tap();
```

### Wait for Element
Elements auto-wait, but you can be explicit:

```typescript
const element = screen.getByText('Loading...');
await element.waitFor({ state: 'hidden' }); // Wait for it to disappear

const content = screen.getByText('Content Loaded');
await element.waitFor({ state: 'visible' }); // Wait for it to appear
```

### Check Element State
Query element properties:

```typescript
const checkbox = screen.getByRole('checkbox');

if (await checkbox.isVisible()) {
  console.log('Checkbox is visible');
}

if (await checkbox.isEnabled()) {
  await checkbox.tap();
}

if (await checkbox.isChecked()) {
  console.log('Checkbox is checked');
}
```

### Get Element Text
Extract text from elements:

```typescript
const heading = screen.getByType('android.widget.TextView');
const text = await heading.getText();
console.log('Heading says:', text);
```

---

## Actions on Elements

```typescript
const element = screen.getByText('Click Me');

// Tap/Click
await element.tap();

// Double tap
await element.doubleTap();

// Long press
await element.longPress({ duration: 2000 });

// Fill text (for input fields)
await element.fill('Hello World');

// Swipe on element
await element.swipe({ direction: 'left' });

// Scroll element into view
await element.scrollIntoViewIfNeeded();
```

---

## Screen-Level Actions

```typescript
// Swipe anywhere on screen
await screen.swipe('up');
await screen.swipe('down', { distance: 500, duration: 300 });

// Tap at coordinates
await screen.tap(100, 200);

// Press hardware buttons
await screen.pressButton('HOME');
await screen.pressButton('BACK');
await screen.goBack(); // Shortcut for back button
```

---

## Example: Login Flow

```typescript
test('Login to app', async ({ device, screen }) => {
  // Launch app
  await device.launchApp('com.senecaglobal.sgalert.internal');
  
  // Wait for load
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Enter email
  const emailField = screen.getByLabel('Email');
  await emailField.tap();
  await emailField.fill('user@example.com');
  
  // Enter password
  const passwordField = screen.getByLabel('Password');
  await passwordField.tap();
  await passwordField.fill('password123');
  
  // Tap login button
  const loginButton = screen.getByRole('button', { name: 'Sign In' });
  await loginButton.tap();
  
  // Verify success
  const welcomeMessage = screen.getByText(/welcome/i);
  await expect(welcomeMessage).toBeVisible();
  
  // Take screenshot
  await screen.screenshot();
});
```

---

## Tips

1. **Prefer stable locators**: `getByTestId` > `getByLabel` > `getByText` > `getByType`
2. **Use regex for flexible matching**: `/welcome/i` matches any case
3. **Inspect first**: Always dump the UI tree to see what's available
4. **Auto-waiting**: All actions wait for elements to be ready
5. **Assertions retry**: `expect().toBeVisible()` polls until timeout

---

## Debugging

If an element isn't found:

```typescript
// 1. Dump UI to see what's actually there
const uiTree = await screen.viewTree();
console.log(JSON.stringify(uiTree, null, 2));

// 2. Try different locators
try {
  const el1 = screen.getByText('Exact Text');
  await el1.tap();
} catch (e) {
  const el2 = screen.getByText(/partial/i);
  await el2.tap();
}

// 3. Add more wait time
await new Promise(r => setTimeout(r, 5000));

// 4. Check if element is actually visible
const isVisible = await element.isVisible();
console.log('Element visible:', isVisible);
```
