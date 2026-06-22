## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.
## 2026-06-22 - Progressbar Context and Focus Visibility
**Learning:** Custom progress bars must be explicitly linked to visible labels (e.g., via `aria-labelledby` pointing to a heading ID) so screen readers can describe what the meter represents. Additionally, dark-themed UIs require high-contrast `:focus-visible` outlines for form inputs to maintain keyboard navigation accessibility.
**Action:** Always assign IDs to headers above custom meters and reference them using `aria-labelledby`. Define distinct `:focus-visible` outlines for interactive elements on dark backgrounds.
