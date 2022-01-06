<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { TransitionConfig } from 'svelte/transition';

	type T = $$Generic;

	let klass = '';
	export { klass as class };
	export let active = true;
	export let fixed = false;
	export let absolute = false;
	export let right = false;
	export let mini = false;
	export let clipped = false;
	export let borderless = false;
	export let transition: (node: HTMLElement, options: T) => TransitionConfig = fade;
	export let transitionOpts = {} as T;
	export let style: string | undefined | null = null;
</script>

<aside
	class="s-navigation-drawer {klass}"
	transition:transition={transitionOpts}
	on:introstart
	on:outrostart
	on:introend
	on:outroend
	class:active
	class:fixed
	class:absolute
	class:right
	class:mini
	class:clipped
	{style}
>
	<slot name="prepend" />
	<div class="s-navigation-drawer__content">
		<slot />
	</div>
	<slot name="append" />
	{#if !borderless}
		<div class="s-navigation-drawer__border" />
	{/if}
</aside>

<style lang="scss" src="./NavigationDrawer.scss" global>
</style>
