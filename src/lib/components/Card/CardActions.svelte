<script lang="ts">
	let klass = '';
	export { klass as class };
	export let style: string | undefined | null = null;
</script>

<div class="s-card-actions {klass}" {style}>
	<slot />
</div>

<style lang="scss" src="./CardActions.scss" global>
</style>
