<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { TransitionConfig } from 'svelte/transition';

	type T = $$Generic;

	let klass = '';
	export { klass as class };
	export let style = '';

	export let overlay: HTMLDivElement | undefined = undefined;
	export let transition: <T>(node: HTMLDivElement, options: T) => TransitionConfig = fade;
	export let inOpts: T = { duration: 250 } as unknown as T;
	export let outOpts: T = { duration: 250 } as unknown as T;
	export let active = true;
	export let absolute = false;
</script>

{#if active}
	<div
		bind:this={overlay}
		class="s-overlay {klass}"
		class:absolute
		in:transition={inOpts}
		out:transition={outOpts}
		on:click
		{style}
		{...$$restProps}
	>
		<div class="s-overlay__scrim" />
		<div class="s-overlay__content">
			<slot />
		</div>
	</div>
{/if}

<style lang="scss" src="./Overlay.scss">
</style>
