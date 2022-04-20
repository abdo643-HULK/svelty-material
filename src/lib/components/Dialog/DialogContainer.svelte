<script lang="ts">
	let klass = '';
	export { klass as class };

	export let active: boolean;
	export let isClosing = false;
	export let isOpening = false;
	export let container: HTMLDivElement | undefined = undefined;
</script>

<div
	bind:this={container}
	class="s-dialog__container {klass}"
	class:active
	class:is-opening={isOpening}
	class:is-closing={isClosing}
	{...$$restProps}
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

<style lang="scss" src="./Dialog.scss" global>
</style>
