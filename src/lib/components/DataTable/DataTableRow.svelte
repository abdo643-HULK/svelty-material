<script lang="ts">
	let klass = '';
	export { klass as class };
	export let index: number | undefined = undefined;
</script>

<tr data-index={index} class="s-tbl-row {klass}">
	<slot />
</tr>
