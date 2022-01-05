<script context="module" lang="ts">
	const TAB_KEY = 'Tab';
	const ESC_KEY = 'Esc';
	const ESCAPE_KEY = 'Escape';

	import Style from '../../internal/Style';

	import { scale } from 'svelte/transition';
	import { createEventDispatcher, tick } from 'svelte';
	import { getFocusableChildren } from '../../utils/focus';

	interface DialogOptions {
		onEscape: Function;
	}

	function dialog(node: HTMLElement, { onEscape }: DialogOptions) {
		const dispatch = createEventDispatcher();
		// Keep a reference to the currently focused element to be able to restore
		// it later
		const previouslyFocused = document.activeElement as HTMLElement | null;

		open();
		dispatch('open');

		async function open() {
			// Set the focus to the dialog element
			moveFocusToDialog();

			// Bind a focus event listener to the body element to make sure the focus
			// stays trapped inside the dialog while open, and start listening for some
			// specific key presses (TAB and ESC)
			document.body.addEventListener('focus', maintainFocus, true);
			document.addEventListener('keydown', bindKeypress);

			document.body.style.overflow = 'hidden';
		}

		function hide() {
			// If there was a focused element before the dialog was opened (and it has a
			// `focus` method), restore the focus back to it
			// See: https://github.com/KittyGiraudel/a11y-dialog/issues/108
			previouslyFocused?.focus();

			document.removeEventListener('keydown', bindKeypress);
			document.body.removeEventListener('focus', maintainFocus, true);
			document.body.style.overflow = 'auto';
		}

		function moveFocusToDialog() {
			const focused = node.querySelector<HTMLElement>('[autofocus]') || node;
			console.debug(focused);
			focused.focus();
		}

		function bindKeypress(ev: KeyboardEvent) {
			if (
				(ev.key === ESC_KEY || ev.key === ESCAPE_KEY) &&
				// ev.which === ESCAPE_KEY &&
				node.getAttribute('role') !== 'alertdialog'
			) {
				ev.preventDefault();
				onEscape();
			}

			// If the dialog is shown and the TAB key is being pressed, make sure the
			// focus stays trapped within the dialog element
			if (ev.key === TAB_KEY) {
				trapTabKey(node, ev);
			}
		}

		function maintainFocus(event: FocusEvent) {
			// If the dialog is shown and the focus is not within a dialog element (either
			// this one or another one in case of nested dialogs) or within an element
			// with the `data-a11y-dialog-focus-trap-ignore` attribute, move it back to
			// its first focusable child.
			// See: https://github.com/KittyGiraudel/a11y-dialog/issues/177
			const element = event.target as HTMLElement | null;
			if (
				!element?.closest('[aria-modal="true"]') &&
				!element?.closest('[data-ignore-focus-trap]')
			) {
				moveFocusToDialog();
			}
		}

		return {
			destroy() {
				hide();
				dispatch('hide');
			}
		};
	}

	function trapTabKey(node: HTMLElement, event: KeyboardEvent) {
		// because attributes can change any time, we need to
		// get the elements every time
		const focusableChildren = getFocusableChildren(node);
		console.debug(focusableChildren);
		const focusedItemIndex = focusableChildren.indexOf(document.activeElement as HTMLElement);
		console.debug(focusedItemIndex);
		// If the SHIFT key is being pressed while tabbing (moving backwards) and
		// the currently focused item is the first one, move the focus to the last
		// focusable item from the dialog element
		if (event.shiftKey && focusedItemIndex === 0) {
			focusableChildren[focusableChildren.length - 1].focus();
			event.preventDefault();
			// If the SHIFT key is not being pressed (moving forwards) and the currently
			// focused item is the last one, move the focus to the first focusable item
			// from the dialog element
		} else if (!event.shiftKey && focusedItemIndex === focusableChildren.length - 1) {
			focusableChildren[0].focus();
			event.preventDefault();
		}
	}
</script>

<script lang="ts">
	import Overlay from '../Overlay';

	let klass = '';
	export { klass as class };
	export let active = false;
	export let persistent = false;
	export let width: string | number = 500;
	export let fullscreen = false;
	export let transition = scale;
	export let role: 'dialog' | 'alert' | 'alertdialog' | 'document' = 'dialog';
	export let ariaLabel: string | undefined = undefined;
	export let ariaLabelledBy: string | undefined = undefined;
	export let ariaDescribedBy: string | undefined = undefined;
	export let overlay = {};

	function close() {
		if (!persistent) active = false;
	}
</script>

<!--
	A dialog can have more than just the "document" role.
	In most situations a "dialog" or "alertdialog" would 
	be a more appropriate role.
-->
{#if active}
	<div
		class="s-dialog"
		aria-modal="true"
		aria-hidden={!active}
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledBy}
		aria-describedby={ariaDescribedBy}
		{role}
		use:Style={{ 'dialog-width': width }}
		use:dialog={{
			onEscape: () => (active = false)
		}}
		{...$$restProps}
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

<Overlay {...overlay} {active} on:click={close} />

<style lang="scss" src="./Dialog.scss" global>
</style>
