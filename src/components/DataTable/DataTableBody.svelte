<script lang="ts">
	let klass = '';
	export { klass as class };
	export let style: string | undefined;
	export let offsetHeight: number;
	export let tbody: HTMLTableSectionElement;
</script>

<tbody bind:this={tbody} bind:offsetHeight {style} class="s-tbl-body {klass}">
	<slot />
</tbody>

<style lang="scss" src="./DataTableBody.scss" global>
</style>
