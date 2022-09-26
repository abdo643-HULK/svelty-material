<script lang="ts">
	let klass = '';
	export { klass as class };
	export let dense = false;
	export let fixedHeader = false;
	export let style: string | null | undefined = null;
</script>

<div class="s-table__wrapper {klass}" {style}>
	<table class="s-table" class:dense class:fixed-header={fixedHeader}>
		<slot />
	</table>
</div>

<style lang="scss" src="./Table.scss" global>
</style>
