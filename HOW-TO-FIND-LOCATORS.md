# Quick Start: Finding Locators for Mobile Apps

## The Process (Similar to Web Testing)

### Web Testing (for comparison)
1. Open browser DevTools
2. Inspect element
3. Copy selector (CSS, XPath)
4. Write `page.locator()` code

### Mobile Testing (what you do now)
1. Run `npm test` (with viewTree()) OR run `node inspect-ui.js`
2. Look at the UI tree JSON output
3. Find element properties (text, label, type, identifier)
4. Write `screen.getBy...()` code

---

## Step-by-Step Example

### 1️⃣ Inspect Your Screen

**Option A: Add to your test:**
```typescript
const uiTree = await screen.viewTree();
console.log(JSON.stringify(uiTree, null, 2));
```

**Option B: Use the inspector tool:**
```bash
node inspect-ui.js
```

### 2️⃣ Look at the Output

You'll see something like:
```json
[
  {
    "type": "android.widget.TextView",
    "text": "Next >",
    "isVisible": true,
    "bounds": { "x": 900, "y": 2206, "width": 106, "height": 53 }
  },
  {
    "type": "android.widget.EditText",
    "label": "Email",
    "identifier": "com.app:id/email_input",
    "isVisible": true
  }
]
```

### 3️⃣ Write Your Locator

Based on the element properties:

| If you see... | Use this locator |
|--------------|------------------|
| `"text": "Next >"` | `screen.getByText('Next >')` |
| `"label": "Email"` | `screen.getByLabel('Email')` |
| `"identifier": "email_input"` | `screen.getByTestId('email_input')` |
| `"type": "Button"` | `screen.getByType('Button')` or `screen.getByRole('button')` |

### 4️⃣ Interact with It

```typescript
const nextButton = screen.getByText('Next >');
await nextButton.tap();

const emailField = screen.getByLabel('Email');
await emailField.fill('test@example.com');
```

---

## Most Common Locators (Ordered by Reliability)

### 1. Test ID (Most Stable) ⭐⭐⭐
```typescript
screen.getByTestId('login-button')
```
Requires `identifier` or `resourceId` in the UI tree.

### 2. Label (Good for Accessibility) ⭐⭐
```typescript
screen.getByLabel('Email')
screen.getByLabel('Password')
```
Requires `label` or `contentDescription` in the UI tree.

### 3. Text (Easy but can change) ⭐
```typescript
screen.getByText('Next >')
screen.getByText(/welcome/i)  // case-insensitive
```
Uses the visible `text` property.

### 4. Type (Generic)
```typescript
screen.getByType('android.widget.Button')
```
Finds any element of that type.

---

## Your Workflow

1. **Open your app** in the emulator
2. **Run** `node inspect-ui.js` OR add `screen.viewTree()` to your test
3. **Copy element properties** from the JSON output
4. **Write locators** in your test file
5. **Test your locators** by running the test

---

## Real Example from Your App

From the UI tree we just saw:

```typescript
// ✅ These will work:
const welcomeText = screen.getByText('Welcome to SG Alert');
const nextButton = screen.getByText('Next >');
const skipButton = screen.getByText('Skip');

// ❌ This won't work (no identifier in the UI tree):
const nextButton = screen.getByTestId('next-button'); // No test ID exists

// 💡 To make test IDs work, developers need to add them to the app code
```

---

## Tips

✅ **DO:**
- Use `screen.viewTree()` often to see what changed
- Prefer stable selectors (test IDs > labels > text)
- Use regex for flexible text matching: `/next/i`
- Take screenshots to verify each step

❌ **DON'T:**
- Rely only on text (it might change with translations)
- Use coordinates (they break on different screen sizes)
- Forget to wait for elements to load

---

## Tools at Your Disposal

| Tool | Purpose | Command |
|------|---------|---------|
| **inspect-ui.js** | View UI anytime | `node inspect-ui.js` |
| **screen.viewTree()** | View UI in test | Add to test code |
| **LOCATOR-GUIDE.md** | Full reference | Open the file |
| **sgalert-navigation.spec.ts** | Working examples | See test file |

---

## Next Steps

1. ✅ Run your test: `npm test`
2. ✅ See the UI tree output above
3. ✅ Try clicking "Next" button using the example test
4. ✅ Run: `npx mobilewright test tests/sgalert-navigation.spec.ts`
5. ✅ Modify and create your own tests!

---

Need help? Check [LOCATOR-GUIDE.md](./LOCATOR-GUIDE.md) for detailed examples!
