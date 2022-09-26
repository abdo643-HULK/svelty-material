<script lang="ts">
	import Icon from '../Icon';
	import Ripple from '../../actions/Ripple';
	import closeIcon from '../../internal/Icons/close';

	import { createEventDispatcher } from 'svelte';

	import { dev } from '$app/environment';

	// Classes to add to chip.
	let klass = '';
	export { klass as class };

	// Determines whether the chip is visible or not.
	export let active = true;

	export let as: 'a' | 'span' | 'button' = 'span';

	// Selected state
	export let selected = false;
	/**
	 * should only be used if as is a link
	 */
	export let href: string | undefined = undefined;
	export let style: string | undefined = undefined;

	type Size = 'x-small' | 'small' | 'default' | 'large' | 'x-large';

	/**
	 * Specifies the size of chip.
	 */
	export let size: Size = 'default';
	export let outlined = false;
	export let pill = false;
	export let link = false;
	export let label = false;
	export let close = false;

	if (dev) {
		if (href !== undefined && as !== 'a')
			console.warn(
				`Chip Component: href should only be used with " as='a' " but was passed: ${as}`,
			);
	}

	const dispatch = createEventDispatcher();

	function onClose(e: MouseEvent) {
		active = false;
		dispatch('close', e);
	}
</script>

{#if active}
	<svelte:element
		this={as}
		class="s-chip {klass} size-{size}"
		use:Ripple={link}
		class:outlined
		class:pill
		class:link
		class:label
		class:selected
		{href}
		{style}
		on:click
		{...$$restProps}
	>
		<slot />
		{#if close}
			<div class="s-chip__close" on:click={onClose}>
				<slot name="close-icon">
					<Icon path={closeIcon} />
				</slot>
			</div>
		{/if}
	</svelte:element>
{/if}

<style lang="scss" src="./Chip.scss" global>
</style>
