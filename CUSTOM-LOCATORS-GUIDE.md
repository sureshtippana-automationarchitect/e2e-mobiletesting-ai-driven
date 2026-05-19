# Custom Locators Guide for MobileWright

## 🎯 Our Framework's Locator Strategy

This project uses a **Centralized Locator Pattern** with all locators defined in `SGAlertPage.ts`:

```typescript
public get sgAlertPageElements() {
  return {
    // Text-based locators
    welcomeHeading: this.screen.getByText('Welcome to SG Alert'),
    nextButton: this.screen.getByText('Next >'),
    
    // Regex patterns for flexibility
    pushNotificationText: this.screen.getByText(/Push Notification Access/i),
    termsCheckbox: this.screen.getByText(/I agree to the Terms of Use/i),
    
    // System dialog elements
    allowButton: this.screen.getByText('Allow'),
  };
}
```

### Key Advantages:
✅ **Single source of truth** - Change once, updates everywhere  
✅ **Fresh locators** - Getter pattern prevents stale elements  
✅ **Organized by screen** - Clear structure  
✅ **Type-safe** - Full TypeScript support  

---

## 🎯 Coordinate-Based Tapping

For elements that don't respond to standard locators, we use coordinate-based interactions:

```typescript
// Terms checkbox - More reliable than element locator
async tapTermsCheckboxByCoordinates(): Promise<void> {
  await this.screen.tap(127, 1972);  // X, Y coordinates
  await this.helper.wait(1500);
}

// Get Started with fallback strategy
async clickGetStartedWithFallback(): Promise<void> {
  try {
    // Try text locator first
    const getStartedButton = this.sgAlertPageElements.getStartedButton;
    await getStartedButton.tap({ timeout: 5000 });
  } catch (error) {
    // Fallback to coordinates
    await this.screen.tap(216, 2640);
  }
}
```

### When to Use Coordinates:
✅ Checkboxes not responding to taps  
✅ Custom UI elements without accessibility  
✅ Fallback when text locators fail  
❌ Avoid for responsive layouts  
❌ Not for different screen densities  

---

## Inspecting UI Elements

### Step 1: View All Elements
```typescript
const uiElements = await screen.viewTree();
console.log(JSON.stringify(uiElements, null, 2));
```

### Step 2: Find Specific Element Attributes
Each element in the UI tree contains:
- `type` - Android widget type (e.g., `android.widget.TextView`)
- `text` - Visible text content
- `identifier` - Resource ID (e.g., `com.app:id/checkbox`)
- `bounds` - Position and size `{x, y, width, height}`
- `isVisible` - Visibility state
- `isEnabled` - Enabled state
- `label` - Content description/accessibility label

## Custom Locator Strategies

### 1. **Text-based Locators** (Current approach)
```typescript
// Exact text match
const element = screen.getByText('Push Notification Access');

// Regex pattern matching
const element = screen.getByText(/Push Notification/i);
```

### 2. **Resource ID Locators** (Most reliable)
```typescript
// If element has identifier like "com.senecaglobal.sgalert:id/notification_checkbox"
const element = screen.locator('android=new UiSelector().resourceId("com.senecaglobal.sgalert:id/notification_checkbox")');
```

### 3. **Content Description Locators**
```typescript
// If element has content-desc/label attribute
const element = screen.locator('android=new UiSelector().description("Push Notification Checkbox")');
```

### 4. **Combined Locators** (Multiple attributes)
```typescript
// Find by type AND text
const element = screen.locator('android=new UiSelector().className("android.widget.CheckBox").textContains("Push Notification")');

// Find by bounds/position
const element = screen.locator('android=new UiSelector().className("android.widget.TextView").instance(0)');
```

### 5. **XPath Locators**
```typescript
// XPath for complex queries
const element = screen.locator('//android.widget.CheckBox[@text="Push Notification Access"]');

// XPath with contains
const element = screen.locator('//android.widget.TextView[contains(@text, "Push Notification")]');
```

### 6. **Index-based Locators** (When multiple similar elements exist)
```typescript
// Get nth element matching criteria
const element = screen.locator('android=new UiSelector().className("android.widget.CheckBox").instance(0)'); // First checkbox
```

## Example: Custom Locator for Push Notification Checkbox

### After Inspection:
```json
{
  "type": "android.widget.CheckBox",
  "text": "Push Notification Access",
  "identifier": "com.senecaglobal.sgalert:id/permission_checkbox_notification",
  "bounds": { "x": 50, "y": 200, "width": 48, "height": 48 }
}
```

### Using Custom Locator:
```typescript
// Option 1: By Resource ID (Best - most stable)
const pushCheckbox = screen.locator(
  'android=new UiSelector().resourceId("com.senecaglobal.sgalert:id/permission_checkbox_notification")'
);
await pushCheckbox.tap();

// Option 2: By Type and Text
const pushCheckbox = screen.locator(
  'android=new UiSelector().className("android.widget.CheckBox").textContains("Push Notification")'
);
await pushCheckbox.tap();

// Option 3: XPath
const pushCheckbox = screen.locator(
  '//android.widget.CheckBox[contains(@text, "Push Notification")]'
);
await pushCheckbox.tap();
```

## Advantages of Custom Locators

1. **More Precise** - Target exact element even if multiple have similar text
2. **More Stable** - Resource IDs don't change with UI updates
3. **Faster** - Direct element lookup vs text scanning
4. **Better for Complex UI** - Handle overlapping elements, scrollable lists

## Best Practices

1. **Prefer Resource IDs** - Most reliable, set by developers
2. **Use Content Description** - For accessibility-enabled elements
3. **Avoid XPath with absolute paths** - Fragile if UI structure changes
4. **Combine multiple attributes** - For unique identification
5. **Use index as last resort** - Can break if element order changes

## Implementation in Your Test

```typescript
// Step 1: Inspect to find attributes
const elements = await screen.viewTree();
const pushElement = elements.find(el => el.text?.includes('Push Notification'));
console.log('Push Notification element:', pushElement);

// Step 2: Use the found identifier/attributes
if (pushElement.identifier) {
  const checkbox = screen.locator(
    `android=new UiSelector().resourceId("${pushElement.identifier}")`
  );
  await checkbox.tap();
}
```
