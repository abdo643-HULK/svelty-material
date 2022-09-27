<script lang="ts">
	import Input from '../Input/index.js';
	import { onMount, createEventDispatcher } from 'svelte';
	import type { API, Options, target } from 'nouislider';

	interface SliderElement extends target {}

	let sliderElement: SliderElement;
	let slider: API;
	let internalValue: number | number[];
	const dispatch = createEventDispatcher();

	export let min = 0;
	export let max = 100;
	export let value: number | number[] = (min + max) / 2;
	export let connect: Options['connect'] = Array.isArray(value) ? true : 'lower';
	export let color = 'primary';
	export let precision = 0;
	export let step: Options['step'] = undefined;
	export let margin: Options['margin'] = undefined;
	export let limit: Options['limit'] = undefined;
	export let padding: Options['padding'] = undefined;
	export let thumb = false;
	export let persistentThumb = false;
	export let thumbClass = 'primary-color';
	export let vertical = false;
	export let inverseLabel = false;
	export let readonly = false;
	export let disabled: boolean | undefined = undefined;
	export let style: string | undefined | null = null;

	function format(val: any[]) {
		if (Array.isArray(val)) {
			if (val.length === 1) return Number(val[0]);
			return val.map(v => Number(v));
		}
		return Number(val);
	}

	function tooltip() {
		if (Array.isArray(thumb)) {
			return thumb.map(x => {
				if (typeof x === 'function') return { to: x };
				return x;
			});
		}
		if (typeof thumb === 'function') {
			return { to: thumb };
		}
		return thumb;
	}

	onMount(async () => {
		const { default: noUiSlider } = await import('nouislider');

		noUiSlider.cssClasses.tooltip = `tooltip ${thumbClass}`;
		noUiSlider.create(sliderElement, {
			cssPrefix: 's-slider__',
			format: {
				to: v => v.toFixed(precision),
				from: v => Number(v),
			},
			start: value,
			connect,
			margin,
			limit,
			padding,
			range: { min, max },
			orientation: vertical ? 'vertical' : 'horizontal',
			step,
			tooltips: tooltip(),
		});

		slider = sliderElement.noUiSlider!;

		slider.on('update', (val, handle) => {
			value = format(val);
			internalValue = value;
			dispatch('update', { value: val, handle });
		});

		slider.on('change', (val, handle) => {
			dispatch('change', { value: val, handle });
		});

		return () => {
			slider.destroy();
		};
	});

	$: if (slider) {
		if (value !== internalValue) slider.set(value, false);
		slider.updateOptions(
			{
				start: value,
				range: { min, max },
				margin,
				limit,
				padding,
				step,
			},
			false,
		);
	}
</script>

<Input class="s-slider" {color} {readonly} {disabled}>
	<!-- Slot for prepend outside the input. -->
	<slot slot="prepend-outer" name="prepend-outer" />
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="s-slider__label" class:inverse-label={inverseLabel}><slot /></label>
	<div class:persistent-thumb={persistentThumb} bind:this={sliderElement} {disabled} {style} />

	<!-- Slot for append outside the input. -->
	<slot slot="append-outer" name="append-outer" />
</Input>

<style lang="scss" src="./Slider.scss" global>
</style>
