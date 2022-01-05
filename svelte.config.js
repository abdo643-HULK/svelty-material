import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		defaults: {
			markup: 'html',
			script: 'typescript',
			style: 'scss'
		},
		scss: {
			includePaths: ['src/styles', 'node_modules', 'src/theme']
		},
		typescript: {
			tsconfigFile: './tsconfig.json'
		}
	}),
	kit: {
		package: {
			// dir: 'svelte-material-components',
			emitTypes: true,
			// excludes all .d.ts and files starting with _ as the name
			exports: (filepath) => !/^_|\/_|\.d\.ts$/.test(filepath),
			files: (id) => !id.startsWith('site/')
		}
	}
};

export default config;
