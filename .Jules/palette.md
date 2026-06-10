## 2024-06-25 - ARIA attributes for custom meters
**Learning:** Custom visual meters (divs) lack semantic meaning and won't be announced by screen readers when updated.
**Action:** Always add `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and update `aria-valuenow` dynamically. Also add `aria-live="polite"` to textual readouts that complement these meters.
