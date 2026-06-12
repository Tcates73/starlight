import { readFileSync } from 'fs';
const content = readFileSync('src/components/FamilyBudgetGame.astro', 'utf-8');
const checks = [
  'role="progressbar"',
  'aria-valuemin="0"',
  'aria-valuemax="100"',
  'aria-valuenow',
  'aria-live="polite"'
];
let passed = true;
checks.forEach(check => {
  if (!content.includes(check)) {
    console.error(`Missing: ${check}`);
    passed = false;
  }
});
if (passed) {
  console.log("All ARIA checks passed!");
  process.exit(0);
} else {
  process.exit(1);
}
