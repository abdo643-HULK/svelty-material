<script lang="ts" context="module">
	export const ITEM_GROUP = {};

	export interface ItemGroup {
		activeClass: string;
		select(val: any): void;
		register(setValue: (val: any[]) => void): void;
		index(): number;
	}
</script>

<script lang="ts">
	import { setContext, createEventDispatcher, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	let klass = '';
	export { klass as class };
	export let activeClass = '';
	export let value: any[] | any = [];
	export let multiple = false;
	export let mandatory = false;
	export let max = Infinity;
	export let role: string | undefined = undefined;
	export let style: string | undefined = undefined;

	const dispatch = createEventDispatcher();
	const valueStore = writable(value);

	$: valueStore.set(value);
	$: dispatch('change', value);

	let startIndex = -1;
	setContext(ITEM_GROUP, {
		select: val => {
			if (multiple && value instanceof Array) {
				if (value.includes(val)) {
					if (!mandatory || value.length > 1) {
						value.splice(value.indexOf(val), 1);
						value = value;
					}
				} else if (value?.length ?? 0 < max) value = [...(value ?? []), val];
			} else if (value === val) {
				if (!mandatory) value = null;
			} else value = val;
		},
		register: setValue => {
			const u = valueStore.subscribe(val => {
				setValue(multiple ? val : [val]);
			});
			onDestroy(u);
		},
		index: () => {
			startIndex += 1;
			return startIndex;
		},
		activeClass,
	} as ItemGroup);
</script>

<div class="s-item-group {klass}" {role} {style}>
	<slot />
</div>

<style lang="scss" src="./ItemGroup.scss" global>
</style>
