---
title: Creating Stores
description: Learn how to create and organize stores in Vibe State
---

This guide covers everything you need to know about creating stores in Vibe State.

## Basic Store

The simplest store has just initial state:

```jsx
import { createStore } from 'vibestate';

const useCounter = createStore({ count: 0 });
```

This gives you a store with state, but you'll want to add actions to make it useful.

## Store with Actions

Add actions to modify your state:

```jsx
const useCounter = createStore({ count: 0 })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
    add: (state, amount) => ({ count: state.count + amount }),
    reset: () => ({ count: 0 }),
  });
```

## Actions API

Actions receive parameters in this order:

```jsx
.actions({
  myAction: (state, ...params) => {
    // state: current state (read-only)
    // params: arguments passed when calling the action
    return { /* new state */ };
  }
})
```

### Accessing Other Actions

Actions can call other actions from the same store:

```jsx
const useStore = createStore({ count: 0, history: [] })
  .actions({
    increment: (state) => ({
      count: state.count + 1
    }),

    incrementAndLog: (state, actions) => {
      // Call another action
      actions.increment();

      // Add to history
      return {
        history: [...state.history, `Count is now ${state.count + 1}`]
      };
    }
  });
```

## Computed Values

Add derived state with computed values:

```jsx
const useStore = createStore({
  firstName: 'John',
  lastName: 'Doe',
  items: [1, 2, 3, 4, 5]
})
.computed({
  fullName: (state) => `${state.firstName} ${state.lastName}`,
  itemCount: (state) => state.items.length,
  evenItems: (state) => state.items.filter(n => n % 2 === 0),
});
```

Computed values are memoized and only recalculate when dependencies change:

```jsx
function Profile() {
  const [state] = useStore();

  // Efficiently computed, cached automatically
  return <h1>{state.fullName}</h1>;
}
```

## Async Actions

Handle async operations naturally:

```jsx
const useUserStore = createStore({
  user: null,
  loading: false,
  error: null
})
.actions({
  fetchUser: async (state, actions, userId) => {
    // Set loading state
    actions.updatePartial({ loading: true, error: null });

    try {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();

      return {
        user,
        loading: false
      };
    } catch (error) {
      return {
        loading: false,
        error: error.message
      };
    }
  }
});
```

## Store Persistence

Persist state to localStorage or sessionStorage:

```jsx
const useStore = createStore({ theme: 'dark', fontSize: 16 })
  .persist({
    key: 'app-preferences',
    storage: localStorage, // or sessionStorage
  });
```

### Selective Persistence

Only persist specific keys:

```jsx
.persist({
  key: 'app-state',
  storage: localStorage,
  include: ['theme', 'fontSize'], // Only persist these
  // OR
  exclude: ['tempData', 'cache'], // Don't persist these
})
```

### Custom Serialization

Provide custom serialization for complex data:

```jsx
.persist({
  key: 'app-state',
  storage: localStorage,
  serialize: (state) => JSON.stringify(state),
  deserialize: (stored) => JSON.parse(stored),
})
```

## Middleware

Add middleware for logging, validation, or side effects:

```jsx
const logger = (storeName) => (action, prevState, nextState) => {
  console.log(`[${storeName}] ${action.name}`, {
    prev: prevState,
    next: nextState
  });
};

const useStore = createStore({ count: 0 })
  .middleware([
    logger('counter'),
    // Add more middleware
  ]);
```

## Multiple Stores

Create multiple independent stores for different domains:

```jsx
// User store
export const useUserStore = createStore({
  user: null,
  isAuthenticated: false
})
.actions({
  login: async (state, credentials) => { /* ... */ },
  logout: () => ({ user: null, isAuthenticated: false })
});

// Theme store
export const useThemeStore = createStore({
  theme: 'dark',
  primaryColor: '#007bff'
})
.actions({
  setTheme: (state, theme) => ({ theme }),
  setPrimaryColor: (state, color) => ({ primaryColor: color })
});

// Cart store
export const useCartStore = createStore({
  items: [],
  total: 0
})
.actions({
  addItem: (state, item) => ({ /* ... */ }),
  removeItem: (state, itemId) => ({ /* ... */ })
});
```

## Store Organization

### File Structure

Organize stores by feature or domain:

```
src/
  stores/
    user.js       - User authentication & profile
    theme.js      - UI theme and preferences
    cart.js       - Shopping cart
    todos.js      - Todo list state
    index.js      - Export all stores
```

### index.js

Export all stores from a central location:

```jsx
// src/stores/index.js
export { useUserStore } from './user';
export { useThemeStore } from './theme';
export { useCartStore } from './cart';
export { useTodosStore } from './todos';
```

### Usage

Import stores where needed:

```jsx
import { useUserStore, useCartStore } from '@/stores';

function Header() {
  const [user] = useUserStore();
  const [cart] = useCartStore();

  return (
    <header>
      <span>Welcome, {user.name}</span>
      <span>Cart: {cart.items.length} items</span>
    </header>
  );
}
```

## Best Practices

### 1. Single Responsibility

Each store should manage one domain:

```jsx
// ✅ Good - focused stores
const useAuthStore = createStore({ /* auth state */ });
const useProductStore = createStore({ /* product state */ });

// ❌ Bad - kitchen sink store
const useGlobalStore = createStore({
  auth: {},
  products: {},
  cart: {},
  ui: {},
  // ...everything
});
```

### 2. Normalize State

Keep state flat and normalized:

```jsx
// ✅ Good - normalized
{
  users: {
    '1': { id: 1, name: 'Alice' },
    '2': { id: 2, name: 'Bob' }
  },
  posts: {
    '1': { id: 1, userId: 1, title: 'Hello' }
  }
}

// ❌ Bad - nested
{
  users: [
    {
      id: 1,
      name: 'Alice',
      posts: [{ id: 1, title: 'Hello' }]
    }
  ]
}
```

### 3. Co-locate Actions

Keep actions close to where they're defined:

```jsx
// ✅ Good - all logic in store
const useStore = createStore({ items: [] })
  .actions({
    addItem: (state, item) => ({
      items: [...state.items, item]
    })
  });

// ❌ Bad - business logic in components
function Component() {
  const [state, actions] = useStore();

  const addItem = (item) => {
    // Complex logic here
    actions.setState({ items: [...state.items, item] });
  };
}
```

### 4. Use Computed for Derived State

Don't calculate in components:

```jsx
// ✅ Good - computed value
const useStore = createStore({ items: [] })
  .computed({
    total: (state) => state.items.reduce((sum, item) => sum + item.price, 0)
  });

// ❌ Bad - calculating in component
function Component() {
  const [state] = useStore();
  const total = state.items.reduce((sum, item) => sum + item.price, 0);
}
```

## Next Steps

- [Using State](/guides/using-state) - Consuming state in components
- [TypeScript](/guides/typescript) - Type-safe stores
- [DevTools](/guides/devtools) - Debugging with DevTools
- [Examples](/examples/counter) - Real-world examples
