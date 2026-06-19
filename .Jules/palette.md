## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-06-19 - Progress Bar Labelling
**Learning:** Custom div-based progress bars require explicit labelling to provide context for screen reader users. While `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` provide state, without a label, users don't know *what* the progress bar represents.
**Action:** Always ensure custom progress bars have an `aria-labelledby` attribute pointing to a visible heading/label ID, or an `aria-label` attribute if no visible text exists.
