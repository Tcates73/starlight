## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2026-07-02 - Progress Bar Accessibility
**Learning:** Custom div-based progress bars require explicit labelling. While `role="progressbar"` identifies the element, without an accessible name, screen reader users miss the context (e.g., what the meter represents like "Budget Health" vs "Stress Meter").
**Action:** Always pair custom `role="progressbar"` elements with an `aria-labelledby` attribute pointing to a visible heading/label ID to ensure proper screen reader context.
