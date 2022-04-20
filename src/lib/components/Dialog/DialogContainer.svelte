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
>
	<slot />
</div>

<style lang="scss" src="./Dialog.scss" global>
</style>
