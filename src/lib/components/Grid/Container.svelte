<script lang="ts">
	let klass = '';
	export { klass as class };
	export let fluid = false;
	export let style: string | undefined | null = null;
</script>

<div class="s-container {klass}" class:fluid {style}>
	<slot />
</div>

<style lang="scss" global>
	@import '../../styles/variables';

	.s-container {
		width: 100%;
		padding: $container-padding-x;
		margin-right: auto;
		margin-left: auto;

		&.fluid {
			max-width: 100%;
		}

		@media #{map-get($display-breakpoints, "md-and-up")} {
			max-width: map-get($container-max-widths, 'md');
		}
		@media #{map-get($display-breakpoints, "lg-and-up")} {
			max-width: map-get($container-max-widths, 'lg');
		}
		@media #{map-get($display-breakpoints, "xl-only")} {
			max-width: map-get($container-max-widths, 'xl');
		}
	}
</style>
