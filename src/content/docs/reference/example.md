---
title: createStore
description: API reference for the createStore function
---

The `createStore` function is the primary API for creating stores in Vibe State.

## Signature

```typescript
function createStore<T>(
  initialState: T,
  options?: StoreOptions
): Store<T>
```

## Parameters

### `initialState`

**Type:** `T extends object`

The initial state for your store. Must be a plain object.

```jsx
const useStore = createStore({
  count: 0,
  user: null,
  items: []
});
```

### `options` (optional)

**Type:** `StoreOptions`

Configuration options for the store.

```typescript
interface StoreOptions {
  name?: string;
  devtools?: boolean;
  persist?: PersistOptions;
}
```

#### `name`

**Type:** `string`
**Default:** `'Store'`

A descriptive name for the store (used in DevTools).

```jsx
const useStore = createStore({ count: 0 }, {
  name: 'Counter Store'
});
```

#### `devtools`

**Type:** `boolean`
**Default:** `true` in development, `false` in production

Enable/disable Redux DevTools integration.

```jsx
const useStore = createStore({ count: 0 }, {
  devtools: process.env.NODE_ENV === 'development'
});
```

#### `persist`

**Type:** `PersistOptions`
**Default:** `undefined`

Configure state persistence to localStorage/sessionStorage.

```jsx
const useStore = createStore({ theme: 'dark' }, {
  persist: {
    key: 'app-theme',
    storage: localStorage
  }
});
```

## Returns

**Type:** `Store<T>`

A store object with the following methods:

### `.actions(actions)`

Define actions to modify state.

**Parameters:**
- `actions`: Object with action functions

**Returns:** `Store<T>` (chainable)

```jsx
const useStore = createStore({ count: 0 })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
    add: (state, amount) => ({ count: state.count + amount }),
  });
```

### `.computed(computed)`

Define computed/derived values.

**Parameters:**
- `computed`: Object with computed functions

**Returns:** `Store<T>` (chainable)

```jsx
const useStore = createStore({ items: [] })
  .computed({
    itemCount: (state) => state.items.length,
    firstItem: (state) => state.items[0],
  });
```

### `.middleware(middleware)`

Add middleware for logging, validation, etc.

**Parameters:**
- `middleware`: Array of middleware functions

**Returns:** `Store<T>` (chainable)

```jsx
const logger = (action, prevState, nextState) => {
  console.log(action.name, { prev: prevState, next: nextState });
};

const useStore = createStore({ count: 0 })
  .middleware([logger]);
```

### `.persist(options)`

Configure state persistence.

**Parameters:**
- `options`: `PersistOptions`

**Returns:** `Store<T>` (chainable)

```jsx
const useStore = createStore({ count: 0 })
  .persist({
    key: 'counter-state',
    storage: localStorage,
    include: ['count'], // Only persist these keys
  });
```

## Store Hook

The return value of `createStore()` is a React hook:

```jsx
function Component() {
  const [state, actions] = useStore();
  //     ^state    ^actions
}
```

### Hook Return Value

**Type:** `[State, Actions]`

A tuple with:
1. **state**: Current state object (read-only)
2. **actions**: Object with all action functions

### Hook Subscriptions

The hook automatically subscribes to state changes and re-renders only when used state changes.

```jsx
function Counter() {
  const [{ count }, { increment }] = useStore();
  // Only re-renders when 'count' changes
}
```

## Static Methods

### `useStore.getState()`

Get current state without subscribing to changes.

**Returns:** Current state snapshot

```jsx
const currentState = useStore.getState();
console.log(currentState.count);
```

### `useStore.subscribe(callback)`

Subscribe to state changes.

**Parameters:**
- `callback`: `(state: State) => void`

**Returns:** Unsubscribe function

```jsx
const unsubscribe = useStore.subscribe((state) => {
  console.log('State changed:', state);
});

// Later
unsubscribe();
```

### `useStore.setState(newState)`

Set state directly (use sparingly, prefer actions).

**Parameters:**
- `newState`: `Partial<State>`

```jsx
useStore.setState({ count: 10 });
```

## Action Function Signature

Actions receive state and optional parameters:

```typescript
type ActionFn<State, Args extends any[]> = (
  state: State,
  ...args: Args
) => Partial<State> | Promise<Partial<State>>
```

### Action Parameters

```jsx
.actions({
  // No parameters
  reset: () => ({ count: 0 }),

  // Using state
  increment: (state) => ({ count: state.count + 1 }),

  // With parameters
  add: (state, amount: number) => ({ count: state.count + amount }),

  // Multiple parameters
  update: (state, field: string, value: any) => ({
    [field]: value
  }),

  // Async
  fetch: async (state) => {
    const data = await api.fetch();
    return { data };
  },
})
```

### Accessing Other Actions

Actions can receive an `actions` parameter to call other actions:

```jsx
.actions({
  increment: (state) => ({ count: state.count + 1 }),

  incrementTwice: (state, actions) => {
    actions.increment();
    actions.increment();
  }
})
```

## Computed Function Signature

Computed values are derived from state:

```typescript
type ComputedFn<State, Return> = (state: State) => Return
```

```jsx
.computed({
  // Simple computed
  doubled: (state) => state.count * 2,

  // Complex computed
  visibleTodos: (state) => {
    return state.todos.filter(t =>
      state.filter === 'all' ||
      (state.filter === 'completed' && t.completed) ||
      (state.filter === 'active' && !t.completed)
    );
  }
})
```

Computed values are memoized and cached automatically.

## Persist Options

```typescript
interface PersistOptions {
  key: string;
  storage: Storage;
  include?: string[];
  exclude?: string[];
  serialize?: (state: any) => string;
  deserialize?: (stored: string) => any;
}
```

### `key`

**Type:** `string`
**Required**

Key to use for storage.

### `storage`

**Type:** `Storage`
**Required**

Storage object (`localStorage` or `sessionStorage`).

### `include`

**Type:** `string[]`
**Optional**

Only persist these keys from state.

### `exclude`

**Type:** `string[]`
**Optional**

Don't persist these keys from state.

### `serialize`

**Type:** `(state: any) => string`
**Default:** `JSON.stringify`

Custom serialization function.

### `deserialize`

**Type:** `(stored: string) => any`
**Default:** `JSON.parse`

Custom deserialization function.

## Examples

### Basic Counter

```jsx
const useCounter = createStore({ count: 0 })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
  });
```

### Async Store

```jsx
const useUser = createStore({ user: null, loading: false })
  .actions({
    fetchUser: async (state, userId) => {
      await Promise.resolve().then(() => ({ loading: true }));

      const user = await api.getUser(userId);
      return { user, loading: false };
    }
  });
```

### With Computed

```jsx
const useTodos = createStore({ todos: [] })
  .computed({
    completedCount: (state) =>
      state.todos.filter(t => t.completed).length
  });
```

### With Persistence

```jsx
const useSettings = createStore({ theme: 'dark', lang: 'en' })
  .persist({
    key: 'app-settings',
    storage: localStorage
  });
```

## Type Safety

Vibe State is fully typed with TypeScript:

```typescript
import { createStore } from 'vibestate';

interface State {
  count: number;
  user: User | null;
}

const useStore = createStore<State>({
  count: 0,
  user: null
})
.actions({
  setCount: (state, count: number) => ({ count }),
  //                    ^^ typed parameter
});
```

## See Also

- [Quick Start](/getting-started/quick-start)
- [Creating Stores](/guides/creating-stores)
- [TypeScript Guide](/guides/typescript)
