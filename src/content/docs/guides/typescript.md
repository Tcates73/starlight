---
title: TypeScript Guide
description: Type-safe state management with Vibe State and TypeScript
---

Vibe State is built with TypeScript and provides excellent type safety out of the box. This guide shows you how to get the most out of TypeScript with Vibe State.

## Automatic Type Inference

Vibe State automatically infers types from your store definition:

```typescript
import { createStore } from 'vibestate';

const useCounter = createStore({ count: 0 })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
    //         ^state is typed as { count: number }
    add: (state, amount: number) => ({ count: state.count + amount }),
  });

function Counter() {
  const [state, actions] = useCounter();
  //     ^state: { count: number }
  //            ^actions: { increment: () => void, add: (amount: number) => void }

  state.count; // ✅ Typed as number
  actions.increment(); // ✅ Typed
  actions.add(5); // ✅ Requires number parameter
  actions.add('5'); // ❌ Type error
}
```

## Explicit Types

Define explicit types for complex state:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const useUserStore = createStore<UserState>({
  user: null,
  loading: false,
  error: null
})
.actions({
  setUser: (state, user: User) => ({ user }),
  clearUser: () => ({ user: null }),
});
```

## Action Types

Actions are fully typed with parameters and return types:

```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const useTodos = createStore({ todos: [] as Todo[] })
  .actions({
    // Parameter types are enforced
    addTodo: (state, text: string) => ({
      todos: [...state.todos, {
        id: Date.now(),
        text,
        completed: false
      }]
    }),

    // Return type is checked
    toggleTodo: (state, id: number) => ({
      todos: state.todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    }),

    // Multiple parameters
    updateTodo: (state, id: number, text: string) => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      )
    })
  });
```

## Computed Types

Computed values are typed based on their return type:

```typescript
const useTodos = createStore({ todos: [] as Todo[] })
  .computed({
    // Return type is inferred as Todo[]
    completedTodos: (state) =>
      state.todos.filter(t => t.completed),

    // Return type is inferred as number
    completedCount: (state) =>
      state.todos.filter(t => t.completed).length,

    // Explicit return type
    todoById: (state): (id: number) => Todo | undefined =>
      (id) => state.todos.find(t => t.id === id),
  });

function TodoStats() {
  const [state] = useTodos();

  state.completedTodos; // Type: Todo[]
  state.completedCount; // Type: number
  state.todoById(1); // Type: Todo | undefined
}
```

## Async Actions

Async actions maintain type safety:

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
}

const useUserStore = createStore({
  user: null as User | null,
  loading: false,
  error: null as string | null
})
.actions({
  fetchUser: async (state, actions, userId: number) => {
    actions.updatePartial({ loading: true, error: null });

    try {
      const response: ApiResponse<User> = await api.getUser(userId);

      return {
        user: response.data, // ✅ Typed as User
        loading: false
      };
    } catch (error) {
      return {
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
});
```

## Generic Stores

Create reusable generic store factories:

```typescript
interface ResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function createResourceStore<T>(resourceName: string) {
  return createStore<ResourceState<T>>({
    data: null,
    loading: false,
    error: null
  })
  .actions({
    setData: (state, data: T) => ({ data, loading: false, error: null }),

    setLoading: (state, loading: boolean) => ({ loading }),

    setError: (state, error: string) => ({ error, loading: false }),

    fetch: async (state, actions, id: number) => {
      actions.setLoading(true);

      try {
        const data = await api.fetch<T>(`/${resourceName}/${id}`);
        actions.setData(data);
      } catch (error) {
        actions.setError(error.message);
      }
    }
  });
}

// Use the factory
const useUserStore = createResourceStore<User>('users');
const useProductStore = createResourceStore<Product>('products');
```

## Discriminated Unions

Use discriminated unions for complex state:

```typescript
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

interface TodoState {
  todos: RequestState<Todo[]>;
}

const useTodos = createStore<TodoState>({
  todos: { status: 'idle' }
})
.actions({
  fetchTodos: async (state, actions) => {
    actions.updatePartial({ todos: { status: 'loading' } });

    try {
      const data = await api.getTodos();
      return {
        todos: { status: 'success' as const, data }
      };
    } catch (error) {
      return {
        todos: {
          status: 'error' as const,
          error: error.message
        }
      };
    }
  }
});

function TodoList() {
  const [{ todos }] = useTodos();

  // TypeScript narrows the type based on status
  if (todos.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (todos.status === 'error') {
    return <div>Error: {todos.error}</div>; // ✅ error is available
  }

  if (todos.status === 'success') {
    return (
      <ul>
        {todos.data.map(todo => ( // ✅ data is available
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    );
  }

  return null;
}
```

