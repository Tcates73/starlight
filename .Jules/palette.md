## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.

## 2024-05-23 - Link custom progressbars to headings
**Learning:** Custom div-based progress meters (`role="progressbar"`) require an accessible name so screen reader users understand what the meter represents. Without an explicit label or linkage, the meter's purpose is ambiguous.
**Action:** Always pair `role="progressbar"` elements with an `aria-labelledby` attribute pointing to a visible heading/label ID to ensure proper screen reader context.
