/**
 * UI Inspector Tool - Use this to explore your app's elements
 * 
 * Usage: node inspect-ui.js
 * 
 * This will connect to your running emulator and show all UI elements
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

async function inspectUI() {
  try {
    console.log('\n🔍 Inspecting UI on emulator...\n');
    
    // Get UI hierarchy using mobilecli
    const { stdout } = await execAsync(
      '.\\node_modules\\mobilecli\\bin\\mobilecli-windows-amd64.exe dump ui --device Pixel_6'
    );
    
    const result = JSON.parse(stdout);
    
    if (result.status === 'ok') {
      console.log('========== UI HIERARCHY ==========\n');
      console.log(JSON.stringify(result.data.elements, null, 2));
      console.log('\n========== END ==========\n');
      
      console.log('\n📝 How to write locators from this output:\n');
      console.log('Look for these properties in each element:');
      console.log('  • text: Use screen.getByText("exact text")');
      console.log('  • label: Use screen.getByLabel("label value")');
      console.log('  • resourceId: Use screen.getByTestId("resource-id")');
      console.log('  • type: Use screen.getByType("android.widget.Button")');
      console.log('  • className: Used automatically by role-based locators');
      console.log('\nExample:');
      console.log('  const button = screen.getByText("Next");');
      console.log('  await button.tap();\n');
    } else {
      console.error('❌ Failed to get UI:', result);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('  1. Your emulator is running');
    console.log('  2. mobilecli server is started');
    console.log('  3. Your app is open on the emulator\n');
  }
}

inspectUI();
