## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-06-26 - Custom Visual Meters Need Explicit Labeling
**Learning:** Custom div-based meters using role='progressbar' are read as completely generic without a label, making it impossible for screen readers to know what they measure.
**Action:** Always pair custom progressbars with an aria-labelledby attribute pointing to a visible heading/label ID to ensure proper screen reader context.
