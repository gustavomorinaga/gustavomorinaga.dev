<script lang="ts">
	import { CardHardware, Metadata } from '$lib/components';
	import { IMAGES_SVG } from '$lib/images';
	import { LANG } from '$lib/stores';
	import type { IHardware } from '$lib/ts';

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
			description: 'Dell 34 Curved Gaming Monitor S3422DWG',
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
	] satisfies IHardware[];
</script>

<Metadata
	title={$LANG.about.setup.metadata.title}
	description={$LANG.about.setup.metadata.description}
/>

<section class="setup">
	<h1>{$LANG.about.setup.title}</h1>

	<ul class="components">
		{#each setup as hardware}
			<li>
				<CardHardware {hardware} />
			</li>
		{/each}
	</ul>
</section>

<style lang="scss" global>
	section.setup {
		@apply block;

		& > h1 {
			@apply mb-8 font-futuristic text-3xl text-shadow-rgb md:text-5xl;
		}

		& > ul.components {
			@apply flex flex-col gap-4;
		}
	}
</style>
