---
title: Counter App
description: Build a simple counter with Vibe State
---

A simple counter is the perfect way to learn Vibe State fundamentals. This example covers:

- Creating a basic store
- Defining actions
- Using state in components
- Multiple components sharing state

## The Store

First, create a counter store with state and actions:

```jsx
// stores/counter.js
import { createStore } from 'vibestate';

export const useCounter = createStore({ count: 0 })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
    incrementBy: (state, amount) => ({ count: state.count + amount }),
    reset: () => ({ count: 0 }),
  });
```

## Basic Counter Component

Use the store in a component:

```jsx
// Counter.jsx
import { useCounter } from './stores/counter';

function Counter() {
  const [state, actions] = useCounter();

  return (
    <div className="counter">
      <h1>Count: {state.count}</h1>
      <div className="buttons">
        <button onClick={actions.decrement}>-1</button>
        <button onClick={actions.increment}>+1</button>
        <button onClick={() => actions.incrementBy(5)}>+5</button>
        <button onClick={actions.reset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
```

## Split Components

The power of Vibe State shines when splitting state across components:

```jsx
// CounterDisplay.jsx
import { useCounter } from './stores/counter';

function CounterDisplay() {
  const [{ count }] = useCounter();

  return (
    <div className="display">
      <h1>{count}</h1>
      <p className={count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero'}>
        {count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero'}
      </p>
    </div>
  );
}
```

```jsx
// CounterControls.jsx
import { useCounter } from './stores/counter';

function CounterControls() {
  const [, { increment, decrement, incrementBy, reset }] = useCounter();

  return (
    <div className="controls">
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={() => incrementBy(10)}>+10</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

```jsx
// App.jsx
import CounterDisplay from './CounterDisplay';
import CounterControls from './CounterControls';

function App() {
  return (
    <div className="app">
      <CounterDisplay />
      <CounterControls />
    </div>
  );
}
```

Both components stay in sync automatically!

## With History

Add action history to your counter:

```jsx
export const useCounter = createStore({
  count: 0,
  history: []
})
.actions({
  increment: (state) => ({
    count: state.count + 1,
    history: [...state.history, {
      action: 'increment',
      timestamp: Date.now(),
      value: state.count + 1
    }]
  }),

  decrement: (state) => ({
    count: state.count - 1,
    history: [...state.history, {
      action: 'decrement',
      timestamp: Date.now(),
      value: state.count - 1
    }]
  }),

  reset: (state) => ({
    count: 0,
    history: [...state.history, {
      action: 'reset',
      timestamp: Date.now(),
      value: 0
    }]
  }),

  clearHistory: () => ({ history: [] }),
});
```

Display the history:

```jsx
function CounterHistory() {
  const [{ history }, { clearHistory }] = useCounter();

  return (
    <div className="history">
      <h2>History</h2>
      <button onClick={clearHistory}>Clear History</button>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.action}: {entry.value}
            <small>{new Date(entry.timestamp).toLocaleTimeString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## With Computed Values

Add computed values for insights:

```jsx
export const useCounter = createStore({
  count: 0,
  history: []
})
.actions({
  // ... actions
})
.computed({
  isPositive: (state) => state.count > 0,
  isNegative: (state) => state.count < 0,
  isEven: (state) => state.count % 2 === 0,
  totalActions: (state) => state.history.length,
  averageValue: (state) =>
    state.history.length > 0
      ? state.history.reduce((sum, h) => sum + h.value, 0) / state.history.length
      : 0,
});
```

Use computed values:

```jsx
function CounterStats() {
  const [state] = useCounter();

  return (
    <div className="stats">
      <p>Even: {state.isEven ? 'Yes' : 'No'}</p>
      <p>Sign: {state.isPositive ? '+' : state.isNegative ? '-' : '0'}</p>
      <p>Total Actions: {state.totalActions}</p>
      <p>Average: {state.averageValue.toFixed(2)}</p>
    </div>
  );
}
```

## With Persistence

Persist the counter to localStorage:

```jsx
export const useCounter = createStore({ count: 0 })
  .actions({
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
    reset: () => ({ count: 0 }),
  })
  .persist({
    key: 'counter-app',
    storage: localStorage,
  });
```

Now the count persists across page reloads!

## Full Example

Here's everything together:

```jsx
// stores/counter.js
import { createStore } from 'vibestate';

export const useCounter = createStore({
  count: 0,
  history: []
})
.actions({
  increment: (state) => ({
    count: state.count + 1,
    history: [...state.history, {
      action: 'increment',
      timestamp: Date.now(),
      value: state.count + 1
    }]
  }),
  decrement: (state) => ({
    count: state.count - 1,
    history: [...state.history, {
      action: 'decrement',
      timestamp: Date.now(),
      value: state.count - 1
    }]
  }),
  reset: (state) => ({
    count: 0,
    history: [...state.history, {
      action: 'reset',
      timestamp: Date.now(),
      value: 0
    }]
  }),
  clearHistory: () => ({ history: [] }),
})
.computed({
  isEven: (state) => state.count % 2 === 0,
  totalActions: (state) => state.history.length,
})
.persist({
  key: 'counter-app',
  storage: localStorage,
});

// App.jsx
import { useCounter } from './stores/counter';

function App() {
  const [state, actions] = useCounter();

  return (
    <div className="app">
      <h1>Counter: {state.count}</h1>
      <p>Even: {state.isEven ? 'Yes' : 'No'}</p>

      <div className="controls">
        <button onClick={actions.decrement}>-</button>
        <button onClick={actions.increment}>+</button>
        <button onClick={actions.reset}>Reset</button>
      </div>

      <div className="history">
        <h2>History ({state.totalActions} actions)</h2>
        <button onClick={actions.clearHistory}>Clear</button>
        <ul>
          {state.history.map((entry, i) => (
            <li key={i}>
              {entry.action}: {entry.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
```

## Try It Yourself

Play with this example:

1. Add a "multiply by 2" action
2. Add a computed value for `absoluteValue`
3. Add a max/min counter limit
4. Show the last 5 actions only
5. Add an undo/redo feature

## Next Steps

- [Todo List Example](/examples/todo) - More complex state management
- [Shopping Cart Example](/examples/cart) - Real-world e-commerce state
- [Using State Guide](/guides/using-state) - Best practices
