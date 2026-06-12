## 2024-05-24 - Accessible Visual Meters and Feedback
**Learning:** Custom CSS visual meters (like the `div`-based ones in `FamilyBudgetGame.astro`) are invisible to screen readers without ARIA attributes. Dynamically updated feedback texts are also ignored if not announced.
**Action:** Use `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"` on the meter element, and dynamically update `aria-valuenow` via JavaScript to match the visual state. Always add `aria-live="polite"` to dynamically updated text nodes that convey feedback.
