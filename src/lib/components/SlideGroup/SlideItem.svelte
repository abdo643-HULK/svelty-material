<script>
	import Class from '../../internal/Class';

	import { getContext } from 'svelte';
	import { SLIDE_GROUP } from './SlideGroup.svelte';
	import { ITEM_GROUP } from '../ItemGroup/ItemGroup.svelte';

	import type { ItemGroup } from '../ItemGroup/ItemGroup.svelte';
	import type { SlideGroup } from './SlideGroup.svelte';

	const moveGroup = getContext<SlideGroup>(SLIDE_GROUP);
	const ITEM = getContext<ItemGroup>(ITEM_GROUP);

	let active: boolean;
	let itemElement: HTMLElement;

	let klass = '';
	export { klass as class };
	export let activeClass = ITEM.activeClass;
	export let value = ITEM.index();
	export let disabled: boolean | undefined = undefined;

	ITEM.register(values => {
		active = values.includes(value);
	});

	function selectItem() {
		if (!disabled) {
			moveGroup(itemElement);
			ITEM.select(value);
		}
	}
</script>

<div
	bind:this={itemElement}
	class="s-slide-item {klass}"
	use:Class={[active ? activeClass : '']}
	on:click={selectItem}
>
	<slot {active} />
</div>

<style global>
	.s-slide-item {
		display: inline-flex;
		flex: 0 1 auto;
	}
</style>
