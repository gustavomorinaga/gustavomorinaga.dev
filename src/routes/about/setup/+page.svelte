<script lang="ts">
	import { onMount } from 'svelte';
	import { Icon, Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';
	import { observeScroll } from '$lib/utils';

	import motherboardSVG from '$lib/images/svgs/icon-motherboard.svg';
	import cpuSVG from '$lib/images/svgs/icon-cpu.svg';
	import ramSVG from '$lib/images/svgs/icon-ram.svg';
	import gpuSVG from '$lib/images/svgs/icon-gpu.svg';
	import hddSVG from '$lib/images/svgs/icon-hdd.svg';
	import coolerSVG from '$lib/images/svgs/icon-cooler.svg';
	import powerSupplySVG from '$lib/images/svgs/icon-power-supply.svg';
	import pcTowerSVG from '$lib/images/svgs/icon-pc-tower.svg';
	import monitorSVG from '$lib/images/svgs/icon-monitor.svg';
	import keyboardSVG from '$lib/images/svgs/icon-keyboard.svg';
	import mouseSVG from '$lib/images/svgs/icon-mouse.svg';
	import soundCardSVG from '$lib/images/svgs/icon-sound-card.svg';
	import headsetSVG from '$lib/images/svgs/icon-headset.svg';
	import microphoneSVG from '$lib/images/svgs/icon-microphone.svg';

	$: setup = [
		{
			title: $LANG.about.setup.motherboard,
			description: 'ASUS PRIME Z590-P WI-FI ATX LGA 1200',
			icon: motherboardSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.cpu,
			description: 'INTEL CORE I7-11700K 3.6 GHz 8-core',
			icon: cpuSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.ram,
			description: 'CORSAIR VENGEANCE RGB PRO 64GB (4x16GB) DDR4-3600',
			icon: ramSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.gpu,
			description: 'EVGA GEFORCE RTX 3070 Ti 8GB FTW3 ULTRA GAMING LHR',
			icon: gpuSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.ssd,
			description: 'SAMSUNG SSD 980 PRO 250GB M.2-2280',
			icon: hddSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.ssd,
			description: 'SAMSUNG SSD 970 EVO PLUS 500GB M.2-2280',
			icon: hddSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.hdd,
			description: 'WESTERN DIGITAL HDD WD BLUE 2 TB 3.5" 7200 RPM',
			icon: hddSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.cooler,
			description: 'COOLER MASTER MASTERLIQUID ML240L V1 RIFLE',
			icon: coolerSVG,
			alt: 'Created by Assia Benkerroum from Noun Project'
		},
		{
			title: $LANG.about.setup.powerSupply,
			description: 'XPG CORE REACTOR 850w 80+ GOLD SEMI ATX',
			icon: powerSupplySVG,
			alt: 'Created by Assia Benkerroum from Noun Project'
		},
		{
			title: $LANG.about.setup.pcTower,
			description: 'SHARKOON TG5 PRO RGB ATX MID TOWER',
			icon: pcTowerSVG,
			alt: 'Created by Assia Benkerroum from Noun Project'
		},
		{
			title: $LANG.about.setup.monitor,
			description: 'SAMSUNG 24F390 24" FULL HD 4ms',
			icon: monitorSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.keyboard,
			description: 'KEYCHRON K2 V2 RGB GATERON RED',
			icon: keyboardSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.mouse,
			description: 'CORSAIR HARPOON PRO',
			icon: mouseSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.audioInterface,
			description: 'FOCUSRITE SCARLETT SOLO 3rd GEN',
			icon: soundCardSVG,
			alt: 'Created by Assia Benkerroum from Noun Project'
		},
		{
			title: $LANG.about.setup.headset,
			description: 'HYPERX CLOUD STINGER',
			icon: headsetSVG,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.microphone,
			description: 'UHURU XM-900 XLR',
			icon: microphoneSVG,
			alt: 'Created by Iki from Noun Project'
		}
	];

	onMount(() => {
		const { observer } = observeScroll({ threshold: 0.5 });

		return () => observer && observer.disconnect();
	});
</script>

<Metadata
	title={$LANG.about.setup.metadata.title}
	description={$LANG.about.setup.metadata.description}
/>

<article class="setup">
	<h1>{$LANG.about.setup.title}</h1>

	<ul class="setup__list">
		{#each setup as component, index}
			<li class="observe__scroll" style="--order: {index + 1}; --delay: 50ms;">
				<a
					class="component"
					href="https://google.com/search?q={component.description.split(' ').join('+')}"
					target="_blank"
					rel="noopener noreferrer"
				>
					{#if component.icon}
						<figure>
							<img src={component.icon} alt={component.alt} width="64" height="64" loading="lazy" />
						</figure>
					{/if}

					<div class="external">
						<Icon icon="external-link" />
					</div>

					<div class="card-body">
						<h4>{component.title}</h4>

						<p>{component.description}</p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</article>

<style lang="scss" global>
	article.setup {
		& h1 {
			@apply text-4xl md:text-5xl font-futuristic text-shadow-rgb mb-8;
		}

		& .setup__list {
			@apply grid row-auto gap-4 max-h-[35rem] pr-4 overflow-y-auto scrollbar__theme;

			& .component {
				@apply card card-side card-compact card-bordered h-full bg-base-100/50 shadow-lg shadow-black backdrop-blur-md transition duration-700 ease-smooth;

				&:hover {
					@apply no-underline border-primary shadow-glow shadow-primary/10;

					& .external {
						@apply opacity-100;
					}
				}

				& figure {
					@apply w-16 h-16 my-4 ml-4 aspect-square;

					& > img {
						@apply drop-shadow-sm shadow-primary;
					}
				}

				& .external {
					@apply absolute top-2 right-2 text-base-content opacity-0 transition-opacity duration-300 ease-out;
				}

				& .card-body {
					@apply max-w-[70vw] md:max-w-full;

					& h4 {
						@apply text-xl text-base-content font-futuristic text-shadow-glow shadow-primary;
					}

					& p {
						@apply text-base text-base-content;
					}
				}
			}
		}
	}
</style>
