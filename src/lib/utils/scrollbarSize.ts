export default function getScrollbarSize(doc: Document): number {
	// https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	const documentWidth = doc.documentElement.clientWidth;
	return Math.abs(window.innerWidth - documentWidth);
}
