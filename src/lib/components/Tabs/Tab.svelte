<script lang="ts">
	import Class from '../../internal/Class/index.js';
	import Ripple from '../../actions/Ripple/index.js';

	import { getContext, onMount } from 'svelte';
	import { SLIDE_GROUP } from '../SlideGroup/SlideGroup.svelte';
	import { ITEM_GROUP } from '../ItemGroup/ItemGroup.svelte';
	import { TABS } from './Tabs.svelte';

	import type { ItemGroup } from '../ItemGroup/ItemGroup.svelte';
	import type { SlideGroup } from '../SlideGroup/SlideGroup.svelte';

	let tab: HTMLButtonElement;

	const click = getContext<SlideGroup>(SLIDE_GROUP);
	const ITEM = getContext<ItemGroup>(ITEM_GROUP);
	const { ripple, registerTab } = getContext<{
		ripple: Record<any, any>;
		registerTab(tab: HTMLElement): void;
	}>(TABS);

	let klass = '';
	export { klass as class };
	export let value = ITEM.index();
	export let activeClass = ITEM.activeClass;
	export let disabled = false;

	let active: boolean;

	ITEM.register(values => {
		active = values.includes(value);
	});

	function selectTab({ target }: Event) {
		if (disabled) return;
		click(target as HTMLElement);
	}

	onMount(() => {
		registerTab(tab);
	});
</script>

<button
	bind:this={tab}
	class="s-tab s-slide-item {klass}"
	role="tab"
	aria-selected={active}
	tabindex={disabled ? -1 : 0}
	class:disabled
	class:active
	use:Class={[active ? activeClass : '']}
	on:click={selectTab}
	on:click
	use:Ripple={ripple}
>
	<slot />
</button>

<style lang="scss" src="./Tab.scss" global>
</style>
