import packageJson from './package.json';
import esbuild from 'rollup-plugin-esbuild';
import typescript from '@rollup/plugin-typescript';

const globals = {
	// ...packageJson.dependencies,
	...packageJson.devDependencies
};

/** @type {import('rollup').RollupOptions} */
const baseConfig = {
	input: ['src/**/*.ts'],
	output: {
		dir: 'dist',
		sourcemap: true
	},
	plugins: [
		esbuild(),
		typescript({
			emitDeclarationOnly: true,
			sourceMap: false
		})
	],
	external: [...Object.keys(globals)]
};

/** @type {Array.<import('rollup').RollupOptions>} */
export default [
	{
		...baseConfig,
		output: {
			...baseConfig.output,
			format: 'cjs'
		},
		plugins: [...baseConfig.plugins] //, multiInput()
	},
	{
		...baseConfig,
		output: {
			...baseConfig.output,
			format: 'esm'
		},
		plugins: [
			...baseConfig.plugins
			// multiInput({
			// 	/** @param {string} output */
			// 	transformOutputPath: (output) =>
			// 		`${output.split('.').slice(0, -1).join('.')}.esm.${output.split('.').slice(-1)}`
			// })
		]
	}
];
