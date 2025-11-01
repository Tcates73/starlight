---
title: Todo List
description: Build a feature-rich todo app with Vibe State
---

A todo list demonstrates real-world state management with filtering, computed values, and complex actions.

## The Store

Create a todos store with full CRUD operations:

```jsx
// stores/todos.js
import { createStore } from 'vibestate';

export const useTodos = createStore({
  todos: [],
  filter: 'all', // 'all' | 'active' | 'completed'
  nextId: 1
})
.actions({
  addTodo: (state, text) => ({
    todos: [
      ...state.todos,
      {
        id: state.nextId,
        text,
        completed: false,
        createdAt: Date.now()
      }
    ],
    nextId: state.nextId + 1
  }),

  toggleTodo: (state, id) => ({
    todos: state.todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  }),

  deleteTodo: (state, id) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }),

  editTodo: (state, id, text) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    )
  }),

  setFilter: (state, filter) => ({ filter }),

  clearCompleted: (state) => ({
    todos: state.todos.filter(todo => !todo.completed)
  }),

  toggleAll: (state) => {
    const allCompleted = state.todos.every(t => t.completed);
    return {
      todos: state.todos.map(todo => ({
        ...todo,
        completed: !allCompleted
      }))
    };
  }
})
.computed({
  visibleTodos: (state) => {
    if (state.filter === 'active') {
      return state.todos.filter(t => !t.completed);
    }
    if (state.filter === 'completed') {
      return state.todos.filter(t => t.completed);
    }
    return state.todos;
  },

  activeCount: (state) =>
    state.todos.filter(t => !t.completed).length,

  completedCount: (state) =>
    state.todos.filter(t => t.completed).length,

  allCompleted: (state) =>
    state.todos.length > 0 && state.todos.every(t => t.completed),
})
.persist({
  key: 'vibestate-todos',
  storage: localStorage,
  exclude: ['filter'] // Don't persist filter
});
```

## Add Todo Form

Component to add new todos:

```jsx
// AddTodo.jsx
import { useState } from 'react';
import { useTodos } from './stores/todos';

function AddTodo() {
  const [text, setText] = useState('');
  const [, { addTodo }] = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;
```

## Todo List Component

Display filtered todos:

```jsx
// TodoList.jsx
import { useTodos } from './stores/todos';
import TodoItem from './TodoItem';

function TodoList() {
  const [{ visibleTodos }] = useTodos();

  if (visibleTodos.length === 0) {
    return <p className="empty">No todos to show</p>;
  }

  return (
    <ul className="todo-list">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
```

## Todo Item Component

Individual todo with edit/delete:

```jsx
// TodoItem.jsx
import { useState } from 'react';
import { useTodos } from './stores/todos';

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [, { toggleTodo, deleteTodo, editTodo }] = useTodos();

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <li className="editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </li>
    );
  }

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </label>
        <button onClick={() => deleteTodo(todo.id)}>×</button>
      </div>
    </li>
  );
}

export default TodoItem;
```

## Filter Controls

Toggle between views:

```jsx
// TodoFilters.jsx
import { useTodos } from './stores/todos';

function TodoFilters() {
  const [{ filter, activeCount, completedCount }, { setFilter, clearCompleted }] = useTodos();

  return (
    <div className="filters">
      <span className="count">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {completedCount > 0 && (
        <button onClick={clearCompleted}>
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}

export default TodoFilters;
```

## Toggle All

Button to toggle all todos:

```jsx
// TodoHeader.jsx
import { useTodos } from './stores/todos';

function TodoHeader() {
  const [{ todos, allCompleted }, { toggleAll }] = useTodos();

  if (todos.length === 0) return null;

  return (
    <div className="header">
      <input
        type="checkbox"
        checked={allCompleted}
        onChange={toggleAll}
      />
      <label>Mark all as {allCompleted ? 'active' : 'complete'}</label>
    </div>
  );
}

export default TodoHeader;
```

## Full App

Put it all together:

```jsx
// App.jsx
import AddTodo from './AddTodo';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';

function App() {
  return (
    <div className="todo-app">
      <h1>todos</h1>

      <AddTodo />
      <TodoHeader />
      <TodoList />
      <TodoFilters />
    </div>
  );
}

export default App;
```

## Advanced: Categories

Add categories to todos:

```jsx
export const useTodos = createStore({
  todos: [],
  categories: ['personal', 'work', 'shopping'],
  selectedCategory: null, // null = all categories
  filter: 'all'
})
.actions({
  addTodo: (state, text, category = 'personal') => ({
    todos: [
      ...state.todos,
      {
        id: state.nextId,
        text,
        category,
        completed: false,
        createdAt: Date.now()
      }
    ],
    nextId: state.nextId + 1
  }),

  setCategory: (state, category) => ({ selectedCategory: category }),

  addCategory: (state, category) => ({
    categories: [...state.categories, category]
  }),
})
.computed({
  visibleTodos: (state) => {
    let filtered = state.todos;

    // Filter by category
    if (state.selectedCategory) {
      filtered = filtered.filter(t => t.category === state.selectedCategory);
    }

    // Filter by completion status
    if (state.filter === 'active') {
      filtered = filtered.filter(t => !t.completed);
    } else if (state.filter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    return filtered;
  },

  todosByCategory: (state) => {
    return state.categories.reduce((acc, category) => {
      acc[category] = state.todos.filter(t => t.category === category);
      return acc;
    }, {});
  }
});
```

## Advanced: Due Dates

Add due dates with sorting:

```jsx
.actions({
  addTodo: (state, text, dueDate = null) => ({
    todos: [
      ...state.todos,
      {
        id: state.nextId,
        text,
        completed: false,
        dueDate,
        createdAt: Date.now()
      }
    ],
    nextId: state.nextId + 1
  }),

  setDueDate: (state, id, dueDate) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, dueDate } : todo
    )
  })
})
.computed({
  overdueTodos: (state) => {
    const now = Date.now();
    return state.todos.filter(t =>
      !t.completed && t.dueDate && t.dueDate < now
    );
  },

  todayTodos: (state) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const tomorrow = today + 86400000;

    return state.todos.filter(t =>
      !t.completed &&
      t.dueDate &&
      t.dueDate >= today &&
      t.dueDate < tomorrow
    );
  },

  sortedTodos: (state) => {
    return [...state.todos].sort((a, b) => {
      // Completed todos go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Sort by due date
      if (a.dueDate && b.dueDate) {
        return a.dueDate - b.dueDate;
      }

      // Todos with due dates come first
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;

      // Sort by creation date
      return b.createdAt - a.createdAt;
    });
  }
});
```

## Try It Yourself

Enhance this example:

1. Add priority levels (high, medium, low)
2. Add tags/labels to todos
3. Add search/filter by text
4. Add undo/redo functionality
5. Add drag-and-drop reordering
6. Add subtasks
7. Export/import todos as JSON

## Next Steps

- [Shopping Cart Example](/examples/cart) - E-commerce state
- [Creating Stores](/guides/creating-stores) - Advanced patterns
- [TypeScript Guide](/guides/typescript) - Type-safe todos
