## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-05-15 - Missing Accessible Labels on Custom Progress Bars
**Learning:** Custom div-based progress bars (`role="progressbar"`) in this app's dashboard lack explicit associations with their visible headings, leading to missing context for screen reader users.
**Action:** Always pair custom meters with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.
