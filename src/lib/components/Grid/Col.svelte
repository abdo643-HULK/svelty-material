<script lang="ts">
	import Class from '../../internal/Class';

	let klass = '';
	export { klass as class };
	export let cols: boolean | number = false;
	export let sm: boolean | number = false;
	export let md: boolean | number = false;
	export let lg: boolean | number = false;
	export let xl: boolean | number = false;
	export let offset: boolean | number = false;
	export let offset_sm: boolean | number = false;
	export let offset_md: boolean | number = false;
	export let offset_lg: boolean | number = false;
	export let offset_xl: boolean | number = false;
	export let style: string | null | undefined = null;

	const classes: string[] = [
		cols && `col-${cols}`,
		sm && `sm-${sm}`,
		md && `md-${md}`,
		lg && `lg-${lg}`,
		xl && `xl-${xl}`,
		offset && `offset-${offset}`,
		offset_sm && `offset-sm-${offset_sm}`,
		offset_md && `offset-md-${offset_md}`,
		offset_lg && `offset-lg-${offset_lg}`,
		offset_xl && `offset-xl-${offset_xl}`,
	].filter(value => typeof value === 'string') as string[];
</script>

<div class="s-col {klass}" use:Class={classes} {style}>
	<slot />
</div>

<style lang="scss" src="./Col.scss" global>
</style>
