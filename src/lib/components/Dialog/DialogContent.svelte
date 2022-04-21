<script lang="ts">
	let klass = '';
	export { klass as class };
	export let fullscreen = false;

	export let dialogContent: HTMLDivElement | undefined = undefined;
</script>

<div bind:this={dialogContent} class="s-dialog__content {klass}" class:fullscreen {...$$restProps}>
	<slot />
</div>
