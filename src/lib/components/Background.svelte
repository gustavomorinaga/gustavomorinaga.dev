<script lang="ts">
	import { onMount } from 'svelte';

	import { getGPUTier } from 'detect-gpu';

	// --- Three.js ---
	import * as THREE from 'three';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
	import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';

	let load3DVersion = true;

	const loadThree = () => {
		// Textures
		const textureLoader = new THREE.TextureLoader();
		const gridTexture = textureLoader.load('images/pngs/grid.png');
		const terrainTexture = textureLoader.load('images/pngs/displacement.png');
		const metalnessTexture = textureLoader.load('images/pngs/metalness.png');

		let canvas = document.querySelector('canvas.webgl') as HTMLElement;
		// Scene
		const scene = new THREE.Scene();

		// Fog
		const fog = new THREE.Fog('#000000', 1, 2.5);
		scene.fog = fog;

		// Objects
		const geometry = new THREE.PlaneGeometry(1, 2, 24, 24);
		const material = new THREE.MeshStandardMaterial({
			map: gridTexture,
			displacementMap: terrainTexture,
			displacementScale: 0.4,
			metalnessMap: metalnessTexture,
			metalness: 0.96,
			roughness: 0.5
		});

		const plane = new THREE.Mesh(geometry, material);
		plane.rotation.x = -Math.PI * 0.5;
		plane.position.y = 0.0;
		plane.position.z = 0.15;

		const plane2 = new THREE.Mesh(geometry, material);
		plane2.rotation.x = -Math.PI * 0.5;
		plane2.position.y = 0.0;
		plane2.position.z = -1.85;

		scene.add(plane);
		scene.add(plane2);

		// Light
		// Ambient Light
		const ambientLight = new THREE.AmbientLight('#ffffff', 10);
		scene.add(ambientLight);

		// Right Spotlight aiming to the left
		const spotlight = new THREE.SpotLight('#d53c3d', 20, 25, Math.PI * 0.1, 0.25);
		spotlight.position.set(0.5, 0.75, 2.2);
		// Target the spotlight to a specific point to the left of the scene
		spotlight.target.position.x = -0.25;
		spotlight.target.position.y = 0.25;
		spotlight.target.position.z = 0.25;
		scene.add(spotlight);
		scene.add(spotlight.target);

		// Left Spotlight aiming to the right
		const spotlight2 = new THREE.SpotLight('#d53c3d', 20, 25, Math.PI * 0.1, 0.25);
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
		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 20);
		camera.position.x = 0;
		camera.position.y = 0.06;
		camera.position.z = 1.1;

		// Renderer
		const renderer = new THREE.WebGLRenderer({
			canvas: canvas
		});
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Post Processing
		const effectComposer = new EffectComposer(renderer);
		effectComposer.setSize(sizes.width, sizes.height);
		effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const renderPass = new RenderPass(scene, camera);
		effectComposer.addPass(renderPass);

		const rgbShiftPass = new ShaderPass(RGBShiftShader);
		rgbShiftPass.uniforms['amount'].value = 0.0015;

		effectComposer.addPass(rgbShiftPass);

		const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
		effectComposer.addPass(gammaCorrectionPass);

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
		const tick = () => {
			const elapsedTime = clock.getElapsedTime();

			plane.position.z = (elapsedTime * 0.15) % 2;
			plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;

			// Render
			// renderer.render(scene, camera);
			effectComposer.render();

			// Call tick again on the next frame
			window.requestAnimationFrame(tick);
		};

		tick();
	};

	onMount(async () => {
		const { tier } = await getGPUTier();

		// tier: 1 (>= 15 fps), tier: 2 (>= 30 fps) or tier: 3 (>= 60 fps)
		load3DVersion = tier > 1;
		load3DVersion && loadThree();
	});
</script>

{#if load3DVersion}
	<canvas class="webgl" />
{:else}
	<div class="fallback__image" />
{/if}

<style lang="scss">
	.fallback__image {
		@apply bg-synthwave bg-center bg-cover bg-no-repeat w-full h-full;
	}
</style>