## Utility Types

Extract types from your stores:

```typescript
import type { StoreState, StoreActions } from 'vibestate';

const useCounter = createStore({ count: 0 })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
  });

// Extract state type
type CounterState = StoreState<typeof useCounter>;
// { count: number }

// Extract actions type
type CounterActions = StoreActions<typeof useCounter>;
// { increment: () => void }

// Use in props
interface CounterProps {
  state: CounterState;
  actions: CounterActions;
}
```

## Strict Mode

Enable strict TypeScript for maximum safety:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

## Type Guards

Use type guards with discriminated unions:

```typescript
type ApiState<T> =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; data: T }
  | { type: 'error'; error: Error };

function isSuccess<T>(state: ApiState<T>): state is { type: 'success'; data: T } {
  return state.type === 'success';
}

function isError<T>(state: ApiState<T>): state is { type: 'error'; error: Error } {
  return state.type === 'error';
}

const useStore = createStore({
  apiState: { type: 'idle' } as ApiState<User>
});

function Component() {
  const [{ apiState }] = useStore();

  if (isSuccess(apiState)) {
    return <div>{apiState.data.name}</div>; // ✅ data is typed
  }

  if (isError(apiState)) {
    return <div>{apiState.error.message}</div>; // ✅ error is typed
  }

  return null;
}
```

## Best Practices

### 1. Define Interfaces

Define clear interfaces for your state:

```typescript
// ✅ Good - explicit interface
interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

const useAppStore = createStore<AppState>({
  user: null,
  theme: 'light',
  notifications: []
});
```

### 2. Type Complex Objects

Use type assertions for complex initializations:

```typescript
interface User {
  id: number;
  name: string;
  preferences: {
    theme: string;
    language: string;
  };
}

const useStore = createStore({
  // Type assertion for empty array
  users: [] as User[],

  // Type assertion for null
  currentUser: null as User | null,
});
```

### 3. Avoid `any`

Never use `any` - use `unknown` instead:

```typescript
// ❌ Bad - any defeats type safety
const useStore = createStore({
  data: null as any
});

// ✅ Good - unknown is type-safe
const useStore = createStore({
  data: null as unknown
});

// Better - specific type
const useStore = createStore({
  data: null as User | null
});
```

### 4. Use Const Assertions

Use const assertions for literal types:

```typescript
const useStore = createStore({
  status: 'idle' as const, // Type: 'idle'
  // vs
  status: 'idle' as string, // Type: string
});
```

## Common Patterns

### Readonly State

Make state readonly to prevent mutations:

```typescript
import type { Readonly } from 'vibestate';

const useStore = createStore<Readonly<AppState>>({
  // State is readonly
});
```

### Partial Updates

Type partial state updates:

```typescript
interface AppState {
  user: User;
  settings: Settings;
  cache: Cache;
}

const useStore = createStore<AppState>({ /* ... */ })
  .actions({
    // Partial update - only some fields
    updateUser: (state, updates: Partial<User>) => ({
      user: { ...state.user, ...updates }
    })
  });
```

### Branded Types

Use branded types for IDs:

```typescript
type UserId = number & { __brand: 'UserId' };
type PostId = number & { __brand: 'PostId' };

interface AppState {
  currentUserId: UserId | null;
  currentPostId: PostId | null;
}

const useStore = createStore<AppState>({
  currentUserId: null,
  currentPostId: null
})
.actions({
  setUser: (state, id: UserId) => ({ currentUserId: id }),
  setPost: (state, id: PostId) => ({ currentPostId: id }),
});
```

## Troubleshooting

### Type Inference Issues

If types aren't inferred correctly:

```typescript
// Add explicit generic type
const useStore = createStore<MyState>({ /* ... */ });

// Or use type assertion
const useStore = createStore({
  items: [] as MyItem[]
});
```

### Action Parameter Types

Specify parameter types explicitly:

```typescript
.actions({
  // ✅ Explicit parameter types
  updateUser: (state, id: number, name: string) => ({
    user: { id, name }
  })
})
```

## Next Steps

- [Creating Stores](/guides/creating-stores) - Advanced store patterns
- [Using State](/guides/using-state) - Best practices
- [API Reference](/reference/create-store) - Full API documentation
- [Examples](/examples/counter) - Typed examples
