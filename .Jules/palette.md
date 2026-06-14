## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2024-06-14 - [Astro Dev Toolbar Overlapping Screenshot]
**Learning:** The Astro dev toolbar can overlap and intercept pointer events in the dev environment, which makes automated verification difficult.
**Action:** Use Playwright's `page.evaluate("document.querySelector('astro-dev-toolbar').style.display = 'none'")` to hide the toolbar before taking screenshots or hovering in dev.
