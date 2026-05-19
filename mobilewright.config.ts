import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests',
  timeout: 300000, // 5 minutes - increased for complex onboarding flow
  platform: 'android',
  deviceName: /Pixel 6/,
  bundleId: 'com.senecaglobal.sgalert.internal',
  installApps: 'android.apk\\SGalertApp.apk',
  autoStart: true,
  autoAppLaunch: false,
  mobilecliPath: './node_modules/mobilecli/bin/mobilecli-windows-amd64.exe',
  workers: 1, // Run tests serially
  retries: 0, // No retries for clearer debugging
});
