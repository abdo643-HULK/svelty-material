<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount, setContext, createEventDispatcher } from 'svelte';
	import ClickOutside from '../../actions/ClickOutside';

	let klass = '';
	export { klass as class };
	export let active = false;
	export let absolute = false;
	export let transition = fade;
	export let inOpts = { duration: 250 };
	export let outOpts = { duration: 200 };
	export let offsetX = false;
	export let offsetY = true;
	export let nudgeX = 0;
	export let nudgeY = 0;
	export let openOnClick = true;
	export let hover = false;
	export let closeOnClickOutside = true;
	export let closeOnClick = true;
	export let bottom = false;
	export let right = false;
	export let tile = false;
	export let disabled = false;
	export let index = 8;
	export let style = '';

	let origin = 'top left';
	let position: string;
	let wrapper: HTMLDivElement;
	const dispatch = createEventDispatcher();
	const align = { x: right ? 'right' : 'left', y: bottom ? 'bottom' : 'top' };

	setContext('S_ListItemRole', 'menuitem');
	setContext('S_ListItemRipple', true);

	// For opening the menu
	function open(posX = 0, posY = 0) {
		active = true;
		const rect = wrapper.getBoundingClientRect();
		let x = nudgeX;
		let y = nudgeY;
		if (absolute) {
			x += posX;
			y += posY;
		} else {
			if (offsetX) x += rect.width;
			if (offsetY) y += rect.height;
		}

		position = `${align.y}:${y}px;${align.x}:${x}px`;
		origin = `${align.y} ${align.x}`;
		/**
		 * Event when menu is opened.
		 * @returns Nothing
		 */
		dispatch('open');
	}

	// For closing the menu.
	function close() {
		active = false;
		/**
		 * Event when menu is closed.
		 * @returns Nothing
		 */
		dispatch('close');
	}

	// When the activator slot is clicked.
	function triggerClick(e: MouseEvent) {
		if (!disabled) {
			if (active) {
				close();
			} else if (openOnClick) {
				open(e.offsetX, e.offsetY);
			}
		}
	}

	// When the menu itself is clicked.
	function menuClick() {
		if (active && closeOnClick) close();
	}

	// When user clicked somewhere outside the menu.
	function clickOutsideMenu() {
		if (active && closeOnClickOutside) close();
	}

	onMount(() => {
		const trigger = wrapper.querySelector<HTMLElement>("[slot='activator']");
		// Opening the menu if active is set to true.
		if (active) open();

		trigger?.addEventListener('click', triggerClick, { passive: true });

		const tmpOpen = () => open();

		if (hover) {
			wrapper.addEventListener('mouseenter', tmpOpen, { passive: true });
			wrapper.addEventListener('mouseleave', close, { passive: true });
		}

		return () => {
			// passing the same options is better because of the
			// different browser behaviour, but ts doesn't care
			//@ts-ignore
			trigger?.removeEventListener('click', triggerClick, { passive: true });
			if (hover) {
				//@ts-ignore
				wrapper.removeEventListener('mouseenter', tmpOpen, { passive: true });
				//@ts-ignore
				wrapper.removeEventListener('mouseleave', close, { passive: true });
			}
		};
	});
</script>

<div
	class="s-menu__wrapper"
	bind:this={wrapper}
	use:ClickOutside
	on:clickOutside={clickOutsideMenu}
>
	<!-- Slot for the trigger/activator. -->
	<slot name="activator" />

	{#if active}
		<div
			class="s-menu {klass}"
			role="menu"
			class:tile
			on:click={menuClick}
			in:transition={inOpts}
			out:transition={outOpts}
			style="{position};transform-origin:{origin};z-index:{index};{style}"
		>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss" src="./Menu.scss" global>
</style>
