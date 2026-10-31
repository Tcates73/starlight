## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-03-24 - Progress Bar Screen Reader Context
**Learning:** Custom `role="progressbar"` elements often lack descriptive context when read by screen readers.
**Action:** Always pair custom visual meters with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.

## 2024-10-31 - Explicit Form Linking and Prevent Default
**Learning:** Implicitly wrapped labels and inputs are less robust for accessibility than explicitly linked ones. Additionally, interactive client-side forms without backends need explicit prevention of unintended page reloads.
**Action:** Always link labels and inputs explicitly using `for` and `id` attributes, and always attach a `submit` event listener that calls `e.preventDefault()` on client-side forms without a backend.
