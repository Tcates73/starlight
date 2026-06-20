## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-05-24 - Progress Bar Accessible Names
**Learning:** Custom visual meters using `role="progressbar"` need an accessible name to be properly announced by screen readers. If a visible label exists (like a heading), `aria-labelledby` should be used to link the progress bar to that label's ID.
**Action:** Always pair custom `role="progressbar"` elements with an `aria-label` or `aria-labelledby` attribute pointing to a descriptive text node.
