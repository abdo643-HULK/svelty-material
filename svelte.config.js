import preprocess from 'svelte-preprocess';

export default preprocess({
	// You can restrict which files are compiled
	// using `include` and `exclude`
	include: 'src/components/**/*.svelte',
	// Emit CSS as "files" for other plugins to process. default is true
	emitCss: false,

	onwarn: (warning, handler) => {
		// let Rollup handle all other warnings normally
		handler(warning);
	},

	// You can pass any of the Svelte compiler options
	compilerOptions: {
		// By default, the client-side compiler is used. You
		// can also use the server-side rendering compiler
		generate: 'ssr',

		// ensure that extra attributes are added to head
		// elements for hydration (used with generate: 'ssr')
		hydratable: true,

		// You can optionally set 'customElement' to 'true' to compile
		// your components to custom elements (aka web elements)
		customElement: false
	}
});
