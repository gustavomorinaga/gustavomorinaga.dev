<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { clickoutside } from '@svelte-put/clickoutside';
	import Portal from 'svelte-portal';

	export let id: string;
	export let showContent = false;
	export let title = '';
	export let label = '';
	export let effect = slide;
	export let duration = 300;
	export let easing = cubicInOut;

	const handleBlur = () => (showContent = false);
</script>

<div {id} class="dropdown__wrapper">
	<label class="btn__dropdown" class:active={showContent} {title} aria-label={label}>
		<input type="checkbox" hidden aria-hidden="true" bind:checked={showContent} />
		<slot name="trigger" />
	</label>
</div>

{#if showContent}
	<Portal target="body">
		<div
			id="{id}__content"
			class="dropdown__content"
			transition:effect={{ duration, easing }}
			use:clickoutside
			on:clickoutside={handleBlur}
		>
			<slot name="content" />
		</div>
	</Portal>
{/if}

<style lang="scss" global>
	.dropdown__wrapper {
		@apply block;
	}

	.dropdown__content {
		@apply z-40;
		position: fixed !important;
	}
</style>
