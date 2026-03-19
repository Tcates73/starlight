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
					items: [
						{ label: 'Email Templates', slug: 'guides/templates' },
						{ label: 'Webhooks', slug: 'guides/webhooks' },
						{ label: 'Analytics & Tracking', slug: 'guides/analytics' },
						{ label: 'Domain Setup', slug: 'guides/domains' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Send Email', slug: 'reference/send' },
						{ label: 'Templates', slug: 'reference/templates' },
						{ label: 'Webhooks', slug: 'reference/webhooks' },
					],
				},
				{
					label: 'SDKs',
					items: [
						{ label: 'Node.js', slug: 'sdks/nodejs' },
						{ label: 'Python', slug: 'sdks/python' },
						{ label: 'PHP', slug: 'sdks/php' },
					],
				},
			],
		}),
	],
});
