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

	const toggleShow = () => (showContent = !showContent);
</script>

<div {id} class="dropdown__wrapper">
	<button
		class="dropdown__trigger"
		class:active={showContent}
		{title}
		aria-label={label}
		on:click|stopPropagation={toggleShow}
	>
		<slot name="trigger" />
	</button>
</div>

{#if showContent}
	<Portal>
		<div
			id="{id}__content"
			class="dropdown__content"
			transition:effect|global={{ duration, easing }}
			use:clickoutside={{ enabled: showContent, options: { passive: true } }}
			on:clickoutside={toggleShow}
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
