import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests',
  timeout: 120000, // 2 minutes - increased for Windows mobilecli cleanup
  platform: 'android',
  deviceName: /Pixel 6/,
  bundleId: 'com.senecaglobal.sgalert.internal',
  installApps: './apk/android.apk/sgAlert_Android.apk',
  autoStart: true,
  autoAppLaunch: false,
  mobilecliPath: './node_modules/mobilecli/bin/mobilecli-windows-amd64.exe',
  workers: 1, // Run tests serially
  retries: 0, // No retries for clearer debugging
});
