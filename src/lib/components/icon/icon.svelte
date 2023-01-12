<script lang="ts">
	import type { IIcon } from '$lib/types';
	import Icon from '@iconify/svelte';

	export let collection: IIcon['collection'] = 'tabler';
	export let icon: IIcon['icon'] = '';
	export let size: IIcon['size'] = 'md';
	export let width = '100%';
	export let height = '100%';
	export let label = `${icon} icon`;
	export let ariaHidden = false;
</script>

<div class="icon {size}">
	<Icon
		icon={`${collection}:${icon}`}
		{width}
		{height}
		color="inherit"
		aria-label={label}
		{ariaHidden}
	/>
</div>

<style lang="scss">
	$sizes: (
		'xs': 4,
		'sm': 5,
		'md': 6,
		'lg': 8,
		'xl': 16,
		'full': 'full'
	);

	.icon {
		@each $size, $value in $sizes {
			&.#{$size} {
				@apply w-#{$value} h-#{$value};
			}
		}
	}
</style>
