## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-03-24 - Progress Bar Screen Reader Context
**Learning:** Custom `role="progressbar"` elements often lack descriptive context when read by screen readers.
**Action:** Always pair custom visual meters with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.
## 2024-10-26 - Form Accessibility and Submit Prevention
**Learning:** Implicit label wrapping is not always sufficient for robust screen reader support. Additionally, interactive client-side forms without a backend must prevent the default submit action to avoid unintended page reloads (e.g., when a user presses Enter).
**Action:** Always use explicit `for` and `id` attribute linking between `<label>` and `<input>` elements. Attach a `submit` event listener that calls `e.preventDefault()` on client-side only forms.
