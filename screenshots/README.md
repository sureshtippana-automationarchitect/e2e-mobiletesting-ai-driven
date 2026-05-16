# Screenshots Directory

This directory stores test execution screenshots organized by datetime-based folders.

## Folder Structure

```
screenshots/
├── 2026-05-16-14-30-25/          # YYYY-MM-DD-HH-MM-SS format (May 16, 2026, 14:30:25)
│   ├── Welcome-Screen-1715871025123.png
│   ├── After-Skip-Flow-1715871026456.png
│   └── Permission-Statuses-1715871027789.png
├── 2026-05-16-15-01-42/          # Another test run
│   └── ...
└── README.md            # This file
```

## How It Works

The `takeScreenshot()` method in `HelperMethods.ts` automatically:
1. Gets current datetime using `getFormattedTimestamp()` (format: YYYY-MM-DD-HH-MM-SS)
2. Creates `screenshots/{datetime}/` folder if it doesn't exist
3. Sanitizes the screenshot description for filename
4. Saves screenshot as: `{description}-{timestamp}.png`

## Example Usage

```typescript
// In your test
const helper = sgAlertPage.getHelperMethods();
await helper.takeScreenshot('Welcome Screen');

// Screenshot saved to: screenshots/2026-05-16-14-30-25/Welcome-Screen-1715871025123.png
```

## Features

- ✅ **Auto-folder creation**: Folders created automatically
- ✅ **Datetime organization**: Each test run gets its own folder
- ✅ **Unique filenames**: Timestamp prevents overwrites
- ✅ **Clean names**: Special characters removed from description
- ✅ **Git-ignored**: Screenshots not tracked in version control

## Cleanup

Screenshots are automatically ignored by `.gitignore` and won't be committed to Git.

To clean up old screenshots manually:
```bash
# Windows
rmdir /s /q screenshots

# Linux/Mac
rm -rf screenshots
```

## Notes

- Screenshots folder is created in the project root directory
- Format: `screenshots/{YYYY-MM-DD-HH-MM-SS}/{description}-{unixTimestamp}.png`
- Each test run session gets a unique datetime folder
- Old screenshots are kept until manually deleted
