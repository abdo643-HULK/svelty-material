<script lang="ts">
	import { scale } from 'svelte/transition';
	// import Style from '../../internal/Style';

	let klass = '';
	export { klass as class };
	export let value = '';
	export let active = true;
	export let bordered = false;
	export let dot = false;
	export let tile = false;
	export let blockEnd = false;
	export let inlineStart = false;
	export let label = 'Badge';
	export let transition = scale;
</script>

<span class="s-badge">
	<slot />
	<span class="s-badge__wrapper">
		{#if active}
			<span
				class="s-badge__badge {klass}"
				transition:transition
				on:introstart
				on:outrostart
				on:introend
				on:outroend
				class:bordered
				class:dot
				class:tile
				class:block-end={blockEnd}
				class:inline-start={inlineStart}
				role="status"
				aria-label={label}
				aria-live="polite"
				aria-atomic="true"
			>
				<slot name="badge">{value}</slot>
			</span>
		{/if}
	</span>
</span>

<!-- use:Style={{ 'badge-offset-x': offsetX, 'badge-offset-y': offsetY }} -->
<style lang="scss" src="./Badge.scss" global>
</style>
