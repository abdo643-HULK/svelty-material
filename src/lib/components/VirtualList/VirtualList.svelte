<script>
	import { ListGroup, ListItem } from '../List';

	interface VListItem {
		text: string;
		active?: boolean;
		subtitle?: string;
		items?: VListItem[];
	}

	let klass = '';
	export { klass as class };
	export let active = true;
	export let items: VListItem[] = [];
	export let itemClasses = '';
	export let style = '';
	export let offsetFunction = (x: number) => `${(x + 1) * 28}px`;

	export const depth = 0;
</script>

<ListGroup class={klass} {active} {style} offset={offsetFunction(depth)}>
	{#each items as item}
		<slot {item}>
			<ListItem class={itemClasses}>
				{item.text}
				<div slot="subtitle">{item.subtitle || ''}</div>
			</ListItem>
		</slot>
		{#if item.items}
			<svelte:self items={item.items} depth={depth + 1} active={item.active} />
		{/if}
	{/each}
</ListGroup>
