<script lang="ts">
	interface Item {
		disabled: boolean;
		href: string;
		text: string;
		class: string;
		props: Record<string, any>;
	}

	let klass = '';
	export { klass as class };
	export let large = false;
	export let items: Partial<Item>[] = [];
	export let style: string | null | undefined = null;

	const defaults: Item = {
		disabled: false,
		href: '',
		text: '',
		class: '',
		props: {},
	};

	items = items.map(x => ({ ...defaults, ...x }));
</script>

<ul class="s-breadcrumbs {klass}" class:large {style}>
	{#each items as item, i}
		{#if i !== 0}
			<li class="divider">
				<!-- The slot used for divider -->
				<slot name="divider">/</slot>
			</li>
		{/if}
		<li>
			<slot {item}>
				{#if item.href}
					<a
						href={item.href}
						class="s-breadcrumb-item {item.class}"
						class:disabled={item.disabled}
						{...item.props}
					>
						{item.text}
					</a>
				{:else}
					<span
						class="s-breadcrumb-item {item.class}"
						class:disabled={item.disabled}
						{...item.props}
					>
						{item.text}
					</span>
				{/if}
			</slot>
		</li>
	{/each}
</ul>

<style lang="scss" src="./Breadcrumbs.scss" global>
</style>
