<script lang="ts">
	import Overlay from '../Overlay';
	import Style from '../../internal/Style';
	import { scale } from 'svelte/transition';

	let klass = '';
	export { klass as class };
	export let active = false;
	export let persistent = false;
	export let disabled = false;
	export let width: string | number = 500;
	export let fullscreen = false;
	export let transition = scale;
	export let role: 'dialog' | 'alert' | 'alertdialog' | 'document' = 'dialog';
	export let ariaLabel: string | undefined = undefined;
	export let ariaLabelledBy: string | undefined = undefined;
	export let ariaDescribedBy: string | undefined = undefined;
	export let overlay = {};

	function changeBodyOverflow(visible: boolean) {
		if (visible) {
			document.body.style.overflow = 'hidden';
			return;
		}

		document.body.style.overflow = 'auto';
	}

	function close() {
		if (!persistent) active = false;
	}

	$: visible = active && !disabled;
	$: changeBodyOverflow(visible);
</script>

{#if visible}
	<!--
		A dialog can have more than just the "document" role.
		In most situations a "dialog" or "alertdialog" would 
		be a more appropriate role.
	-->
	<div
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledBy}
		aria-describedby={ariaDescribedBy}
		aria-modal="true"
		class="s-dialog"
		{role}
		use:Style={{ 'dialog-width': width }}
	>
		<div
			class="s-dialog__content {klass}"
			class:fullscreen
			transition:transition={{ duration: 300, start: 0.1 }}
			on:introstart
			on:outrostart
			on:introend
			on:outroend
		>
			<slot />
		</div>
	</div>
{/if}
<Overlay {...overlay} active={visible} on:click={close} />

<style lang="scss" src="./Dialog.scss" global>
</style>
