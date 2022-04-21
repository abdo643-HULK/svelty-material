import { noop } from 'svelte/internal';
import { createEventDispatcher } from 'svelte';

import { getFocusableChildren } from '$lib/utils/focus';

const TAB_KEY = 'Tab';
const ESC_KEY = 'Esc';
const ESCAPE_KEY = 'Escape';

export interface DialogActionOptions {
	preventScroll: boolean;
	scrollPadding: string;
	onEscape?(): void;
}

let count = 0;

export function modal(
	node: HTMLElement,
	{ onEscape = noop, preventScroll = true, scrollPadding }: DialogActionOptions,
) {
	const dispatch = createEventDispatcher();
	// Keep a reference to the currently focused element to be able to restore
	// it later
	const previouslyFocused = document.activeElement as HTMLElement | null;
	const body = document.body;
	body.style.setProperty('--s-scroll-padding', scrollPadding);

	open();
	dispatch('open');

	async function open() {
		++count;
		// Set the focus to the dialog element
		moveFocusToDialog();

		if (preventScroll) body.classList.add('no-scroll');
		// const transition = window.getComputedStyle(node, null).getPropertyValue('transition');

		// Bind a focus event listener to the body element to make sure the focus
		// stays trapped inside the dialog while open, and start listening for some
		// specific key presses (TAB and ESC)
		body.addEventListener('focus', maintainFocus, true);
		document.addEventListener('keydown', bindKeypress);
		node.addEventListener('transitionend', moveFocusToDialog);
		node.addEventListener('introend', moveFocusToDialog);

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
		--count;
		if (!count) body.classList.remove('no-scroll');
		body.removeEventListener('focus', maintainFocus, true);
		document.removeEventListener('keydown', bindKeypress);
		node.removeEventListener('transitionend', moveFocusToDialog);
		node.removeEventListener('introend', moveFocusToDialog);

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

	async function moveFocusToDialog() {
		const focused = node.querySelector<HTMLElement>('[autofocus]') || node;
		focused.focus();
	}

	function bindKeypress(ev: KeyboardEvent) {
		if (!node.contains(document.activeElement)) return;

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
