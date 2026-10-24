## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-03-24 - Progress Bar Screen Reader Context
**Learning:** Custom `role="progressbar"` elements often lack descriptive context when read by screen readers.
**Action:** Always pair custom visual meters with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.

## 2024-10-24 - Preventing Unintended Form Reloads and Enhancing Form Accessibility
**Learning:** Client-side forms without a backend action can inadvertently reload the page when a user presses Enter, wiping out unsaved interactions. Furthermore, relying on implicit label wrapping without explicit `for` and `id` linking can cause robustness issues with some assistive technologies.
**Action:** Always attach a `submit` event listener with `e.preventDefault()` on purely client-side forms and ensure `<label>` elements are explicitly linked to `<input>` elements using `for` and `id` attributes.
