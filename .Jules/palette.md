## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-03-24 - Progress Bar Screen Reader Context
**Learning:** Custom `role="progressbar"` elements often lack descriptive context when read by screen readers.
**Action:** Always pair custom visual meters with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.
## 2024-04-18 - Form Accessibility and Implicit Submissions
**Learning:** Implicit label wrapping (e.g., `<label>Text <input></label>`) is sometimes insufficient for older assistive technologies. Forms with inputs can also implicitly submit and reload the page if the user hits Enter inside an input field, which wipes out local state if no explicit submission logic exists.
**Action:** Always use explicit `for` and `id` linking for labels and inputs. For interactive forms meant to update client-side state without a backend, attach a `submit` event listener that calls `e.preventDefault()` to prevent unintended page reloads.
