<script lang="ts">
	let klass = '';
	export { klass as class };
	export let inset = false;
	export let style: string | undefined | null = null;
</script>

<div class="s-subheader {klass}" class:inset {style}>
	<slot />
</div>

<style lang="scss" src="./Subheader.scss">
</style>
