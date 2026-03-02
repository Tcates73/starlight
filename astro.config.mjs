// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
                                {
                                        label: 'Guides',
                                        items: [
                                                { label: 'Example Guide', slug: 'guides/example' },
                                                {
                                                        label: 'Vibe State Parasite System',
                                                        slug: 'guides/vibe-state-parasite-system',
                                                },
                                                {
                                                        label: 'Google Business Profile Analysis Grader',
                                                        slug: 'guides/google-business-profile-analysis-grader',
                                                },
                                                {
                                                        label: 'Family Budget Dashboard Game',
                                                        slug: 'guides/family-budget-dashboard',
                                                },
                                        ],
                                },
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
