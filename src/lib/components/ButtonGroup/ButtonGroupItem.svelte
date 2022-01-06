<script lang="ts">
	import Button from '../Button';

	import { getContext } from 'svelte';
	import { ITEM_GROUP } from '../ItemGroup/ItemGroup.svelte';

	import type { ItemGroup } from '../ItemGroup/ItemGroup.svelte';

	const ITEM = getContext<ItemGroup>(ITEM_GROUP);

	let active: boolean;

	let klass = '';
	export { klass as class };
	export let value = ITEM.index();
	export let activeClass = ITEM.activeClass;
	export let disabled: boolean | undefined = undefined;

	ITEM.register(values => {
		active = values.includes(value);
	});

	function click() {
		if (!disabled) ITEM.select(value);
	}
</script>

<Button
	class="s-btn-group-item {klass}"
	{activeClass}
	{active}
	{disabled}
	on:click={click}
	on:click
>
	<slot />
</Button>

<style lang="scss" src="./ButtonGroupItem.scss" global>
</style>
