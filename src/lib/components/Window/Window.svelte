<script lang="ts" context="module">
	import { onMount, setContext } from 'svelte';

	export const WINDOW = {};
</script>

<script lang="ts">
	let klass = '';
	export { klass as class };
	export let activeClass = 'active';
	export let value = 0;
	export let vertical = false;
	export let reverse = false;
	export let continuous = true;

	let container: HTMLDivElement;
	let moving = false;

	const windowItems: HTMLElement[] = [];

	setContext(WINDOW, (window: HTMLElement) => {
		windowItems.push(window);
	});

	export function set(index: number) {
		const prevIndex = windowItems.findIndex(i => i.classList.contains(activeClass));
		if (!moving && windowItems[index] && index !== prevIndex) {
			moving = true;

			let direction: 'left' | 'right';
			let position: 'next' | 'prev';

			if (index > prevIndex) {
				direction = 'left';
				position = 'next';
			} else {
				direction = 'right';
				position = 'prev';
			}

			const prev = windowItems[prevIndex];
			prev.classList.add(direction);

			container.style.height = `${prev.offsetHeight}px`;

			const active = windowItems[index];
			active.classList.add(position);

			container.style.height = `${active.offsetHeight}px`;

			active.classList.add(direction);

			setTimeout(() => {
				prev.classList.remove('active', direction);

				active.classList.add('active');
				active.classList.remove(position, direction);

				container.style.height = '';
				moving = false;
				value = index;
			}, 300);
		}
	}

	$: set(value);

	export function next() {
		if (value === windowItems.length - 1) {
			if (continuous) set(0);
		} else {
			set(value + 1);
		}
	}

	export function previous() {
		if (value === 0) {
			if (continuous) set(windowItems.length - 1);
		} else {
			set(value - 1);
		}
	}

	onMount(() => {
		const activeItem = windowItems[value];
		if (activeItem) activeItem.classList.add(activeClass);
	});
</script>

<div
	bind:this={container}
	class="s-window {klass}"
	class:horizontal={!vertical}
	class:vertical
	class:reverse
>
	<slot />
</div>

<style lang="scss" src="./Window.scss" global>
</style>
