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

	const sections = Array(3)
		.fill(0)
		.map(_ => {
			return {
				title: '',
				body: Array(10)
					.fill(0)
					.map(_ => {
						return {
							ID: typeof window !== 'undefined' ? window.crypto.randomUUID() : 'ga',
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
					}),
			};
		});
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

<div class="sections">
	{#each sections as section}
		<section class="section-carousel">
			<h2 class="row-header">{section.title}</h2>
			{#each section.body as product}
				<PCard {product} />
			{/each}
		</section>
	{/each}
</div>

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

<style lang="scss">
	:global(:root) {
		--header-position: fixed;
	}

	h1 {
		margin-top: 1em;
		text-transform: uppercase;
	}

	section {
		margin-bottom: 1em;

		div {
			> :global(*) {
				margin: 0.5em;

				&:first-child {
					margin-inline-start: 0;
				}

				&:last-child {
					margin-inline-end: 0;
				}
			}
		}
	}

	.banner {
		padding-top: 2.2em;
	}

	.sections {
		display: flex;
		flex-direction: column;
	}

	.section-carousel {
		max-width: 1200px;

		--siema-item-width: 270px;
		--siema-item-min-width: 235px;
		--siema-content-max-width: 1200px;
		// --siema-inner-padding: 0 1em;
		// --siema-content-padding: 0 4%;

		@media screen and (min-width: 1200px) {
			margin: 0 auto;
		}
	}

	.head {
		// background: linear-gradient(to right, var(--top1), var(--top2));
		background: var(--theme-app-bar);
		padding-bottom: 3.5em;
		text-align: center;

		img {
			margin: 2em 0 0;
			width: 100%;
			max-width: 490px;
			height: 83%;
			max-height: 280px;
		}
	}

	.row-header {
		line-height: 1.3;
		margin-inline-start: 1.5em;
	}
</style>
