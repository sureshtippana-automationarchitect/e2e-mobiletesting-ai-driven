# SG Alert Test Plan

## Test Coverage

### Test Suite 1: Welcome Screen (`sgalert.spec.ts`)
- ✅ Basic app launch
- ✅ UI inspection and element discovery
- ✅ Screenshot capture

### Test Suite 2: Navigation (`sgalert-navigation.spec.ts`) 
- ✅ Navigate through onboarding with Next button
- ✅ Skip onboarding with Skip button
- ✅ Different locator methods

### Test Suite 3: Complete Flow (`sgalert-complete-flow.spec.ts`)
**7 comprehensive test cases:**

1. **Complete Onboarding Flow** ✅
   - Launch app
   - View welcome screen
   - Click Next
   - Verify permissions screen
   - Accept terms
   - Click Get Started
   - Reach main app

2. **Skip Welcome Screen** ✅
   - Launch app
   - Click Skip button
   - Verify lands on permissions screen

3. **Permission Status Verification** ✅
   - Check Push Notification: Approved
   - Check Location Access: Approved
   - Check Do Not Disturb: Denied
   - Verify "Go to Settings" button

4. **Terms Checkbox Interaction** ✅
   - Verify Terms of Use text
   - Verify Privacy Policy link
   - Tap checkbox

5. **Get Started Button** ✅
   - Verify button is visible
   - Verify button is enabled
   - Capture screenshot

6. **Back Navigation** ✅
   - Navigate forward to permissions
   - Press back button
   - Verify returns to welcome

7. **UI Elements Verification** ✅
   - Verify all screen elements exist
   - Check headings, text, buttons
   - Dump UI tree

---

## Running Tests

### Run All Tests
```bash
npm run test:all
```

### Run Specific Test Suite
```bash
# Welcome screen tests only
npm run test:welcome

# Navigation tests only  
npm run test:navigation

# Complete flow (all 7 tests)
npm run test:complete
```

### Run Single Test
```bash
npx mobilewright test tests/sgalert-complete-flow.spec.ts --grep "Complete app onboarding"
```

### Inspect UI Anytime
```bash
npm run inspect-ui
```

---

## Test Flow Diagram

```
┌─────────────────┐
│  App Launch     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Welcome Screen  │ ◄─── Test: sgalert.spec.ts
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
│ Permissions     │ ◄─── Test: sgalert-complete-flow.spec.ts
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
| Launch app | ✅ | All |
| View welcome screen | ✅ | sgalert.spec.ts |
| Navigate with Next | ✅ | sgalert-navigation.spec.ts |
| Navigate with Skip | ✅ | sgalert-complete-flow.spec.ts |
| Verify permissions | ✅ | sgalert-complete-flow.spec.ts |
| Accept terms | ✅ | sgalert-complete-flow.spec.ts |
| Click Get Started | ✅ | sgalert-complete-flow.spec.ts |
| Back navigation | ✅ | sgalert-complete-flow.spec.ts |
| UI element verification | ✅ | sgalert-complete-flow.spec.ts |

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
