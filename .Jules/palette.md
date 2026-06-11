
## 2024-05-18 - Accessibility for Dynamic Dashboards
**Learning:** For dynamic visual indicators like custom progress bars and continuously updating stat texts (XP, status), it's critical to add `role="progressbar"`, dynamic `aria-valuenow`, and `aria-live="polite"` so screen readers can track the real-time adjustments without full page reloads.
**Action:** When auditing custom game or dashboard widgets, always verify that non-interactive visual indicators have appropriate ARIA semantics and that dynamically changing text descriptions use `aria-live` regions.
