## 2024-06-07 - Dynamic Dashboard Text Announcements
**Learning:** Text nodes in dashboards that dynamically update based on user input (e.g., scores, status messages, summaries) need `aria-live="polite"` so screen readers are aware of the changes without requiring a focus change.
**Action:** Always verify that dynamic feedback elements in interactive components (like forms that drive real-time dashboard stats) are explicitly marked with `aria-live="polite"` to ensure an accessible experience.
