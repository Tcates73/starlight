---
title: Quick Start
description: Get up and running with Vibe State in 5 minutes
---

Get started with Vibe State in just a few minutes. This guide will walk you through installing and using Vibe State in your React application.

## Installation

Install Vibe State using your preferred package manager:

```bash
npm install vibestate
# or
yarn add vibestate
# or
pnpm add vibestate
```

## Your First Store

Create a simple counter store to get a feel for Vibe State:

```jsx
import { createStore } from 'vibestate';

// Create a store with initial state
const useCounter = createStore({ count: 0 })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
    reset: () => ({ count: 0 }),
  });

export default useCounter;
```

## Use it in a Component

Now use your store in any React component:

```jsx
import useCounter from './stores/counter';

function Counter() {
  const [state, actions] = useCounter();

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={actions.increment}>Increment</button>
      <button onClick={actions.decrement}>Decrement</button>
      <button onClick={actions.reset}>Reset</button>
    </div>
  );
}

export default Counter;
```

That's it! Your counter will work across your entire app. Any component that uses `useCounter()` will stay in sync automatically.

## Multiple Components

The magic happens when you use the same store in multiple components:

```jsx
// Display component
function CounterDisplay() {
  const [state] = useCounter();
  return <h2>Current count: {state.count}</h2>;
}

// Controls component
function CounterControls() {
  const [, actions] = useCounter();
  return (
    <div>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}

// Parent component
function App() {
  return (
    <div>
      <CounterDisplay />
      <CounterControls />
    </div>
  );
}
```

Both components share the same state automatically. When one updates, the other re-renders. No Context, no prop drilling, no complexity.

## Next Steps

- Learn about [Core Concepts](/getting-started/concepts) to understand how Vibe State works
- Explore [Creating Stores](/guides/creating-stores) for advanced patterns
- Check out [TypeScript](/guides/typescript) support for type-safe state management
- Browse [Examples](/examples/counter) to see real-world use cases

Ready to vibe? Let's build something amazing! ✨
