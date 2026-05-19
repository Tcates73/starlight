## 2024-05-19 - Screen reader accessibility for custom progress bars
**Learning:** Custom UI elements acting as progress bars (like `.meter` health or stress bars) are completely invisible to screen readers without ARIA attributes.
**Action:** Always add `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"` to the container, link it to a heading with `aria-labelledby`, and dynamically update `aria-valuenow` via JavaScript as the value changes.
