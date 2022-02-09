<script>
	import Card from '$lib/components/Card';
	import PCard from '$lib/site/P-Card.svelte';
	import Button from '$lib/components/Button';

	import { getContext } from 'svelte';

	const product = {
		ID: 'sdmsld',
		name: 'Hamburger',
		description: '',
		price: 4.5,
		categories: ['burger'],
		image: {
			src: '',
			alt: 'Bild von einem Burger',
		},
		variations: {
			toppings: ['Beilagen', 'Saucen'],
		},
	};
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

<Card>
	<div>
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus, ratione doloremque, earum
		fuga id facere porro dolores temporibus impedit, omnis vitae tenetur fugiat voluptates
		explicabo nostrum aspernatur possimus ipsa debitis?
	</div>
	<Button on:click={() => modal?.open()}>In den Warenkorb</Button>
</Card>

<div>
	<PCard {product} />
	<PCard {product} />
	<PCard {product} />
</div>

<div>
	<PCard {product} />
</div>

<div>
	<PCard {product} />
</div>
<div>
	<PCard {product} />
</div>
<div>
	<PCard {product} />
</div>
<div>
	<PCard {product} />
</div>
<div>
	<PCard {product} />
</div>
<div>
	<PCard {product} />
</div>
<div>
	<PCard {product} />
</div>
<div>
	<PCard {product} />
</div>

<style>
	div {
		display: flex;
	}
</style>
