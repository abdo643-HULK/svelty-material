<script lang="ts">
	import { TransitionFn } from '$lib/@types';
	import { scale } from 'svelte/transition';

	let klass = '';
	export { klass as class };
	export let fullscreen = false;
	export let inTransition: TransitionFn = scale;
	export let outTransition: TransitionFn = scale;

	export let dialogContent: HTMLDivElement | undefined = undefined;
</script>

<div
	bind:this={dialogContent}
	class="s-dialog__content {klass}"
	class:fullscreen
	{...$$restProps}
	in:inTransition={{ duration: 500, start: 0.1 }}
	out:outTransition={{ duration: 500, start: 0.1 }}
	on:introstart
	on:introend
	on:outrostart
	on:outroend
	on:click
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
	on:pointerover
>
	<slot />
</div>
