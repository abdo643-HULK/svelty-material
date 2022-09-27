<script lang="ts">
	import { fade, type FadeParams } from 'svelte/transition';

	import type { TransitionConfig } from 'svelte/transition';

	type T = $$Generic;

	type TransitionFn = <T>(node: HTMLDivElement, options: T) => TransitionConfig;

	let klass = '';
	export { klass as class };
	export let style = '';

	export let overlay: HTMLDivElement | undefined = undefined;
	export let transition: TransitionFn = <TransitionFn>fade;
	export let inOpts: T = <T>({ duration: 250 } as FadeParams);
	export let outOpts: T = <T>({ duration: 250 } as FadeParams);
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
