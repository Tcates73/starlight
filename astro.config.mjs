// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Vibe State',
			tagline: 'State management that just vibes with your code',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/vibestate/vibestate' },
				{ icon: 'twitter', label: 'Twitter', href: 'https://twitter.com/vibestate' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Core Concepts', slug: 'getting-started/concepts' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Creating Stores', slug: 'guides/creating-stores' },
						{ label: 'Using State', slug: 'guides/using-state' },
						{ label: 'TypeScript', slug: 'guides/typescript' },
						{ label: 'DevTools', slug: 'guides/devtools' },
					],
				},
				{
					label: 'API Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Examples',
					items: [
						{ label: 'Counter App', slug: 'examples/counter' },
						{ label: 'Todo List', slug: 'examples/todo' },
						{ label: 'Shopping Cart', slug: 'examples/cart' },
					],
				},
			],
		}),
	],
});
