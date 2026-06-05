## 2024-05-24 - Screen Reader Feedback for Dashboards
**Learning:** Adding `aria-live="polite"` is crucial for dynamic dashboard values (like Health, Stress, or XP scores) that change frequently via JavaScript, otherwise screen reader users miss out on crucial live updates. Astro natively supports typed DOM lookups in `<script>` tags, making it easy to enforce null safety alongside these changes.
**Action:** Always add `aria-live="polite"` when dynamically updating text nodes containing scores or feedback in interactive components, and ensure TypeScript annotations are used defensively.
