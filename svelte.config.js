import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			includePaths: ['src/theme'],
		},
		typescript: {
			tsconfigFile: './tsconfig.json',
		},
	}),
	package: {
		// dir: 'svelte-material-components',
		// excludes all .d.ts and files starting with _ as the name
		files: id => !id.startsWith('site/'),
	},
};

export default config;
