## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-07-04 - Screen Reader Support for Custom Progress Bars
**Learning:** Custom progress bars (using ) lack context for screen readers if they are not explicitly labelled, leading to a confusing experience where users hear percentages without knowing what they represent.
**Action:** Always pair custom visual meters with an `aria-labelledby` attribute pointing to a visible heading/label ID to ensure proper screen reader context.
