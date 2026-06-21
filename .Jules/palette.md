## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2026-06-21 - Progressbar Accessible Names
**Learning:** Custom UI elements like div-based progress bars need explicit contextual labels. Even if a progressbar visually follows a heading, screen readers require an explicit `aria-labelledby` attribute pointing to the heading's ID to announce its purpose clearly.
**Action:** Always verify custom visual meters have an `aria-labelledby` attribute connecting them to an existing visible label or heading.
