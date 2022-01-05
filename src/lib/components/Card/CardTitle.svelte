<script lang="ts">
	let klass = '';
	export { klass as class };
	export let style: string | undefined = undefined;
	export let itemprop: string | undefined = undefined;
</script>

<div class="s-card-title {klass}" {style} {itemprop}>
	<slot />
</div>

<style lang="scss" src="./CardTitle.scss" global>
</style>
