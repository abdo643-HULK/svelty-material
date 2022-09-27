<script lang="ts">
	let klass = '';
	export { klass as class };
</script>

<div class="s-tbl {klass}">
	<table>
		<slot />
	</table>
</div>

<style lang="scss" src="./DataTable.scss" global>
</style>
