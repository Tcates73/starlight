## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2026-06-28 - Adding accessibility context to custom progress bars
**Learning:** When creating custom visual meters (e.g., div-based progress bars) using `role="progressbar"`, they need a label for screen readers to understand what the progress bar represents. Without an accessible name, the screen reader simply announces it as a progress bar without context.
**Action:** Always pair custom progress bars with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.
