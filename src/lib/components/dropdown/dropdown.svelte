<script lang="ts">
	import { slide } from 'svelte/transition';

	let activationRef: HTMLElement;
	let contentRef: HTMLElement;
	export let showContent = false;
	export let title = '';
	export let label = '';
	export let inTransition = slide;
	export let outTransition = slide;

	const handleBlur = (event: Event) => {
		const currentTarget = event.target as Node;

		if (showContent && !activationRef?.contains(currentTarget))
			showContent = contentRef?.contains(currentTarget);
	};
</script>

<svelte:window on:click={handleBlur} />

<div class="dropdown__wrapper {$$restProps.class}">
	<label
		bind:this={activationRef}
		class="btn__dropdown"
		class:active={showContent}
		{title}
		aria-label={label}
	>
		<input type="checkbox" hidden aria-hidden="true" bind:checked={showContent} />
		<slot name="button" />
	</label>

	{#if showContent}
		<div bind:this={contentRef} class="dropdown__content" in:inTransition out:outTransition>
			<slot name="content" />
		</div>
	{/if}
</div>

<style lang="scss">
	.dropdown__wrapper {
		@apply relative;

		& .dropdown__content {
			@apply fixed;
		}
	}
</style>
