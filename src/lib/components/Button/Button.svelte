<script lang="ts">
	import Ripple from '../../actions/Ripple';
	import Class from '../../internal/Class';

	let klass = '';
	export { klass as class };
	export let fab = false;
	export let icon = false;
	export let block = false;
	export let size = 'default';
	export let tile = false;
	export let text = false;
	export let depressed = false;
	export let outlined = false;
	export let rounded = false;
	export let disabled = false;
	export let active = false;
	export let activeClass = 'active';
	export let type = 'button';
	export let ripple = {};
	export let role: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let style: string | undefined = undefined;
	export let formaction: string | undefined = undefined;
	export let button: HTMLButtonElement | null = null;
	export let tabindex: number | undefined = undefined;
	export let value: string | number | string[] | null | undefined = undefined;
	export let ariaHasPopup:
		| boolean
		| 'dialog'
		| 'false'
		| 'true'
		| 'menu'
		| 'listbox'
		| 'tree'
		| 'grid'
		| undefined = undefined;
</script>

<button
	{type}
	{style}
	{disabled}
	{tabindex}
	{role}
	{name}
	{formaction}
	{...value ? { value } : {}}
	aria-haspopup={ariaHasPopup}
	aria-disabled={disabled}
	bind:this={button}
	use:Class={[active ? activeClass : '']}
	use:Ripple={ripple}
	on:click
	class="s-btn size-{size} {klass}"
	class:s-btn--fab={fab}
	class:icon
	class:block
	class:tile
	class:text={text || icon}
	class:depressed={depressed || text || disabled || outlined || icon}
	class:outlined
	class:rounded
	class:disabled
>
	<!-- {...$$restProps} -->
	<span class="s-btn__content">
		<slot />
	</span>
</button>

<style lang="scss" src="./Button.scss" global>
</style>
