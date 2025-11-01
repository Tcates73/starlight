---
title: Core Concepts
description: Understanding the fundamental concepts behind Vibe State
---

Vibe State is built on a few simple but powerful concepts. Understanding these will help you build better applications with less code.

## Stores

A **store** is a container for your application state. Unlike Redux, you can have multiple independent stores, each managing a specific part of your app.

```jsx
const useUserStore = createStore({ user: null, isLoggedIn: false });
const useThemeStore = createStore({ theme: 'dark', fontSize: 16 });
```

Each store is completely independent. No need for a global store or complex setup.

### Store Hook

When you call `createStore()`, it returns a React hook that you can use in any component:

```jsx
function MyComponent() {
  const [state, actions] = useUserStore();
  //      ^state    ^actions
}
```

The hook returns a tuple (array) with two elements:
1. **state** - The current state object (read-only)
2. **actions** - Functions to update the state

## State

State is a plain JavaScript object containing your data. It should be serializable (no functions, classes, or symbols).

```jsx
// ✅ Good state
{
  count: 0,
  user: { name: 'Alice', age: 25 },
  todos: [{ id: 1, text: 'Learn Vibe State' }]
}

// ❌ Bad state
{
  callback: () => {}, // Functions don't belong in state
  date: new Date(),   // Use timestamps instead
}
```

### Immutability

State in Vibe State is **immutable**. You never modify state directly - instead, actions return new state objects:

```jsx
// ❌ Wrong - mutating state
increment: (state) => {
  state.count++; // Don't do this!
  return state;
}

// ✅ Correct - returning new state
increment: (state) => ({
  count: state.count + 1
})
```

## Actions

**Actions** are functions that update your state. They receive the current state and optional parameters, and return the new state (or parts of it).

```jsx
.actions({
  // Simple action
  reset: () => ({ count: 0 }),

  // Action using current state
  increment: (state) => ({ count: state.count + 1 }),

  // Action with parameters
  add: (state, amount) => ({ count: state.count + amount }),

  // Async action
  fetchUser: async (state, userId) => {
    const user = await api.getUser(userId);
    return { user, loading: false };
  }
})
```

### Partial Updates

Actions only need to return the properties that changed. Vibe State merges them with the existing state:

```jsx
// Current state: { count: 5, user: 'Alice', theme: 'dark' }

increment: (state) => ({ count: state.count + 1 })

// New state: { count: 6, user: 'Alice', theme: 'dark' }
// Only count changed, other properties preserved
```

### Action Composition

Actions can call other actions:

```jsx
const useStore = createStore({ count: 0, history: [] })
  .actions({
    increment: (state) => ({
      count: state.count + 1
    }),

    incrementWithHistory: (state, actions) => {
      actions.increment();
      return {
        history: [...state.history, `Incremented to ${state.count + 1}`]
      };
    }
  });
```

## Computed Values

**Computed values** are derived from your state. They're memoized and only recalculate when their dependencies change.

```jsx
const useTodos = createStore({
  todos: [],
  filter: 'all'
})
.computed({
  // Computed values are functions of state
  completedTodos: (state) =>
    state.todos.filter(t => t.completed),

  activeTodos: (state) =>
    state.todos.filter(t => !t.completed),

  visibleTodos: (state) => {
    if (state.filter === 'completed') return state.completedTodos;
    if (state.filter === 'active') return state.activeTodos;
    return state.todos;
  }
});
```

Computed values appear on the state object and update automatically:

```jsx
function TodoList() {
  const [state] = useTodos();

  return (
    <ul>
      {state.visibleTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## Reactivity

Vibe State automatically tracks which components use which parts of state. When state changes, only components that use the changed values re-render.

```jsx
function ComponentA() {
  const [state] = useStore();
  return <div>{state.count}</div>; // Re-renders when count changes
}

function ComponentB() {
  const [state] = useStore();
  return <div>{state.user}</div>; // Only re-renders when user changes
}
```

This automatic optimization means you don't need to worry about performance - Vibe State handles it for you.

## Async Actions

Async actions work naturally with async/await:

```jsx
.actions({
  fetchData: async (state) => {
    // Set loading state
    await new Promise(resolve => {
      setTimeout(() => {
        resolve({ loading: true });
      }, 0);
    });

    // Fetch data
    const data = await api.fetchData();

    // Update with results
    return { data, loading: false };
  }
})
```

During async operations, you can update state multiple times:

```jsx
loadUser: async (state, actions, userId) => {
  actions.updatePartial({ loading: true });

  try {
    const user = await api.getUser(userId);
    return { user, loading: false, error: null };
  } catch (error) {
    return { loading: false, error: error.message };
  }
}
```

## Persistence

Store state can be persisted to localStorage or sessionStorage:

```jsx
const useStore = createStore({ count: 0 })
  .persist({
    key: 'my-app-state',
    storage: localStorage
  });
```

State is automatically saved on changes and restored on mount.

## DevTools Integration

Vibe State connects to Redux DevTools automatically when available. Every action shows up in the timeline with:
- Action name
- State before and after
- Time-travel debugging support

No configuration needed - it just works! 🎉

## Philosophy

Vibe State follows these principles:

1. **Simple by default** - Common cases should be easy
2. **Powerful when needed** - Advanced features available but not required
3. **Type-safe** - TypeScript support is first-class
4. **Performance** - Optimized automatically
5. **Developer experience** - Great DevTools, clear errors, helpful docs

## Next Steps

Now that you understand the concepts, dive deeper:

- [Creating Stores](/guides/creating-stores) - Advanced store patterns
- [Using State](/guides/using-state) - Best practices for consuming state
- [TypeScript Guide](/guides/typescript) - Type-safe state management
- [Examples](/examples/counter) - Real-world applications
