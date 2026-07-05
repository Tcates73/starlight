## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-07-05 - Custom Progress Bars Accessible Names
**Learning:** While custom visual meters using `role="progressbar"` can have value updates managed via JS (`aria-valuenow`), they are incomplete without a clear accessible name to screen readers.
**Action:** Always pair `role="progressbar"` elements with an `aria-labelledby` attribute that points to a visible, descriptive heading or label element's ID to ensure proper context.
