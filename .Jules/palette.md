## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2025-02-14 - Progressbar Accessibility Context
**Learning:** While `role="progressbar"` correctly identifies a meter to a screen reader, without an accessible name (like `aria-labelledby` or `aria-label`), users don't know *what* the progress bar represents (e.g., "Budget Health" vs. "Stress Meter").
**Action:** Always ensure custom visual meters with `role="progressbar"` are paired with an `aria-labelledby` attribute pointing to a visible heading/label ID, or at least have an `aria-label`.
