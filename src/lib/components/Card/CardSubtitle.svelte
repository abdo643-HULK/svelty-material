<script lang="ts">
	let klass = '';
	export { klass as class };
	export let style: string | undefined | null = null;
</script>

<div class="s-card-subtitle {klass}" {style}>
	<slot />
</div>

<style lang="scss" src="./CardSubtitle.scss" global>
</style>
