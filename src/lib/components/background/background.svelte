<script lang="ts" module>
	import { onMount } from 'svelte';
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

	export let isThree = true;
	export let progress = 0;
	export let finished = false;

	const initThree = () => {
		const loadingManager = new THREE.LoadingManager(
			() => (finished = true),
			(_, loaded, total) => (progress = Math.floor((loaded / total) * 100))
		);

		// Scene
		const scene = new THREE.Scene();

		// Textures
		const textureLoader = new THREE.TextureLoader(loadingManager);
		const gridTexture = textureLoader.load('images/pngs/grid.png');
		const terrainTexture = textureLoader.load('images/pngs/displacement.png');
		const metalnessTexture = textureLoader.load('images/pngs/metalness.png');
		const universeTexture = textureLoader.load('images/pngs/universe.jpg');

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

		// Sizes
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		// Camera
		let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 20);
		camera.position.x = 0;
		camera.position.y = 0.06;
		camera.position.z = 1;

		// Renderer
		let renderer = new THREE.WebGLRenderer({ canvas });
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

		const clock = new THREE.Clock();

		// Animate
		const animate = () => {
			const elapsedTime = clock.getElapsedTime();

			plane.position.z = (elapsedTime * 0.15) % 2;
			plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;

			// Render
			// renderer.render(scene, camera);
			effectComposer.render();

			// Call animate again on the next frame
			window.requestAnimationFrame(animate);
		};

		animate();

		return Promise.resolve(canvas);
	};

	onMount(async () => {
		const { tier } = await getGPUTier();

		// tier: 1 (>= 15 fps), tier: 2 (>= 30 fps) or tier: 3 (>= 60 fps)
		isThree = tier > 1;
		isThree && (await initThree());
	});
</script>

<div class="background__container" class:loading={isThree ? !finished : false}>
	{#if isThree}
		<div class="loader">
			<div class="radial-progress" style="--value:{progress}; --size:5rem; --thickness: 4px;">
				{progress.toFixed()}%
			</div>
		</div>

		<canvas bind:this={canvas} class="webgl" />
	{:else}
		<div class="fallback__image" style="--synthwave: url('/images/svgs/synthwave.svg');" />
	{/if}
</div>

<style lang="scss">
	.background__container {
		@apply fixed -z-10 inset-0 w-full h-full;

		&::after {
			content: '';
			@apply absolute inset-0 z-0 block bg-black opacity-50 transition-all ease-out duration-300;
		}

		&.loading {
			@apply z-50 after:opacity-100 after:backdrop-blur-sm;

			& .loader {
				@apply opacity-100;
			}
		}

		& .loader {
			@apply absolute inset-0 z-10 grid place-items-center opacity-0 transition-opacity ease-out duration-300;

			& .radial-progress {
				@apply text-red-500 text-shadow-glow shadow-red-700;
			}
		}

		& .fallback__image {
			@apply bg-center bg-cover bg-no-repeat w-full h-full;
			background-image: var(--synthwave);
		}
	}
</style>
