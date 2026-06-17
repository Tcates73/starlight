## 2024-02-14 - Dynamic Text Accessibility
**Learning:** Adding `aria-live="polite"` to dynamically updated text nodes that convey important feedback (e.g., scores, status texts in dashboards) ensures proper screen reader accessibility. Progress bars should also have `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow`.
**Action:** Always verify if text nodes updated via JavaScript convey status or feedback, and apply `aria-live="polite"` to them. Apply appropriate ARIA progressbar roles to custom visual meters.## 2024-02-14 - Keyboard Focus Visibility
**Learning:** Default browser focus states might not be visible enough on custom dark-themed elements like dark inputs (`background: #0f172a`). This can make keyboard navigation confusing.
**Action:** Explicitly add `:focus-visible` styles with sufficient contrast (e.g., using brand highlight colors like `#38bdf8`) to ensure keyboard users can track their active element.
