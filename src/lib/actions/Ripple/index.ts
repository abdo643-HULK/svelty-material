import { rippleStart, rippleStop } from './material-ripple';

export default (node: HTMLElement, _options = {}) => {
	let options = _options;
	let destroyed = false;
	let ripple: HTMLDivElement;
	let keyboardActive = false;

	function handleStart(e: PointerEvent) {
		ripple = rippleStart(e, options);
	}

	const handleStop = () => rippleStop(ripple);

	function handleKeyboardStart(e: KeyboardEvent) {
		if (!keyboardActive && (e.keyCode === 13 || e.keyCode === 32)) {
			ripple = rippleStart(e, {
				...options,
				centered: true,
			});
			keyboardActive = true;
		}
	}

	function handleKeyboardStop() {
		keyboardActive = false;
		handleStop();
	}

	function setup() {
		node.classList.add('s-ripple-container');
		node.addEventListener('pointerdown', handleStart);
		node.addEventListener('pointerup', handleStop);
		node.addEventListener('pointerleave', handleStop);
		node.addEventListener('keydown', handleKeyboardStart);
		node.addEventListener('keyup', handleKeyboardStop);
		destroyed = false;
	}

	function destroy() {
		node.classList.remove('s-ripple-container');
		node.removeEventListener('pointerdown', handleStart);
		node.removeEventListener('pointerup', handleStop);
		node.removeEventListener('pointerleave', handleStop);
		node.removeEventListener('keydown', handleKeyboardStart);
		node.removeEventListener('keyup', handleKeyboardStop);
		destroyed = true;
	}

	if (options) setup();

	return {
		update(newOptions: {}) {
			options = newOptions;
			if (options && destroyed) setup();
			else if (!(options || destroyed)) destroy();
		},
		destroy,
	};
};
