## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-07-06 - Accessible Custom Visual Meters
**Learning:** Custom visual meters (progress bars) using `div` elements require proper ARIA attributes to be screen reader accessible. While `role="progressbar"`, `aria-valuemin`, and `aria-valuemax` were present, screen readers need to know what the meter represents.
**Action:** Always pair custom visual meters with an `aria-labelledby` attribute pointing to a visible heading/label ID to ensure proper screen reader context.
