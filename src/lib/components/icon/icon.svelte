<script lang="ts">
	import { fade, type TransitionConfig } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import Icon from '@iconify/svelte';
	import type { IIcon } from '$lib/types';

	export let collection: IIcon['collection'] | string = 'tabler';
	export let icon: IIcon['icon'] = '';
	export let size: IIcon['size'] = 'md';
	export let width = '100%';
	export let height = '100%';
	export let label = `${icon} icon`;
	export let ariaHidden = false;
	export let animate = false;
	export let motionConfig: TransitionConfig & { fn: unknown } = {
		fn: fade,
		duration: 300,
		easing: cubicIn
	};

	const motion = (node: Element, options: any) => animate && options.fn(node, options);
</script>

<div class="icon {size}">
	{#key icon}
		<div class="icon__wrapper" transition:motion={motionConfig}>
			<Icon
				icon={`${collection}:${icon}`}
				{width}
				{height}
				color="inherit"
				aria-label={label}
				{ariaHidden}
			/>
		</div>
	{/key}
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
		@apply relative block overflow-hidden p-2;

		@each $size, $value in $sizes {
			&.#{$size} {
				@apply w-#{$value} h-#{$value};
			}
		}

		& .icon__wrapper {
			@apply absolute inset-0 inline-block;
		}
	}
</style>
