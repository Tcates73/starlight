## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-05-24 - Progress Bar Labeling
**Learning:** For custom visual meters (e.g., div-based progress bars), using `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` is not enough. They must also be paired with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.
**Action:** When creating or modifying custom progress bars, always ensure they have an `aria-labelledby` attribute linking them to a descriptive, visible element (like an `<h3>` heading).
