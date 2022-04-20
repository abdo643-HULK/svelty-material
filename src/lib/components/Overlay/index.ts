import { TransitionConfig } from 'svelte/transition';

export { default } from './Overlay.svelte';

export interface OverlayProps<InTransitionProps, OutTransitionProps> {
	class?: string;
	style?: string;
	inOpts?: InTransitionProps;
	outOpts?: OutTransitionProps;
	active?: boolean;
	absolute?: boolean;
	transition?<T>(node: HTMLDivElement, options: T): TransitionConfig;
}
