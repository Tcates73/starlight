## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-03-24 - Progress Bar Screen Reader Context
**Learning:** Custom `role="progressbar"` elements often lack descriptive context when read by screen readers.
**Action:** Always pair custom visual meters with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.
## 2024-05-10 - Explicit Form Labelling and Default Submissions
**Learning:** Implicit form label wrapping (e.g., `<label>Text<input/></label>`) is valid but explicitly linking labels to inputs with `for` and `id` provides the most robust support across screen readers. Furthermore, client-side reactive forms without a backend should intercept the `submit` event with `e.preventDefault()` to avoid disorienting page reloads when a user presses "Enter" while focused on an input.
**Action:** Always provide explicit `for`/`id` bindings for forms, and ensure reactive forms prevent default submission behaviors to preserve application state and improve keyboard navigation UX.
