<script context="module" lang="ts">
	interface CloseEventDetail {
		close: Function;
	}

	export interface CloseEvent {
		readonly detail?: CloseEventDetail;
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	import Dialog from '$lib/components/Dialog/Dialog.svelte';
	import ModalBody from '$lib/site/ModalBody.svelte';
	import MaterialApp from '$lib/components/MaterialApp';

	let active = false;

	let modalBody: typeof ModalBody | null = null;
	let componentProps: Object | null = {};

	function openProductModal(product: Object) {
		open(ModalBody, { product });
	}

	function open(component: typeof ModalBody | null, props: Object) {
		modalBody = component;
		componentProps = props;

		active = true;
	}

	function close({ detail }: CloseEvent) {
		detail?.close();
		modalBody = null;
		componentProps = {};

		active = false;
	}

	setContext('MODAL', {
		open: openProductModal
	});
</script>

<MaterialApp>
	<slot />
	<Dialog width="auto" role="dialog" bind:active>
		<svelte:component this={modalBody} {...componentProps} on:close={close} />
	</Dialog>
</MaterialApp>
