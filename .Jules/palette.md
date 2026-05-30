## 2024-05-30 - Missing Focus Indicators on Custom Inputs
**Learning:** Custom styled input fields often lose default browser focus rings when borders and backgrounds are overridden, making keyboard navigation difficult or impossible for users navigating via Tab.
**Action:** Always add explicit `:focus-visible` styles with adequate contrast (like a noticeable box-shadow or border color change) when resetting default input appearances.
