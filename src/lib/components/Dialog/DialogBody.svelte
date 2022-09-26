<script context="module" lang="ts">
	import { browser } from '$app/environment';
	import { scale, fade } from 'svelte/transition';

	import { AlignItems } from '$lib/@types';
	import { modal } from './actions';

	import type { TransitionFn } from '$lib/@types';

	function setTransition(mq: MediaQueryList, transition: TransitionFn | undefined) {
		if (transition !== undefined) return transition;
		return mq.matches ? scale : fade;
	}

	const defaultConfig = { duration: 600, start: 0.1 };
</script>

<script lang="ts">
	let klass = '';
	export { klass as class };
	export let active = false;

	export let role: 'dialog' | 'alert' | 'alertdialog' | 'document' = 'dialog';

	export let ariaLabel: string | undefined = undefined;
	export let ariaLabelledBy: string | undefined = undefined;
	export let ariaDescribedBy: string | undefined = undefined;

	export let dialog: HTMLDivElement | undefined = undefined;

	export let preventScroll = true;
	export let alignItems: AlignItems | '' = '';
	export let scrollPadding = '';

	export let inTransition: TransitionFn = scale;
	export let outTransition: TransitionFn = scale;
	export let inTransitionConfig = defaultConfig;
	export let outTransitionConfig = defaultConfig;

	let _inTransition: TransitionFn;
	let _outTransition: TransitionFn;

	$: if (browser) {
		const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: no-preference)');
		_inTransition = setTransition(reducedMotionMq, inTransition);
		_outTransition = setTransition(reducedMotionMq, outTransition);
	}

	$: _alignItems = alignItems as string;
</script>

{#if active}
	<!-- 
	Without this container we wouldn't be able to 
	use display flex to center and also support overflow
	-->
	<div
		bind:this={dialog}
		class="s-dialog {klass}"
		aria-modal="true"
		aria-hidden={!active}
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledBy}
		aria-describedby={ariaDescribedBy}
		style:--s-dialog-align-items={_alignItems}
		tabindex="-1"
		{role}
		{...$$restProps}
		use:modal={{
			preventScroll,
			scrollPadding,
		}}
		in:_inTransition={inTransitionConfig}
		out:_outTransition={outTransitionConfig}
		on:introstart
		on:introend
		on:outrostart
		on:outroend
	>
		<slot />
	</div>
{/if}
