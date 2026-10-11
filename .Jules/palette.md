## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-10-11 - Progressbar Accessible Names
**Learning:** Custom div-based progress bars (like the Budget Health and Stress Meter components) lack screen reader context if they only have a role and values without an accessible name.
**Action:** Always use `aria-labelledby` to link custom `role="progressbar"` elements to their visible heading IDs to ensure proper screen reader context.
