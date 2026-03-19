// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'SendFlow',
			tagline: 'Powerful transactional email API that just works',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/sendflow/sendflow' },
				{ icon: 'twitter', label: 'Twitter', href: 'https://twitter.com/sendflow' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Authentication', slug: 'getting-started/authentication' },
						{ label: 'Send Your First Email', slug: 'getting-started/first-email' },
					],
				},
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'API Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Examples',
					autogenerate: { directory: 'examples' },
				},
			],
		}),
	],
});
