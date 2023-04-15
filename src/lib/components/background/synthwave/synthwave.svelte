<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { IMAGES_WEBP } from '$lib/images';
	import { Clock, MeshStandardMaterial, PlaneGeometry } from 'three';
	import { AmbientLight, Fog, Pass, SpotLight, T, useFrame, useTexture } from '@threlte/core';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
	import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
	import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
	import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
	import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
	import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';

	export let finished = false;
	export let readMode = false;

	const [gridTexture, terrainTexture, metalnessTexture] = useTexture([
		IMAGES_WEBP.grid,
		IMAGES_WEBP.displacement,
		IMAGES_WEBP.metalness
	]);

	let zPositions = [0.15, -1.85];
	let clock = new Clock();
	let geometry = new PlaneGeometry(1, 2, 24, 24);
	let material = new MeshStandardMaterial({
		map: gridTexture,
		displacementMap: terrainTexture,
		displacementScale: 0.4,
		metalnessMap: metalnessTexture,
		metalness: 0.75,
		roughness: 0.5
	});

	const [rgbFX, gammaFX, vignetteFX, filmFX, glitchFX] = [
		new ShaderPass(RGBShiftShader),
		new ShaderPass(GammaCorrectionShader),
		new ShaderPass(VignetteShader),
		new FilmPass(0.35, 0.025, 648, 0),
		new GlitchPass(0.5)
	];

	rgbFX.uniforms['amount'].value = 0.001;
	vignetteFX.uniforms['offset'].value = 1.5;

	$: sizes = {
		width: browser ? window.innerWidth : 1,
		height: browser ? window.innerHeight : 1
	};
	$: (filmFX as any).uniforms['grayscale'].value = Number(!!$page.error);

	useFrame(() => {
		if ($page.error || readMode) return;

		const newPosition = (clock.getElapsedTime() * 0.075) % 2;

		zPositions = [newPosition, newPosition - 2];
	});

	onMount(() => {
		setTimeout(() => (finished = true), 300);
	});
</script>

<T.Group>
	<T.PerspectiveCamera
		makeDefault
		viewportAware
		aspect={sizes.width / sizes.height}
		position={[0, 0.06, 1]}
		near={0.01}
		far={20}
		fov={75}
	/>

	<Fog near={0} far={2.5} color="#000000" />

	<T.Mesh
		{geometry}
		{material}
		position={[0, 0, zPositions[0]]}
		rotation={[-Math.PI * 0.5, 0, 0]}
		viewportAware
	/>
	<T.Mesh
		{geometry}
		{material}
		position={[0, 0, zPositions[1]]}
		rotation={[-Math.PI * 0.5, 0, 0]}
		viewportAware
	/>

	<AmbientLight color="#FFFFFF" intensity={10} />
	<SpotLight
		target={{ x: -0.25, y: 0.25, z: 0.25 }}
		position={{ x: 0.5, y: 0.75, z: 2.2 }}
		color="#EF4444"
		intensity={20}
		distance={25}
		angle={Math.PI * 0.1}
		penumbra={0.2}
	/>
	<SpotLight
		target={{ x: 0.25, y: 0.25, z: 0.25 }}
		position={{ x: -0.5, y: 0.75, z: 2.2 }}
		color="#EF4444"
		intensity={20}
		distance={25}
		angle={Math.PI * 0.1}
		penumbra={0.2}
	/>

	<Pass pass={gammaFX} />
	<Pass pass={filmFX} />
	<Pass pass={rgbFX} />
	<Pass pass={vignetteFX} />

	{#if $page.error}
		<Pass pass={glitchFX} />
	{/if}
</T.Group>
