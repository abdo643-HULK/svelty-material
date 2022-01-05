<script lang="ts">
	import Ripple from '../../actions/Ripple';
	import Class from '../../internal/Class';

	let klass = '';
	export { klass as class };
	export let href: string;
	export let anchor: HTMLAnchorElement | null = null;
	export let style: string | undefined = undefined;
	export let target: '_self' | '_blank' | '_parent' | '_top' | undefined = undefined;
	export let type: string | undefined = undefined;
	export let hreflang: string | undefined = undefined;
	export let ping: string | undefined = undefined;
	export let download: string | undefined = undefined;
	export let rel: string | undefined = undefined;
	export let referrerpolicy: string | undefined = undefined;
	export let role: string | undefined = undefined;
	export let tabindex: number | undefined = undefined;
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

	export let fab = false;
	export let icon = false;
	export let block = false;
	export let size = 'default';
	export let tile = false;
	export let text = false;
	export let depressed = false;
	export let outlined = false;
	export let rounded = false;
	export let active = false;
	export let activeClass = 'active';
	export let ripple = {};
</script>

<a
	{download}
	{rel}
	{referrerpolicy}
	{href}
	{hreflang}
	{style}
	{tabindex}
	{role}
	{target}
	{type}
	{ping}
	aria-haspopup={ariaHasPopup}
	bind:this={anchor}
	use:Class={[active ? activeClass : '']}
	use:Ripple={ripple}
	on:click
	class="s-btn size-{size} {klass}"
	class:s-btn--fab={fab}
	class:icon
	class:block
	class:tile
	class:text={text || icon}
	class:depressed={depressed || text || outlined || icon}
	class:outlined
	class:rounded
>
	<span class="s-btn__content">
		<slot />
	</span>
</a>

<style lang="scss" src="./Button.scss" global>
</style>
