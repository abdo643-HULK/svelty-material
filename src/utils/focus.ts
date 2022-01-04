export const FOCUSABLE_ELEMENTS = [
	'a[href]:not([tabindex^="-"])',
	'area[href]:not([tabindex^="-"])',
	'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
	'input[type="radio"]:not([disabled]):not([tabindex^="-"])',
	'select:not([disabled]):not([tabindex^="-"])',
	'textarea:not([disabled]):not([tabindex^="-"])',
	'button:not([disabled]):not([tabindex^="-"])',
	'iframe:not([tabindex^="-"])',
	'audio[controls]:not([tabindex^="-"])',
	'video[controls]:not([tabindex^="-"])',
	'[contenteditable]:not([tabindex^="-"])',
	'[tabindex]:not([tabindex^="-"])'
];

/**
 * Get the focusable children of the given element
 *
 * @param element
 * @returns
 */
export function getFocusableChildren<T extends HTMLElement = HTMLElement>(
	element: HTMLElement | Document = document
): Array<T> {
	return Array.from(element.querySelectorAll<T>(FOCUSABLE_ELEMENTS.join(','))).filter(
		(el) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
	);
}
