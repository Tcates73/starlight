## 2024-05-15 - Dynamic Feedback Accessibility
**Learning:** Text nodes conveying important dynamic status (like budget health, stress meters, or XP) are not automatically announced by screen readers when updated via JS.
**Action:** Always add `aria-live="polite"` to dynamic text elements in dashboards/games to ensure accessibility without interrupting the user.
