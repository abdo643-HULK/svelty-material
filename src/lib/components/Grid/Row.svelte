<script>
	let klass = '';
	export { klass as class };

	export let dense = false;
	export let noGutters = false;
	export let style: string | null | undefined = null;
</script>

<div class="s-row {klass}" class:dense class:no-gutters={noGutters} {style}>
	<slot />
</div>

<style lang="scss" src="./Row.scss" global>
</style>
