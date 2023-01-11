<script lang="ts">
	import Icon from '@iconify/svelte';

	export let collection: 'tabler' | 'logos' = 'tabler';
	export let icon = '';
	export let label = `${icon} icon`;
	export let ariaHidden = false;
	export let width = '100%';
	export let height = '100%';
	export let small = false;
	export let big = false;
</script>

<div class="icon" class:big class:small>
	<Icon icon={`${collection}:${icon}`} {width} {height} aria-label={label} {ariaHidden} />
</div>

<style lang="scss">
	.icon {
		@apply w-6 h-6;

		&.big {
			@apply w-7 h-7;
		}

		&.small {
			@apply w-5 h-5;
		}
	}
</style>
