<script lang="ts">
	import Icon from '../Icon/Icon.svelte';
	import Input from '../Input/Input.svelte';
	import uid from '../../internal/uid.js';
	import clearIcon from '../../internal/Icons/close.js';

	export let value = '';
	export let color = 'primary';
	export let filled = false;
	export let solo = false;
	export let outlined = false;
	export let flat = false;
	export let rounded = false;
	export let clearable = false;
	export let readonly = false;
	export let rows = 5;
	export let autogrow = false;
	export let noResize = false;
	export let disabled = false;
	export let placeholder: string = ' ';
	export let hint = '';
	export let counter = false;
	export let rules: Function[] = [];
	export let errorCount = 1;
	export let messages: string[] = [];
	export let validateOnBlur = false;
	export let error = false;
	export let success = false;
	export let id = `s-input-${uid(5)}`;
	export let style: string | null = null;
	export let textarea: HTMLTextAreaElement | null = null;

	let focused = false;
	let errorMessages: string[] = [];
	// let labelActive: string | boolean;
	// $: labelActive = !!placeholder || value;

	export function validate() {
		errorMessages = rules.map(r => r(value)).filter(r => typeof r === 'string');
		if (errorMessages.length) error = true;
		else {
			error = false;
		}
		return error;
	}

	function checkRules() {
		errorMessages = rules.map(r => r(value)).filter(r => typeof r === 'string');
		if (errorMessages.length) error = true;
		else {
			error = false;
		}
	}

	function onFocus() {
		focused = true;
	}

	function onBlur() {
		focused = false;
		if (validateOnBlur) checkRules();
	}

	function clear() {
		value = '';
	}

	function onInput() {
		if (!validateOnBlur) validate();
	}

	function updateTextareaHeight(..._: any) {
		textarea!.style.height = 'auto';
		textarea!.style.height = `${textarea!.scrollHeight}px`;
	}

	$: if (textarea && autogrow) updateTextareaHeight(value);
</script>

<Input class="s-text-field s-textarea" {color} {readonly} {disabled} {error} {success} {style}>
	<!-- Slot for prepend outside the input. -->
	<slot slot="prepend-outer" name="prepend-outer" />
	<div
		class="s-text-field__wrapper"
		class:filled
		class:solo
		class:outlined
		class:flat
		class:rounded
		class:autogrow
		class:no-resize={noResize || autogrow}
	>
		<!-- Slot for prepend inside the input. -->
		<slot name="prepend" />

		<div class="s-text-field__input">
			<textarea
				bind:this={textarea}
				type="text"
				bind:value
				{rows}
				{placeholder}
				{id}
				{readonly}
				{disabled}
				on:focus={onFocus}
				on:blur={onBlur}
				on:input={onInput}
				on:focus
				on:blur
				on:input
				on:change
				{...$$restProps}
			/>
			<label for={id}>
				<!-- class:active={labelActive} -->
				<slot />
			</label>
		</div>

		{#if clearable && value !== ''}
			<div on:click={clear} style="cursor:pointer">
				<!-- Slot for the icon when `clearable` is true. -->
				<slot name="clear-icon">
					<Icon path={clearIcon} />
				</slot>
			</div>
		{/if}

		<!-- Slot for append inside the input. -->
		<slot name="append" />
	</div>

	<div slot="messages">
		<div>
			<span>{hint}</span>
			{#each messages as message}<span>{message}</span>{/each}
			{#each errorMessages.slice(0, errorCount) as message}<span>{message}</span>{/each}
		</div>
		{#if counter}<span>{value.length} / {counter}</span>{/if}
	</div>

	<!-- Slot for append outside the input. -->
	<slot slot="append-outer" name="append-outer" />
</Input>
