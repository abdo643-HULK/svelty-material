<script context="module" lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/env';

	import Overlay, { type OverlayProps } from '../Overlay';

	import { modal } from './actions';

	import type { AlignItems, TransitionFn } from '$lib/@types';

	function setTransition(mq: MediaQueryList, transition: TransitionFn | undefined) {
		if (transition !== undefined) return transition;
		return mq.matches ? scale : fade;
	}

	const defaultConfig = { duration: 600, start: 0.1 };
</script>

<script lang="ts">
	interface $$Events {
		'open': () => void;
		'close': () => void;
		'introstart': svelte.JSX.EventHandler<CustomEvent<null>, HTMLDivElement> | null | undefined;
		'outrostart': svelte.JSX.EventHandler<CustomEvent<null>, HTMLDivElement> | null | undefined;
		'introend': svelte.JSX.EventHandler<CustomEvent<null>, HTMLDivElement> | null | undefined;
		'outroend': svelte.JSX.EventHandler<CustomEvent<null>, HTMLDivElement> | null | undefined;
		'overlay-click': () => void;
		'escape': () => void;
	}

	let klass = '';
	export { klass as class };
	export let active = false;
	// export let persistent = false;
	export let fullscreen = false;
	export let inTransition: TransitionFn | undefined;
	export let outTransition: TransitionFn | undefined;
	export let inTransitionConfig = defaultConfig;
	export let outTransitionConfig = defaultConfig;

	export let role: 'dialog' | 'alert' | 'alertdialog' | 'document' = 'dialog';

	export let ariaLabel: string | undefined = undefined;
	export let ariaLabelledBy: string | undefined = undefined;
	export let ariaDescribedBy: string | undefined = undefined;

	export let dialog: HTMLDivElement | undefined = undefined;

	export let dialogContent: HTMLDivElement | undefined = undefined;
	export let dialogContentProps = {};

	export let overlay: HTMLDivElement | undefined = undefined;
	export let overlayProps: OverlayProps<any, any> = {};

	export let container: HTMLDivElement | undefined = undefined;
	export let containerProps = {};

	export let preventScroll = true;
	export let alignItems: AlignItems | '' = '';

	let isOpening = false;
	let isClosing = false;

	const dispatch = createEventDispatcher();

	let _inTransition: TransitionFn;
	let _outTransition: TransitionFn;

	$: if (browser) {
		const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: no-preference)');
		_inTransition = setTransition(reducedMotionMq, inTransition);
		_outTransition = setTransition(reducedMotionMq, outTransition);
	}

	$: _alignItems = alignItems as string;

	let scrollPadding = '';

	if (
		typeof window !== 'undefined' &&
		(document.defaultView || window).innerWidth > document.documentElement.clientWidth
	) {
		scrollPadding = '17px';
	}

	// function close() {
	// 	dispatch('overlay-click');
	// 	if (!persistent) active = false;
	// }
</script>

<div
	bind:this={container}
	class="s-dialog__container"
	class:active
	class:is-opening={isOpening}
	class:is-closing={isClosing}
	{...containerProps}
>
	<Overlay bind:overlay {active} {...overlayProps} on:click={() => dispatch('overlay-click')} />
	<!--
	A dialog can have more than just the "document" role.
	In most situations a "dialog" or "alertdialog" would 
	be a more appropriate role.
	-->
	{#if active}
		<!-- 
		Without this container we wouldn't be able to 
		use display flex to center and also support overflow
		-->
		<div
			bind:this={dialog}
			class="s-dialog"
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
		>
			<div
				bind:this={dialogContent}
				class="s-dialog__content {klass}"
				class:fullscreen
				{...dialogContentProps}
				in:_inTransition={inTransitionConfig}
				out:_outTransition={outTransitionConfig}
				on:introstart={() => {
					isOpening = true;
					dispatch('introstart');
				}}
				on:introend={() => {
					isOpening = false;
					dispatch('introend');
				}}
				on:outrostart={() => {
					isClosing = true;
					dispatch('outrostart');
				}}
				on:outroend={() => {
					isClosing = false;
					dispatch('outroend');
				}}
			>
				<slot />
			</div>
		</div>
	{/if}
</div>

<!-- on:click
		on:dblclick
		on:focus
		on:blur
		on:keyup
		on:keydown
		on:keypress
		on:mouseup
		on:mousedown
		on:mousemove
		on:mouseleave
		on:mouseenter
		on:mouseout
		on:mouseover
		on:drag
		on:dragstart
		on:dragend
		on:dragenter
		on:dragleave
		on:dragover
		on:drop
		on:touchstart
		on:touchmove
		on:touchend
		on:touchcancel
		on:pointerdown
		on:pointerup
		on:pointermove
		on:pointercancel
		on:pointerenter
		on:pointerleave
		on:pointerout
		on:pointerover -->
<style lang="scss" src="./Dialog.scss" global>
</style>
