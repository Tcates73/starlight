---
title: DevTools
description: Debug your Vibe State applications with Redux DevTools
---

Vibe State integrates seamlessly with Redux DevTools, giving you powerful debugging capabilities out of the box.

## Installation

Install the Redux DevTools browser extension:

- **Chrome**: [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- **Firefox**: [Redux DevTools Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)
- **Edge**: [Redux DevTools Extension](https://microsoftedge.microsoft.com/addons/detail/redux-devtools/nnkgneoiohoecpdiaponcejilbhhikei)

## Automatic Connection

Vibe State automatically connects to DevTools when available. No configuration needed!

```jsx
import { createStore } from 'vibestate';

const useCounter = createStore({ count: 0 })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
  });

// DevTools automatically detects and connects to this store
```

## Using DevTools

### 1. Action History

See every action that's been dispatched:

```
[12:34:56] increment
[12:34:57] increment
[12:34:58] decrement
[12:35:00] reset
```

Each action shows:
- Timestamp
- Action name
- State before and after
- Diff of what changed

### 2. State Inspector

View your entire state tree in real-time:

```json
{
  "count": 5,
  "user": {
    "name": "Alice",
    "email": "alice@example.com"
  },
  "todos": [...]
}
```

### 3. Time Travel

Jump to any point in your application's history:

1. Click on any action in the history
2. Your app state rewinds to that moment
3. UI updates to reflect historical state
4. Continue forward or backward as needed

### 4. Action Replay

Replay actions to see state changes:

- **Step Forward**: Apply the next action
- **Step Backward**: Undo the last action
- **Jump to Action**: Skip to any point
- **Replay All**: Reapply all actions from start

### 5. State Diff

See exactly what changed:

```diff
{
  count: 4 → 5,  // Changed
  user: {...},   // Unchanged
}
```

## Store Configuration

### Custom Store Name

Give your store a descriptive name in DevTools:

```jsx
const useCounter = createStore({ count: 0 }, {
  name: 'Counter Store'
});

const useUser = createStore({ user: null }, {
  name: 'User Store'
});
```

Now DevTools shows "Counter Store" and "User Store" instead of generic names.

### Disable DevTools

Disable DevTools in production:

```jsx
const useStore = createStore({ count: 0 }, {
  devtools: process.env.NODE_ENV !== 'production'
});
```

### Action Names

Actions automatically get descriptive names:

```jsx
.actions({
  increment: (state) => ({ count: state.count + 1 }),
  // Shows as "increment" in DevTools

  addTodo: (state, text) => ({ ... }),
  // Shows as "addTodo" in DevTools
})
```

### Custom Action Names

Override action names for debugging:

```jsx
.actions({
  increment: (state) => ({
    count: state.count + 1,
    __action__: 'Counter/Increment' // Custom name in DevTools
  })
})
```

## Multiple Stores

DevTools handles multiple stores separately:

```jsx
const useCounter = createStore({ count: 0 }, {
  name: 'Counter'
});

const useTodos = createStore({ todos: [] }, {
  name: 'Todos'
});

const useUser = createStore({ user: null }, {
  name: 'User'
});
```

Switch between stores in the DevTools dropdown.

## Advanced Features

### Trace

See stack traces for each action:

```
increment
  at Counter.tsx:15
  at onClick
  at button
```

Enable in DevTools settings: **Options → Trace**

### Test Generator

Generate tests from recorded actions:

1. Record a user flow in your app
2. Click **"Generate Tests"** in DevTools
3. Get test code based on your actions

```jsx
// Generated test
test('counter workflow', () => {
  const store = useCounter.getState();

  store.increment();
  expect(store.count).toBe(1);

  store.increment();
  expect(store.count).toBe(2);

  store.reset();
  expect(store.count).toBe(0);
});
```

### Export/Import

Export and import state for debugging:

1. **Export**: Save current state as JSON
2. **Import**: Load previously exported state
3. Share state snapshots with team

Useful for:
- Reproducing bugs
- Testing edge cases
- Sharing complex states

### Dispatch Monitor

Monitor action performance:

```
increment     0.3ms
fetchUser    45.2ms
updateTodo    0.8ms
```

Identify slow actions and optimize them.

## Debugging Workflows

### Bug Reproduction

1. User reports a bug
2. Ask them to export state from DevTools
3. Import state in your dev environment
4. See exact state that caused the bug
5. Add time travel to see how they got there

### Performance Debugging

1. Open DevTools
2. Perform slow action
3. Check **Dispatch Monitor** for timing
4. Identify bottlenecks
5. Optimize slow actions

### State Inspection

1. Something looks wrong in UI
2. Open DevTools
3. Inspect state tree
4. Find unexpected values
5. Check action history to see what set them

### Regression Testing

1. Record action sequence that works
2. Export as test
3. Add to test suite
4. Prevent regressions

## Best Practices

### 1. Name Your Stores

Always name stores for easier debugging:

```jsx
// ✅ Good - named store
const useStore = createStore({ ... }, { name: 'Auth' });

// ❌ Bad - generic name
const useStore = createStore({ ... });
```

### 2. Descriptive Action Names

Use clear action names:

```jsx
// ✅ Good - descriptive
.actions({
  incrementCounter: (state) => ({ ... }),
  addTodoItem: (state, text) => ({ ... }),
  fetchUserProfile: async (state, id) => ({ ... }),
})

// ❌ Bad - vague
.actions({
  inc: (state) => ({ ... }),
  add: (state, text) => ({ ... }),
  get: async (state, id) => ({ ... }),
})
```

### 3. Disable in Production

Don't ship DevTools to production:

```jsx
const useStore = createStore({ ... }, {
  devtools: process.env.NODE_ENV === 'development'
});
```

### 4. Use for Testing

Generate tests from DevTools recordings to increase coverage.

## Keyboard Shortcuts

DevTools supports keyboard shortcuts:

- `Ctrl/Cmd + H` - Toggle DevTools
- `Ctrl/Cmd + J` - Jump to action
- `Ctrl/Cmd + K` - Clear history
- `←/→` - Time travel backward/forward

## Troubleshooting

### DevTools Not Connecting

If DevTools don't connect:

1. Verify extension is installed
2. Check browser console for errors
3. Ensure `devtools: true` in store config
4. Refresh the page

### Multiple Instances

If you see duplicate stores:

```jsx
// Make sure you're not creating multiple instances
// ❌ Bad
function Component() {
  const useStore = createStore({ ... }); // New instance every render!
}

// ✅ Good
const useStore = createStore({ ... }); // Single instance

function Component() {
  const [state] = useStore();
}
```

### Performance Issues

If DevTools slow down your app:

1. Disable action tracing
2. Limit history size
3. Disable in production

## Tips & Tricks

### Quick State Export

```javascript
// Export current state from console
copy(JSON.stringify(useStore.getState()));
```

### Reset to Initial State

```javascript
// Reset store from console
useStore.getState().reset();
```

### Inspect Store from Console

```javascript
// Make stores available globally (dev only)
window.__stores__ = {
  counter: useCounter,
  todos: useTodos,
  user: useUser
};

// Then access in console
window.__stores__.counter.getState();
```

## Next Steps

- [Creating Stores](/guides/creating-stores) - Build complex stores
- [Using State](/guides/using-state) - Consume state effectively
- [TypeScript](/guides/typescript) - Type-safe debugging
- [Examples](/examples/counter) - See DevTools in action
