<script>
	import Button from '$lib/components/Button';
	import Card from '$lib/components/Card';
	import { getContext } from 'svelte';

	const modal = getContext<{ open: Function }>('MODAL');
</script>

<Card>
	<div>
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus, ratione doloremque, earum
		fuga id facere porro dolores temporibus impedit, omnis vitae tenetur fugiat voluptates
		explicabo nostrum aspernatur possimus ipsa debitis?
	</div>
	<Button on:click={() => modal?.open()}>In den Warenkorb</Button>
</Card>

<style>
	/* your styles go here */
</style>
