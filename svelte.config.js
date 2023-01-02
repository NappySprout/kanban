import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
      fallback: 'index.html'
    }),
    prerender: { entries: [] },
		alias: {
			$stores: resolve('./src/stores/store.ts'),
			$movement: resolve('./src/stores/movement.ts'),
			$lib: resolve('./src/lib')
		},
		paths: {
			base:'/kanban',
		},
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
