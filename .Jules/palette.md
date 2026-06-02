## 2024-05-24 - Dynamic Content Accessibility
**Learning:** Text elements that dynamically update to convey important status or scores in game-like components (such as XP values, health status, stress meters) need `aria-live="polite"` to be announced by screen readers. Otherwise, visually impaired users miss out on crucial interactive feedback.
**Action:** Always add `aria-live="polite"` to spans or paragraphs whose `textContent` is frequently updated via JavaScript in response to user input, especially for dashboards and game HUDs.
