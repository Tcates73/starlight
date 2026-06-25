## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2026-06-25 - Progressbar Contextual Labels
**Learning:** Custom visual meters with `role="progressbar"` must always have an `aria-labelledby` attribute pointing to their visible heading to ensure screen readers can provide proper context for what the progress bar represents.
**Action:** Always check custom meters for `aria-labelledby` along with min/max/now attributes.
