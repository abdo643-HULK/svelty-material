/**
 * Click Outside
 */
export default (node: Node, _options = {}) => {
	const options = { include: [], cb: () => {}, ..._options };

	function detect({ target, defaultPrevented }: MouseEvent | TouchEvent) {
		console.debug(target);
		console.debug(node.contains(target as Node));
		if (!node.contains(target as Node) && !defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
			options.cb();
		}
	}

	const opt: AddEventListenerOptions = {
		passive: true,
		capture: true,
	};

	document.addEventListener('click', detect, opt);

	return {
		destroy() {
			document.removeEventListener('click', detect, opt as EventListenerOptions);
		},
	};
};
