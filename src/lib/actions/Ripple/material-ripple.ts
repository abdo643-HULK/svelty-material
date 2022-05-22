/* eslint-disable no-param-reassign */

/**
 * Options for customizing ripples
 */
const defaults = {
	color: 'currentColor',
	class: '',
	opacity: 0.1,
	centered: false,
	spreadingDuration: '.4s',
	spreadingDelay: '0s',
	spreadingTimingFunction: 'linear',
	clearingDuration: '1s',
	clearingDelay: '0s',
	clearingTimingFunction: 'ease-in-out',
};

/**
 * Creates a ripple element but does not destroy it (use rippleStop for that)
 *
 * @param {*} options
 * @returns Ripple element
 */
export function rippleStart(e: TouchEvent | MouseEvent | KeyboardEvent, options: any = {}) {
	e.stopImmediatePropagation();
	const opts = { ...defaults, ...options };

	const isTouchEvent =
		typeof TouchEvent !== 'undefined' && e instanceof TouchEvent ? !!e.touches[0] : false;
	// Parent element
	const target = isTouchEvent
		? //@ts-ignore
		  (e as TouchEvent).touches[0].currentTarget
		: e.currentTarget;

	// Create ripple
	const ripple = document.createElement('div');
	const rippleStyle = ripple.style;

	// Adding default stuff
	ripple.className = `material-ripple ${opts.class}`;
	rippleStyle.position = 'absolute';
	rippleStyle.color = 'inherit';
	rippleStyle.borderRadius = '50%';
	rippleStyle.pointerEvents = 'none';
	// rippleStyle.width = '100px';
	// rippleStyle.height = '100px';
	// rippleStyle.marginTop = '-50px';
	// rippleStyle.marginLeft = '-50px';

	const diameter = Math.max(target.clientWidth, target.clientHeight);
	rippleStyle.width = rippleStyle.height = `${diameter}px`;
	rippleStyle.marginTop = rippleStyle.marginLeft = `-${diameter / 2}px`;

	target.appendChild(ripple);
	rippleStyle.opacity = opts.opacity;
	rippleStyle.transition = `transform ${opts.spreadingDuration} ${opts.spreadingTimingFunction} ${opts.spreadingDelay},opacity ${opts.clearingDuration} ${opts.clearingTimingFunction} ${opts.clearingDelay}`;
	// rippleStyle.transform = 'scale(0) translate(0,0)';
	rippleStyle.background = opts.color;

	// Positioning ripple
	const targetRect = target.getBoundingClientRect();
	if (opts.centered) {
		rippleStyle.top = `${targetRect.height / 2}px`;
		rippleStyle.left = `${targetRect.width / 2}px`;
	} else {
		const distY = isTouchEvent
			? (e as TouchEvent).touches[0].clientY
			: (e as MouseEvent).clientY;
		const distX = isTouchEvent
			? (e as TouchEvent).touches[0].clientX
			: (e as MouseEvent).clientX;
		rippleStyle.top = `${distY - targetRect.top}px`;
		rippleStyle.left = `${distX - targetRect.left}px`;
	}

	// Enlarge ripple
	// rippleStyle.transform = `scale(${
	// 	Math.max(targetRect.width, targetRect.height) * 0.02
	// }) translate(0,0)`;
	rippleStyle.transform = `scale(3) translate(0,0)`;

	// const radius = diameter / 2;
	// rippleStyle.left = `${e.clientX - target.offsetLeft - radius}px`;
	// rippleStyle.top = `${e.clientY - target.offsetTop - radius}px`;

	return ripple;
}

/**
 * Destroys the ripple, slowly fading it out.
 */
export function rippleStop(ripple: HTMLElement) {
	if (ripple == null) return;
	ripple.addEventListener('transitionend', e => {
		if (e.propertyName === 'opacity') ripple.remove();
	});
	ripple.style.opacity = '' + 0;
}
