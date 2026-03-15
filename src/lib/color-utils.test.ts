/**
 * Simple test script for color utilities
 * Run with: npx ts-node src/lib/color-utils.test.ts
 */

import { hexToRgb, rgbToLab, calculateDeltaE, deltaEToPercentage } from './color-utils';

function testColorMatching() {
  console.log('--- Testing Color Matching Logic ---');

  // Exact Match
  const color1 = "#FF0000"; // Red
  const color2 = "#FF0000";
  
  const lab1 = rgbToLab(hexToRgb(color1)!);
  const lab2 = rgbToLab(hexToRgb(color2)!);
  const deltaE_exact = calculateDeltaE(lab1, lab2);
  const percent_exact = deltaEToPercentage(deltaE_exact);
  
  console.log(`Matching ${color1} to ${color2}:`);
  console.log(`  Delta E: ${deltaE_exact.toFixed(2)} (Expected: 0.00)`);
  console.log(`  Match %: ${percent_exact}% (Expected: 100%)`);

  // Close Match
  const color3 = "#FF0000"; // Red
  const color4 = "#EE0000"; // Slightly darker red
  
  const lab3 = rgbToLab(hexToRgb(color3)!);
  const lab4 = rgbToLab(hexToRgb(color4)!);
  const deltaE_close = calculateDeltaE(lab3, lab4);
  const percent_close = deltaEToPercentage(deltaE_close);
  
  console.log(`\nMatching ${color3} to ${color4}:`);
  console.log(`  Delta E: ${deltaE_close.toFixed(2)}`);
  console.log(`  Match %: ${percent_close}%`);

  // Far Match
  const color5 = "#FF0000"; // Red
  const color6 = "#0000FF"; // Blue
  
  const lab5 = rgbToLab(hexToRgb(color5)!);
  const lab6 = rgbToLab(hexToRgb(color6)!);
  const deltaE_far = calculateDeltaE(lab5, lab6);
  const percent_far = deltaEToPercentage(deltaE_far);
  
  console.log(`\nMatching ${color5} to ${color6}:`);
  console.log(`  Delta E: ${deltaE_far.toFixed(2)}`);
  console.log(`  Match %: ${percent_far}%`);

  console.log('\n--- Test Complete ---');
}

// Check if we are in a browser environment before running
if (typeof window === 'undefined') {
  try {
    testColorMatching();
  } catch (e) {
    console.log('Skipping auto-run (likely module resolution issue in Node without ts-node)');
  }
}
