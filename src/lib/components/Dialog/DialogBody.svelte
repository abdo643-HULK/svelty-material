<script lang="ts">
	import { AlignItems } from '$lib/@types';
	import { modal } from './actions';

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
{/if}
