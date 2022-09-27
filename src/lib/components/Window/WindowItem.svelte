<script lang="ts">
	import { getContext, onMount } from 'svelte';

	import { WINDOW } from './Window.svelte';

	let klass = '';
	export { klass as class };
	export let style: string | undefined = undefined;

	let window: HTMLDivElement;
	const registerWindow: Function = getContext(WINDOW);

	onMount(() => {
		registerWindow(window);
	});
</script>

<div bind:this={window} class="s-window-item {klass}" {style}>
	<slot />
</div>

<style lang="scss" src="./WindowItem.scss" global>
</style>
