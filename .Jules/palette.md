## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-03-24 - Progress Bar Screen Reader Context
**Learning:** Custom `role="progressbar"` elements often lack descriptive context when read by screen readers.
**Action:** Always pair custom visual meters with an `aria-labelledby` attribute pointing to a visible heading or label ID to ensure proper screen reader context.
## 2024-05-24 - Form Labeling and Submit Prevention
**Learning:** For accessibility on custom interactive client-side forms, implicit label wrapping is sometimes insufficient for some screen readers. Explicit `for` and `id` linking makes it much more robust. Also, single-page application forms without a backend must prevent the default submit event to avoid unexpected page reloads when pressing Enter inside inputs.
**Action:** Use explicit `for` and `id` linking for inputs and always prevent default on `submit` events for purely interactive client-side forms.
## 2024-05-24 - Contextualize Range Inputs for Screen Readers
**Learning:** Relying solely on adjacent text or `<span>` elements to display a range input's value isn't sufficient for screen readers, which may just announce a raw number when the user interacts with the slider.
**Action:** Always include an `aria-valuetext` attribute on range inputs (`type="range"`) and update it dynamically via JavaScript to provide human-readable context (e.g., '15 minutes').
