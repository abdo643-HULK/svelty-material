<script context="module" lang="ts">
	const TAB_KEY = 'Tab';
	const ESC_KEY = 'Esc';
	const ESCAPE_KEY = 'Escape';

	import clickOutside from '$lib/actions/ClickOutside';

	import { scale } from 'svelte/transition';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { getFocusableChildren } from '../../utils/focus';

	import type { AlignItems } from '$lib/@types';

	interface DialogOptions {
		onEscape: Function;
		preventScroll: Boolean;
		scrollPadding: string;
	}

	// function getPaddingRight(element: Element): number {
	// 	return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
	// }

	// function isOverflowing(container: Element): boolean {
	// 	const doc = ownerDocument(container);

	// 	if (doc.body === container) {
	// 		return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
	// 	}

	// 	return container.scrollHeight > container.clientHeight;
	// }

	function dialog(node: HTMLElement, { onEscape, preventScroll, scrollPadding }: DialogOptions) {
		const dispatch = createEventDispatcher();
		// Keep a reference to the currently focused element to be able to restore
		// it later
		const previouslyFocused = document.activeElement as HTMLElement | null;
		const body = document.body;
		body.style.setProperty('--s-scroll-padding', scrollPadding);

		open();
		dispatch('open');

		async function open() {
			// Set the focus to the dialog element
			moveFocusToDialog();

			if (preventScroll) {
				body.classList.add('no-scroll');
			}
			// Bind a focus event listener to the body element to make sure the focus
			// stays trapped inside the dialog while open, and start listening for some
			// specific key presses (TAB and ESC)
			body.addEventListener('focus', maintainFocus, true);
			document.addEventListener('keydown', bindKeypress);

			// if (isSafari) {
			// 	body.style.overflow = 'hidden';
			// } else {
			// 	body.classList.add('no-scroll');
			// }
			// target.style.position = '';
			// target.style.top = `-${
			// 	document.body.scrollTop || document.documentElement.scrollTop
			// }px`;
			// target.classList.add('no-scroll');
		}

		function hide() {
			body.classList.remove('no-scroll');
			body.removeEventListener('focus', maintainFocus, true);
			document.removeEventListener('keydown', bindKeypress);

			// If there was a focused element before the dialog was opened (and it has a
			// `focus` method), restore the focus back to it
			// See: https://github.com/KittyGiraudel/a11y-dialog/issues/108
			previouslyFocused?.focus();

			// if (isSafari) {
			// 	body.style.overflow = 'auto';
			// } else {
			// 	body.classList.remove('no-scroll');
			// }
			// document.documentElement.classList.remove('no-scroll');
			// body.classList.remove('no-scroll');
		}

		function moveFocusToDialog() {
			const focused = node.querySelector<HTMLElement>('[autofocus]') || node;
			focused.focus();
		}

		function bindKeypress(ev: KeyboardEvent) {
			if (
				(ev.key === ESC_KEY || ev.key === ESCAPE_KEY) &&
				// ev.which === ESCAPE_KEY &&
				node.getAttribute('role') !== 'alertdialog'
			) {
				ev.preventDefault();
				dispatch('escape');
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
				dispatch('close');
			},
		};
	}

	function trapTabKey(node: HTMLElement, event: KeyboardEvent) {
		// because attributes can change any time, we need to
		// get the elements every time
		const focusableChildren = getFocusableChildren(node);
		const focusedItemIndex = focusableChildren.indexOf(document.activeElement as HTMLElement);

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
	export let preventScroll = true;
	export let alignItems: AlignItems | '' = '';

	interface $$Events {
		'open': () => void;
		'close': () => void;
		'introstart': svelte.JSX.EventHandler<CustomEvent<null>, HTMLDivElement> | null | undefined;
		'outrostart': svelte.JSX.EventHandler<CustomEvent<null>, HTMLDivElement> | null | undefined;
		'introend': svelte.JSX.EventHandler<CustomEvent<null>, HTMLDivElement> | null | undefined;
		'outroend': svelte.JSX.EventHandler<CustomEvent<null>, HTMLDivElement> | null | undefined;
		'overlay-click': () => void;
		'escape': () => void;
	}

	const dispatch = createEventDispatcher();

	$: _alignItems = alignItems as string;

	let scrollPadding = '';

	if (
		typeof window !== 'undefined' &&
		(document.defaultView || window).innerWidth > document.documentElement.clientWidth
	) {
		scrollPadding = '17px';
	}

	function close() {
		dispatch('overlay-click');
		if (!persistent) active = false;
	}
</script>

<div class="s-dialog__container">
	<Overlay {...overlay} {active} on:click={close} />
	<!--
	A dialog can have more than just the "document" role.
	In most situations a "dialog" or "alertdialog" would 
	be a more appropriate role.
	-->
	{#if active}
		<!-- 
		Without this container we wouldn't be able to 
		use display flex to center and also support overflow
	-->
		<div
			class="s-dialog"
			aria-modal="true"
			aria-hidden={!active}
			aria-label={ariaLabel}
			aria-labelledby={ariaLabelledBy}
			aria-describedby={ariaDescribedBy}
			style:--s-dialog-align-items={_alignItems}
			style:--s-dialog-width={width}
			tabindex="-1"
			{role}
			{...$$restProps}
			use:dialog={{
				onEscape: () => (active = false),
				preventScroll,
				scrollPadding,
			}}
		>
			<div
				class="s-dialog__content {klass}"
				class:fullscreen
				use:clickOutside={{
					cb: close,
				}}
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
</div>

<style lang="scss" src="./Dialog.scss" global>
</style>
