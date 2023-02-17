<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { CubeLoader } from '$lib/components/loaders';
	import { getGPUTier } from 'detect-gpu';

	// --- Three.js ---
	import * as THREE from 'three';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
	import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
	import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
	import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
	import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';

	let canvas: HTMLCanvasElement;

	export let isThree: boolean;
	export let isLowEnd: boolean;
	export let isMobile: boolean;
	export let finished: boolean;
	export let readMode: boolean;
	export let progress = 0;

	let scene: THREE.Scene;
	let renderer: THREE.WebGLRenderer;
	let clock: THREE.Clock;
	let animate: () => void;
	let sizes = {
		width: browser ? window.innerWidth : 1,
		height: browser ? window.innerHeight : 1
	};

	const initThree = () => {
		const loadingManager = new THREE.LoadingManager(
			() => (finished = true),
			(_, loaded, total) => (progress = Math.floor((loaded / total) * 100)),
			() => ((finished = false), (progress = 0))
		);

		// Scene
		scene = new THREE.Scene();

		// Textures
		const textureLoader = new THREE.TextureLoader(loadingManager);
		const gridTexture = textureLoader.load('images/webps/grid.webp');
		const terrainTexture = textureLoader.load('images/webps/displacement.webp');
		const metalnessTexture = textureLoader.load('images/webps/metalness.webp');
		const universeTexture = textureLoader.load('images/webps/universe.webp');

		// Background
		scene.background = universeTexture;
		scene.backgroundBlurriness = 0.5;
		scene.backgroundIntensity = 0.1;

		// Fog
		let fog = new THREE.Fog(new THREE.Color('#000000'), 0, 2.5);
		scene.fog = fog;

		// Objects
		let geometry = new THREE.PlaneGeometry(1, 2, 24, 24);
		let material = new THREE.MeshStandardMaterial({
			map: gridTexture,
			displacementMap: terrainTexture,
			displacementScale: 0.4,
			metalnessMap: metalnessTexture,
			metalness: 0.96,
			roughness: 0.5
		});

		let plane = new THREE.Mesh(geometry, material);
		plane.rotation.x = -Math.PI * 0.5;
		plane.position.y = 0.0;
		plane.position.z = 0.15;

		let plane2 = new THREE.Mesh(geometry, material);
		plane2.rotation.x = -Math.PI * 0.5;
		plane2.position.y = 0.0;
		plane2.position.z = -1.85;

		scene.add(plane);
		scene.add(plane2);

		// Light
		// Ambient Light
		let ambientLight = new THREE.AmbientLight('#ffffff', 10);
		scene.add(ambientLight);

		// Right Spotlight aiming to the left
		let spotlight = new THREE.SpotLight('#d53c3d', 20, 25, Math.PI * 0.1, 0.25);
		spotlight.position.set(0.5, 0.75, 2.2);
		// Target the spotlight to a specific point to the left of the scene
		spotlight.target.position.x = -0.25;
		spotlight.target.position.y = 0.25;
		spotlight.target.position.z = 0.25;
		scene.add(spotlight);
		scene.add(spotlight.target);

		// Left Spotlight aiming to the right
		let spotlight2 = new THREE.SpotLight('#d53c3d', 20, 25, Math.PI * 0.1, 0.25);
		spotlight2.position.set(-0.5, 0.75, 2.2);
		// Target the spotlight to a specific point to the right side of the scene
		spotlight2.target.position.x = 0.25;
		spotlight2.target.position.y = 0.25;
		spotlight2.target.position.z = 0.25;
		scene.add(spotlight2);
		scene.add(spotlight2.target);

		// Camera
		let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 20);
		camera.position.x = 0;
		camera.position.y = 0.06;
		camera.position.z = 1;

		// Renderer
		renderer = new THREE.WebGLRenderer({ canvas });
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Post Processing
		let effectComposer = new EffectComposer(renderer);
		effectComposer.setSize(sizes.width, sizes.height);
		effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		let renderPass = new RenderPass(scene, camera);
		effectComposer.addPass(renderPass);

		let rgbShiftPass = new ShaderPass(RGBShiftShader);
		rgbShiftPass.uniforms['amount'].value = 0.0015;
		effectComposer.addPass(rgbShiftPass);

		let gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
		effectComposer.addPass(gammaCorrectionPass);

		let filmPass = new FilmPass(0.35, 0.025, 648, 0);
		filmPass.renderToScreen = true;
		effectComposer.addPass(filmPass);

		const vignettePass = new ShaderPass(VignetteShader);
		vignettePass.uniforms['offset'].value = 1.5;
		effectComposer.addPass(vignettePass);

		// Event listener to handle screen resize
		window.addEventListener('resize', () => {
			// Update sizes
			sizes.width = window.innerWidth;
			sizes.height = window.innerHeight;

			// Update camera
			camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();

			// Update renderer
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

			// Update effect composer
			effectComposer.setSize(sizes.width, sizes.height);
			effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		});

		clock = new THREE.Clock();

		// Animate
		animate = () => {
			const elapsedTime = clock.getElapsedTime();

			plane.position.z = (elapsedTime * 0.15) % 2;
			plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;

			// Render
			// renderer.render(scene, camera);
			effectComposer.render();
		};

		return Promise.resolve(canvas);
	};

	// Call animate again on the next frame
	$: if (browser && isThree && finished) {
		if (!readMode) {
			renderer?.setAnimationLoop(animate);
		} else {
			renderer?.setAnimationLoop(animate);
			setTimeout(() => renderer?.setAnimationLoop(null), 300);
		}
	}

	onMount(async () => {
		if (isThree && !isMobile) await initThree();
	});
</script>

<svelte:window
	on:blur={() => renderer?.setAnimationLoop(null)}
	on:focus={() => renderer?.setAnimationLoop(animate)}
/>

<div
	class="background__container"
	class:read__mode={readMode}
	class:loading={isThree ? !finished : false}
>
	{#if isThree}
		<div class="loader">
			<CubeLoader />
		</div>

		<canvas bind:this={canvas} class="webgl" />
	{:else if !isLowEnd}
		<div class="fallback__image" />
	{/if}
</div>

<style lang="scss">
	.background__container {
		@apply fixed -z-10 inset-0 w-full h-full overflow-hidden;

		&::after {
			content: '';
			@apply absolute inset-0 z-0 block bg-black opacity-75 transition-all ease-out duration-300;
		}

		&.read__mode {
			@apply after:opacity-80;
		}

		&.loading {
			@apply z-[100] after:bg-base-100 after:opacity-100 after:backdrop-blur-sm;

			&::after {
				background-image: url('/images/svgs/hexagons.svg');
			}

			& .loader {
				@apply opacity-100 shadow-lg shadow-black;
			}
		}

		& .loader {
			@apply absolute inset-0 z-10 grid place-items-center opacity-0 transition-opacity ease-out duration-300;
		}

		& .fallback__image {
			@apply bg-center bg-cover bg-no-repeat w-full h-full;
			background-image: url('/images/svgs/synthwave.svg');
		}
	}
</style>
