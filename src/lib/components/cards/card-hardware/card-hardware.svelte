<script lang="ts">
	import { Icon } from '$lib/components';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';
	import { balancer } from 'svelte-action-balancer';
	import type { IHardware } from '$lib/ts';

	export let hardware: IHardware;

	const { title, description, icon, alt } = hardware;

	const handleSetupAchievement = () => ACHIEVEMENTS.unlock('GMD_SETUP');
</script>

<a
	class="hardware"
	href="https://google.com/search?q={description.split(' ').join('+')}"
	title={$LANG.about.setup.link}
	aria-label={$LANG.about.setup.link}
	target="_blank"
	rel="noopener noreferrer"
	on:click={handleSetupAchievement}
>
	{#if icon}
		<figure>
			<img src={icon} {alt} width="64" height="64" loading="lazy" />
		</figure>
	{/if}

	<div class="external">
		<Icon icon="external-link" />
	</div>

	<div class="card-body">
		<h4>{title}</h4>

		<p use:balancer>{description}</p>
	</div>
</a>

<style lang="scss" global>
	a.hardware {
		@apply card-bordered card card-side card-compact h-full bg-base-100/75 shadow-lg backdrop-blur-md transition duration-700 ease-smooth;

		@media (hover: hover) {
			&:hover {
				@apply border-primary no-underline shadow-glow shadow-primary/10;

				& .external {
					@apply opacity-100;
				}
			}
		}

		& figure {
			@apply my-4 ml-4 aspect-square h-16 w-16;

			& > img {
				@apply shadow-primary drop-shadow-sm;
			}
		}

		& .external {
			@apply absolute right-2 top-2 hidden text-base-content opacity-0 transition-opacity duration-300 ease-out md:block;
		}

		& .card-body {
			& h4 {
				@apply font-futuristic text-lg text-base-content shadow-primary text-shadow-glow md:text-xl;
			}

			& p {
				@apply text-base text-base-content;
			}
		}
	}

	html.low__end {
		& a.hardware {
			@apply backdrop-blur-none;
		}
	}
</style>
