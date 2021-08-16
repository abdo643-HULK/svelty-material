import preprocess from 'svelte-preprocess';

export default {
	preprocess: preprocess({
		defaults: {
			script: 'typescript',
			style: 'scss'
		},
		scss: {
			includePaths: ['src/styles', 'node_modules']
		}
	})
};
