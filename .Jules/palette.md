## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2025-06-29 - [Progress Bar Accessibility]
**Learning:** Custom div-based progress bars need aria-labelledby pointing to a visible label to ensure proper screen reader context.
**Action:** Always pair role=progressbar with an aria-labelledby attribute.
