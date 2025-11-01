---
title: Installation
description: How to install and set up Vibe State in your project
---

## Requirements

Vibe State requires:
- **React** 16.8+ (for hooks support)
- **Node.js** 14+
- Modern JavaScript bundler (Vite, webpack, etc.)

## Package Manager

Install Vibe State using your preferred package manager:

```bash
# npm
npm install vibestate

# yarn
yarn add vibestate

# pnpm
pnpm add vibestate

# bun
bun add vibestate
```

## TypeScript

Vibe State is written in TypeScript and includes type definitions out of the box. No additional @types packages needed!

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true
  }
}
```

## Framework Support

### React (Primary)

Vibe State is built for React and works great with:
- ✅ Create React App
- ✅ Next.js
- ✅ Vite
- ✅ Remix
- ✅ Gatsby

### Next.js Setup

For Next.js 13+ with App Router, mark store files with 'use client':

```jsx
'use client';

import { createStore } from 'vibestate';

export const useAppStore = createStore({ ... });
```

### Vite Setup

Vite works out of the box with no additional configuration:

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

## DevTools (Optional)

Install the Redux DevTools extension for time-travel debugging:

- [Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/)
- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

Vibe State automatically connects to DevTools when available. No additional setup required!

## Verification

Verify your installation by creating a simple store:

```jsx
import { createStore } from 'vibestate';

const useTest = createStore({ message: 'Vibe State is installed!' });

function App() {
  const [state] = useTest();
  return <h1>{state.message}</h1>;
}
```

If you see "Vibe State is installed!" on your screen, you're all set! 🎉

## Troubleshooting

### Module not found

If you get "Module not found" errors:

```bash
# Clear your node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### React hooks error

If you see "Invalid hook call" errors, ensure:
- You're using React 16.8 or later
- You only have one copy of React installed
- You're calling hooks at the top level of components

```bash
# Check for duplicate React installations
npm ls react
```

## Next Steps

Now that Vibe State is installed, learn how to use it:

- [Quick Start](/getting-started/quick-start) - Build your first store
- [Core Concepts](/getting-started/concepts) - Understand the fundamentals
- [API Reference](/reference/create-store) - Explore the full API
