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
		@apply card card-side card-compact card-bordered h-full bg-base-100/75 shadow-lg backdrop-blur-md transition duration-700 ease-smooth;

		@media (hover: hover) {
			&:hover {
				@apply no-underline border-primary shadow-glow shadow-primary/10;

				& .external {
					@apply opacity-100;
				}
			}
		}

		& figure {
			@apply w-16 h-16 my-4 ml-4 aspect-square;

			& > img {
				@apply drop-shadow-sm shadow-primary;
			}
		}

		& .external {
			@apply hidden md:block absolute top-2 right-2 text-base-content opacity-0 transition-opacity duration-300 ease-out;
		}

		& .card-body {
			& h4 {
				@apply text-lg md:text-xl text-base-content font-futuristic text-shadow-glow shadow-primary;
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
