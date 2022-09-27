<script context="module" lang="ts">
	import uid from '../../internal/uid.js';
	import Ripple from '../../actions/Ripple/index.js';
	import TextColor from '../../internal/TextColor.js';

	const check = 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z';
	const dash = 'M4,11L4,13L20,13L20,11L4,11Z';
</script>

<script lang="ts">
	// Add class to checkbox wrapper.
	let klass = '';
	export { klass as class };

	// Class to add to checkbox when it is checked or indeterminate.
	export let color = 'primary';

	// Get/Set checked state.
	export let checked = false;

	// Get/Set indeterminate state.
	export let indeterminate = false;

	// Make the checkbox disabled.
	export let disabled = false;

	// The value for the checkbox.
	export let value: string | number | null | undefined = null;

	// Combines components into a single group.
	export let group: (string | number)[] | null = null;

	// Id for the checkbox, defaults to a random uid.
	export let id: string | null | undefined = null;

	// Styles to add to checkbox.
	export let style: string | null | undefined = null;

	// The <input/> element of the checkbox.
	export let inputElement = null;

	let wrapper: HTMLDivElement;

	id = id || `s-checkbox-${uid(5)}`;

	$: if (Array.isArray(group) && value != null) {
		checked = group.indexOf(value) >= 0;
	}

	function groupUpdate() {
		if (Array.isArray(group) && value != null) {
			const i = group.indexOf(value);
			if (i < 0) {
				group.push(value);
			} else {
				group.splice(i, 1);
			}
			group = group;
		}
	}
</script>

<div class="s-checkbox" {style}>
	<div
		bind:this={wrapper}
		class="s-checkbox__wrapper {klass}"
		class:disabled
		use:Ripple={{ centered: true }}
		use:TextColor={checked || indeterminate ? color : false}
	>
		<input
			bind:this={inputElement}
			type="checkbox"
			role="checkbox"
			aria-checked={checked}
			{id}
			{disabled}
			{value}
			bind:checked
			bind:indeterminate
			on:keydown={e => {
				wrapper.dispatchEvent(
					new KeyboardEvent(e.type, {
						...e,
					}),
				);
			}}
			on:keyup={e => {
				wrapper.dispatchEvent(
					new KeyboardEvent(e.type, {
						...e,
					}),
				);
			}}
			on:change={groupUpdate}
			on:change
		/>
		<div class="s-checkbox__background" aria-hidden="true">
			{#if checked || indeterminate}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d={checked ? check : dash} />
				</svg>
			{/if}
		</div>
	</div>
	<label for={id}>
		<slot />
	</label>
</div>

<style lang="scss" src="./Checkbox.scss" global>
</style>
