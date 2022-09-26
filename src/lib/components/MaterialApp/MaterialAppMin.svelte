<script lang="ts">
	export let theme: 'light' | 'dark' | string = 'light';
</script>

<div class="s-app theme--{theme}">
	<slot />
</div>

<style type="scss" src="./MaterialAppMin.scss" global>
</style>
