<script lang="ts">
	let klass = '';
	export { klass as class };
	export let style: string | undefined = undefined;
</script>

<div class="s-card-text {klass}" {style}>
	<slot />
</div>

<style lang="scss" src="./CardText.scss" global>
</style>
