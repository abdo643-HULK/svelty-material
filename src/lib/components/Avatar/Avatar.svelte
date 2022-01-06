<script lang="ts">
	import Style from '../../internal/Style';

	let klass = '';
	export { klass as class };
	export let size = 48;
	export let tile = false;
	export let style: string | null | undefined = null;
</script>

<div class="s-avatar {klass}" class:tile use:Style={{ 'avatar-size': size }} {style}>
	<slot />
</div>

<style lang="scss" src="./Avatar.scss" global>
</style>
