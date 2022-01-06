<script lang="ts">
	let klass = '';
	export { klass as class };
	export let absolute = false;
	export let fixed = false;
	export let inset = false;
	export let padless = false;
	export let style: string | null | undefined = null;
</script>

<footer class="s-footer {klass}" class:absolute class:fixed class:inset class:padless {style}>
	<slot />
</footer>

<style lang="scss" src="./Footer.scss" global>
</style>
