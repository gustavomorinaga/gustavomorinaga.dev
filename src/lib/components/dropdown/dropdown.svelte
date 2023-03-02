<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Portal from 'svelte-portal';

	let activationRef: HTMLElement;
	let contentRef: HTMLElement;

	export let id: string;
	export let showContent = false;
	export let title = '';
	export let label = '';
	export let effect = slide;
	export let duration = 300;
	export let easing = cubicInOut;

	const handleBlur = (event: Event) => {
		const currentTarget = event.target as Node;

		if (showContent && !activationRef?.contains(currentTarget))
			showContent = contentRef?.contains(currentTarget);
	};
</script>

<svelte:window on:click={handleBlur} />

<div {id} class="dropdown__wrapper">
	<label
		bind:this={activationRef}
		class="btn__dropdown"
		class:active={showContent}
		{title}
		aria-label={label}
	>
		<input type="checkbox" hidden aria-hidden="true" bind:checked={showContent} />
		<slot name="trigger" />
	</label>
</div>

{#if showContent}
	<Portal target="body">
		<div
			bind:this={contentRef}
			id={`${id}__content`}
			class="dropdown__content"
			transition:effect={{ duration, easing }}
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
