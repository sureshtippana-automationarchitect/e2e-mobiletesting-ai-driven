# SG Alert Test Plan

## Test Coverage

### Test Suite 1: Complete Flow POM (`sgalert-complete-flow-pom.spec.ts`)
**1 comprehensive end-to-end test case using Page Object Model:**

**TC01: Complete App Onboarding Successfully** ✅

**Automated Flow (6 Steps):**

**Step 0: Fresh Installation**
- Uninstall existing app (if present)
- Install fresh APK from `android.apk\SGalertApp.apk`
- Ensures clean state for consistent testing

**Step 1: App Launch**
- Launch app: `com.senecaglobal.sgalert.internal`
- Wait 8000ms for app initialization
- Handle foreground verification warnings

**Step 2: Welcome Screens Navigation**
- Screen 1: Tap "Next >" button → Wait 1000ms
- Screen 2: Tap "Next >" button → Wait 1000ms  
- Screen 3: Tap "Done" button → Wait 1000ms
- Total: 3 screens navigated

**Step 3: Optional Continue Button**
- Check if "Why permissions" screen appears
- If present: Tap "Continue" button → Wait 2000ms
- If absent: Skip directly to permissions → Wait 1000ms
- Uses try-catch for graceful handling

**Step 4: Push Notification Permission**
- Click "Push Notification Access" item → Wait 1500ms
- System dialog appears: "Allow SGAlert to send you notifications?"
- Click "Allow" button on system dialog → Wait 1500ms
- Permission status changes to "Approved"

**Step 5: Terms of Use Acceptance**
- Locate Terms checkbox at coordinates (127, 1972)
- Tap using coordinate-based interaction
- Wait 1500ms for checkbox state change
- Coordinate method more reliable than element locator

**Step 6: Get Started Button**
- Primary: Try text locator "Get Started" (timeout: 5000ms)
- Fallback: Tap coordinates (216, 2640) if text fails
- Wait 5000ms for main app screen to load
- Dual-strategy ensures reliability

**Expected Result:**
- All steps execute without errors
- Console shows: "🎉 ONBOARDING COMPLETED SUCCESSFULLY"
- App reaches main screen
- Screenshot captured on any failure

**Key Technical Aspects:**
- Uses centralized locators from `sgAlertPageElements()` getter
- Implements coordinate-based tapping for problematic elements
- Handles system permission dialogs separately from app dialogs
- Gracefully handles optional screens with try-catch
- Fresh app installation ensures consistent test state
- Detailed logging with emojis for each step

### Test Suite 2: Complete Flow Traditional (`sgalert-complete-flow.spec.ts`)
**1 comprehensive test case using traditional inline approach:**

**TC01: Complete App Onboarding Successfully** ✅
- Same 6-step flow as POM version
- All locators defined inline in test
- No page object abstraction
- Useful for comparing approaches
- Direct `screen.getByText()` calls

---

## Running Tests

### Run All Tests
```bash
npm run test:all
```

### Run Specific Test Suite
```bash
# POM approach - Complete onboarding
npm run test:pom

# Traditional approach - Complete onboarding
npm run test:complete
```

### Run Single Test
```bash
# Run POM test
npx mobilewright test tests/sgalert-complete-flow-pom.spec.ts

# Run traditional test
npx mobilewright test tests/sgalert-complete-flow.spec.ts --grep "Complete app onboarding"
```

### Inspect UI Anytime
```bash
npm run inspect-ui
```

### Prerequisites for Tests
- **Internet Connection Required**: App needs internet to load onboarding screens
- **Android Device/Emulator**: Must be running and connected
- **Device Name**: Must match pattern in `mobilewright.config.ts` (default: /Pixel 6/)
- **APK Location**: `android.apk\SGalertApp.apk` must exist

---

## Test Flow Diagram

```
┌─────────────────┐
│  App Launch     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Welcome Screen  │
│ - Heading       │
│ - Description   │
│ - Next button   │
│ - Skip button   │
└────────┬────────┘
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
  Next       Skip
    │          │
    └────┬─────┘
         │
         ▼
┌─────────────────┐
│ Permissions     │ ◄─── Test: sgalert-complete-flow-pom.spec.ts
│ Screen          │
│ - Push Notif ✅ │
│ - Location ✅   │
│ - Do Not Dist ❌│
│ - Terms □       │
│ - Get Started   │
└────────┬────────┘
         │
         ▼
   Tap "Get Started"
         │
         ▼
┌─────────────────┐
│   Main App      │
│   Screen        │
└─────────────────┘
```

---

## Test Data

### App Details
- **Package**: `com.senecaglobal.sgalert.internal`
- **Platform**: Android
- **Device**: Pixel 6 Emulator (emulator-5554)

### Test Scenarios Covered

| Scenario | Status | Test File |
|----------|--------|-----------|
| Launch app | ✅ | Both tests |
| Navigate with Next (3 screens) | ✅ | sgalert-complete-flow-pom.spec.ts |
| Handle Continue button (optional) | ✅ | sgalert-complete-flow-pom.spec.ts |
| Push notification permission | ✅ | sgalert-complete-flow-pom.spec.ts |
| Verify permissions | ✅ | sgalert-complete-flow-pom.spec.ts |
| Accept terms (coordinates) | ✅ | sgalert-complete-flow-pom.spec.ts |
| Click Get Started (with fallback) | ✅ | sgalert-complete-flow-pom.spec.ts |

---

## Key Locators Used

### Welcome Screen
- `screen.getByText('Welcome to SG Alert')` - Heading
- `screen.getByText('Next >')` - Next button
- `screen.getByText('Skip')` - Skip button

### Permissions Screen
- `screen.getByText('App Permissions')` - Heading
- `screen.getByText(/Push Notification Access/i)` - Permission 1
- `screen.getByText(/Location Access/i)` - Permission 2
- `screen.getByText(/Do Not Disturb/i)` - Permission 3
- `screen.getByText(/Permission approved/i)` - Status indicator
- `screen.getByText(/Permission denied/i)` - Denied status
- `screen.getByText('Go to Settings')` - Settings button
- `screen.getByText(/I agree to the Terms of Use/i)` - Checkbox
- `screen.getByText('Get Started')` - CTA button

---

## Expected Results

All tests should:
- ✅ Launch app successfully
- ✅ Find all UI elements
- ✅ Navigate between screens
- ✅ Capture screenshots at each step
- ⚠️  Show timeout error during cleanup (known Windows issue - IGNORE)

**The cleanup timeout does NOT affect test validity!**

---

## Next Steps

If you recorded more steps in the video, please describe them and I'll add tests for:
- Main app functionality
- Alert viewing
- SOS button
- Settings
- Any other features

---

## Troubleshooting

### Test fails to find element
1. Run `npm run inspect-ui` to see current UI
2. Check if element text changed
3. Update locator in test file

### App doesn't launch
1. Check emulator is running
2. Run `adb devices` to verify
3. Restart mobilecli server: `.\node_modules\mobilecli\bin\mobilecli-windows-amd64.exe server start`

### Need to add more tests
1. Open app to the screen you want to test
2. Run `npm run inspect-ui` to see elements
3. Copy locators to your test file
4. Follow examples in `sgalert-complete-flow.spec.ts`
