---
title: Using State
description: Best practices for consuming state in React components
---

Learn how to efficiently use Vibe State in your React components.

## Basic Usage

Import and use your store as a hook:

```jsx
import { useCounter } from '@/stores/counter';

function Counter() {
  const [state, actions] = useCounter();

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={actions.increment}>+1</button>
    </div>
  );
}
```

## Destructuring State

You can destructure state for cleaner code:

```jsx
function Counter() {
  const [{ count }, { increment, decrement }] = useCounter();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Selective Subscriptions

Only subscribe to the parts of state you need:

```jsx
// Subscribe to everything
const [state, actions] = useStore();

// Only subscribe to specific values
const [{ count }] = useStore();  // Only re-renders when count changes

// Only get actions (no state subscription)
const [, actions] = useStore();  // Never re-renders from state changes
```

## Computed Values

Use computed values for derived state:

```jsx
const useTodos = createStore({ todos: [] })
  .computed({
    completedCount: (state) =>
      state.todos.filter(t => t.completed).length,

    activeCount: (state) =>
      state.todos.filter(t => !t.completed).length,
  });

function TodoStats() {
  const [{ completedCount, activeCount }] = useTodos();

  return (
    <div>
      <p>Completed: {completedCount}</p>
      <p>Active: {activeCount}</p>
    </div>
  );
}
```

## Action Parameters

Pass parameters to actions:

```jsx
function AddTodo() {
  const [, { addTodo }] = useTodos();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);  // Pass parameter to action
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
```

## Async Actions

Handle async actions with loading states:

```jsx
function UserProfile({ userId }) {
  const [{ user, loading, error }, { fetchUser }] = useUserStore();

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## Multiple Stores

Use multiple stores in the same component:

```jsx
import { useUserStore } from '@/stores/user';
import { useThemeStore } from '@/stores/theme';
import { useCartStore } from '@/stores/cart';

function Header() {
  const [{ user }] = useUserStore();
  const [{ theme }] = useThemeStore();
  const [{ items }] = useCartStore();

  return (
    <header className={theme}>
      <span>Welcome, {user.name}</span>
      <span>Cart: {items.length}</span>
    </header>
  );
}
```

## Conditional Actions

Call actions conditionally:

```jsx
function TodoItem({ todo }) {
  const [, { toggleTodo, deleteTodo }] = useTodos();

  const handleClick = () => {
    if (todo.completed) {
      // Ask for confirmation before un-completing
      if (confirm('Mark as incomplete?')) {
        toggleTodo(todo.id);
      }
    } else {
      toggleTodo(todo.id);
    }
  };

  return (
    <div onClick={handleClick}>
      {todo.text}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}
```

## Reading State Outside Components

Sometimes you need state outside React components:

```jsx
import { useStore } from '@/stores/app';

// Get current state snapshot
const currentState = useStore.getState();

// Subscribe to changes
const unsubscribe = useStore.subscribe((state) => {
  console.log('State changed:', state);
});

// Later: unsubscribe
unsubscribe();
```

## Testing

Test components that use Vibe State:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { useCounter } from '@/stores/counter';
import Counter from './Counter';

test('increments counter', () => {
  // Reset store before test
  useCounter.getState().reset();

  render(<Counter />);

  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  fireEvent.click(screen.getByText('+1'));

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### Mock Stores for Testing

Create mock stores for isolated testing:

```jsx
import { createStore } from 'vibestate';

// Create a fresh store for each test
function createTestStore(initialState = {}) {
  return createStore({
    count: 0,
    ...initialState
  })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
  });
}

test('my test', () => {
  const useStore = createTestStore({ count: 5 });
  // Use this store in your test
});
```

## Performance Tips

### 1. Selective Subscriptions

Only subscribe to what you need:

```jsx
// ❌ Bad - re-renders on any state change
function Component() {
  const [state] = useStore();
  return <div>{state.count}</div>;
}

// ✅ Good - only re-renders when count changes
function Component() {
  const [{ count }] = useStore();
  return <div>{count}</div>;
}
```

### 2. Use Computed Values

Don't recalculate on every render:

```jsx
// ❌ Bad - recalculates every render
function TodoList() {
  const [{ todos }] = useTodos();
  const completed = todos.filter(t => t.completed); // Recalculated every render

  return <div>{completed.length} completed</div>;
}

// ✅ Good - computed once, cached
const useTodos = createStore({ todos: [] })
  .computed({
    completed: (state) => state.todos.filter(t => t.completed)
  });

function TodoList() {
  const [{ completed }] = useTodos();
  return <div>{completed.length} completed</div>;
}
```

### 3. Split Large Stores

Break large stores into smaller, focused stores:

```jsx
// ❌ Bad - one giant store
const useAppStore = createStore({
  user: {},
  products: [],
  cart: [],
  ui: {},
  // 50 more properties...
});

// ✅ Good - multiple focused stores
const useUserStore = createStore({ user: {} });
const useProductStore = createStore({ products: [] });
const useCartStore = createStore({ cart: [] });
const useUIStore = createStore({ theme: 'dark' });
```

### 4. Memoize Callbacks

Use `useCallback` for action handlers:

```jsx
import { useCallback } from 'react';

function TodoItem({ todo }) {
  const [, { toggleTodo }] = useTodos();

  // Memoize callback to prevent re-renders
  const handleToggle = useCallback(() => {
    toggleTodo(todo.id);
  }, [todo.id, toggleTodo]);

  return <Todo onClick={handleToggle} />;
}
```

## Common Patterns

### Loading States

```jsx
const useDataStore = createStore({
  data: null,
  loading: false,
  error: null
})
.actions({
  fetchData: async (state, actions) => {
    actions.updatePartial({ loading: true, error: null });

    try {
      const data = await api.fetch();
      return { data, loading: false };
    } catch (error) {
      return { loading: false, error: error.message };
    }
  }
});
```

### Form State

```jsx
const useFormStore = createStore({
  values: {},
  errors: {},
  touched: {},
  isSubmitting: false
})
.actions({
  setField: (state, name, value) => ({
    values: { ...state.values, [name]: value }
  }),

  setTouched: (state, name) => ({
    touched: { ...state.touched, [name]: true }
  }),

  validateField: (state, name) => {
    const error = validate(name, state.values[name]);
    return {
      errors: { ...state.errors, [name]: error }
    };
  }
});
```

### Modal State

```jsx
const useModalStore = createStore({
  isOpen: false,
  modalType: null,
  modalProps: {}
})
.actions({
  openModal: (state, type, props = {}) => ({
    isOpen: true,
    modalType: type,
    modalProps: props
  }),

  closeModal: () => ({
    isOpen: false,
    modalType: null,
    modalProps: {}
  })
});
```

## Next Steps

- [TypeScript](/guides/typescript) - Type-safe state management
- [DevTools](/guides/devtools) - Debug with Redux DevTools
- [Creating Stores](/guides/creating-stores) - Advanced store patterns
- [Examples](/examples/counter) - See real-world examples
