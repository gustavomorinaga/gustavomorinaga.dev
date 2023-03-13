<script lang="ts">
	import { Icon, Metadata } from '$lib/components';
	import { LANG } from '$lib/stores';

	import { IMAGES_SVG } from '$lib/images';

	$: setup = [
		{
			title: $LANG.about.setup.motherboard,
			description: 'ASUS PRIME Z590-P WI-FI ATX LGA 1200',
			icon: IMAGES_SVG.iconMotherboard,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.cpu,
			description: 'INTEL CORE I7-11700K 3.6 GHz 8-core',
			icon: IMAGES_SVG.iconCPU,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.ram,
			description: 'CORSAIR VENGEANCE RGB PRO 64GB (4x16GB) DDR4-3600',
			icon: IMAGES_SVG.iconRAM,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.gpu,
			description: 'EVGA GEFORCE RTX 3070 Ti 8GB FTW3 ULTRA GAMING LHR',
			icon: IMAGES_SVG.iconGPU,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.ssd,
			description: 'SAMSUNG SSD 980 PRO 250GB M.2-2280',
			icon: IMAGES_SVG.iconHDD,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.ssd,
			description: 'SAMSUNG SSD 970 EVO PLUS 500GB M.2-2280',
			icon: IMAGES_SVG.iconHDD,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.hdd,
			description: 'WESTERN DIGITAL HDD WD BLUE 2 TB 3.5" 7200 RPM',
			icon: IMAGES_SVG.iconHDD,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.cooler,
			description: 'COOLER MASTER MASTERLIQUID ML240L V1 RIFLE',
			icon: IMAGES_SVG.iconCooler,
			alt: 'Created by Assia Benkerroum from Noun Project'
		},
		{
			title: $LANG.about.setup.powerSupply,
			description: 'XPG CORE REACTOR 850w 80+ GOLD SEMI ATX',
			icon: IMAGES_SVG.iconPowerSupply,
			alt: 'Created by Assia Benkerroum from Noun Project'
		},
		{
			title: $LANG.about.setup.pcTower,
			description: 'SHARKOON TG5 PRO RGB ATX MID TOWER',
			icon: IMAGES_SVG.iconPCTower,
			alt: 'Created by Assia Benkerroum from Noun Project'
		},
		{
			title: $LANG.about.setup.monitor,
			description: 'SAMSUNG 24F390 24" FULL HD 4ms',
			icon: IMAGES_SVG.iconMonitor,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.keyboard,
			description: 'KEYCHRON K2 V2 RGB GATERON RED',
			icon: IMAGES_SVG.iconKeyboard,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.mouse,
			description: 'CORSAIR HARPOON PRO',
			icon: IMAGES_SVG.iconMouse,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.audioInterface,
			description: 'FOCUSRITE SCARLETT SOLO 3rd GEN',
			icon: IMAGES_SVG.iconSoundCard,
			alt: 'Created by Assia Benkerroum from Noun Project'
		},
		{
			title: $LANG.about.setup.headset,
			description: 'HYPERX CLOUD STINGER',
			icon: IMAGES_SVG.iconHeadset,
			alt: 'Created by SAM Designs from Noun Project'
		},
		{
			title: $LANG.about.setup.microphone,
			description: 'UHURU XM-900 XLR',
			icon: IMAGES_SVG.iconMicrophone,
			alt: 'Created by Iki from Noun Project'
		}
	];
</script>

<Metadata
	title={$LANG.about.setup.metadata.title}
	description={$LANG.about.setup.metadata.description}
/>

<article class="setup">
	<h1>{$LANG.about.setup.title}</h1>

	<ul class="setup__list">
		{#each setup as component}
			<li>
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
