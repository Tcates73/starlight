## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2025-06-15 - Progressbar Labels
**Learning:** Custom UI meters that use `role="progressbar"` lack context for screen reader users if they aren't explicitly labeled.
**Action:** Always pair `role="progressbar"` with an `aria-labelledby` attribute pointing to a visible heading/label ID to ensure the context of the metric (e.g., "Budget Health", "Stress Meter") is announced clearly.
