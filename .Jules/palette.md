## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-03-24 - Progress Bar Screen Reader Context
**Learning:** Custom `role="progressbar"` elements often lack descriptive context when read by screen readers.
**Action:** Always pair custom visual meters with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.
## 2024-10-28 - Explicit Form Labels and Submission Prevention
**Learning:** When implementing interactive client-side forms without a backend, always attach a `submit` event listener that calls `e.preventDefault()` to prevent unintended page reloads (e.g., when a user presses Enter). Additionally, always use explicit `for` and `id` attribute linking between `<label>` and `<input>` elements for robust accessibility, rather than relying solely on implicit wrapping.
**Action:** Always link form labels to inputs using `for`/`id`, and prevent default submission on client-only forms to preserve user state.
