<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
	import { fly, slide } from 'svelte/transition';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { Icon } from '$lib/components';
	import { playlist } from '$lib/database';
	import { durationFormatter } from '$lib/utils';
	import { browser } from '$app/environment';

	let track: HTMLAudioElement;

	const INITIAL_STATE = {
		currentTrack: playlist[0],
		currentTime: 0,
		muted: false,
		volume: 0.1,
		repeat: false,
		shuffle: false
	};
	let playerStorage = browser
		? persist(writable(INITIAL_STATE), createLocalStorage(), 'player')
		: writable(INITIAL_STATE);

	export let currentTrack = $playerStorage.currentTrack;
	export let currentTime = $playerStorage.currentTime;
	export let muted = $playerStorage.muted;
	export let volume = $playerStorage.volume;
	export let repeat = $playerStorage.repeat;
	export let shuffle = $playerStorage.shuffle;
	export let duration = 0;
	export let paused = true;
	export let isLoading = false;
	export let openPlaylist = false;

	let currentIndex = playlist.findIndex(({ title }) => title === currentTrack.title);
	$: currentProgress = Math.min((10 / duration) * currentTime * 10, 100) || 0;
	$: displayedDuration = durationFormatter.format(duration * 1000);
	$: displayedCurrentTime = durationFormatter.format(currentTime * 1000);
	$: displayedVolume = muted ? 0 : volume * 100;
	$: volumeStatus =
		volume >= 0.5 ? 'high' : volume !== 0 ? 'low' : ('off' as 'high' | 'low' | 'off');

	const saveStorage = () =>
		($playerStorage = { currentTrack, currentTime, muted, volume, repeat, shuffle });

	const initAudio = () => {
		track = new Audio(currentTrack.source);
		track.preload = 'metadata';
		track.currentTime = currentTime;
		track.volume = volume;
		track.muted = muted;
		track.loop = repeat;
		track.onloadstart = () => (isLoading = true);
		track.onloadedmetadata = () => (isLoading = false);
		track.ondurationchange = () => (duration = track.duration);
		track.ontimeupdate = () => (currentTime = track.currentTime);
		track.onended = () => handleChangeTrack('next');
	};

	const handlePlay = async () => {
		paused ? await track.play() : track.pause();
		paused = !paused;
		paused && saveStorage();

		return paused;
	};

	const handleSelectTrack = async (index: number) => {
		currentTrack = playlist[index];
		track.src = currentTrack.source;
		currentTime = 0;
		duration = 0;
		saveStorage();

		await track.play();

		return currentTrack;
	};

	const handleChangeTrack = async (mode: 'prev' | 'next') => {
		if (mode === 'next')
			if (shuffle) currentIndex = Math.floor(Math.random() * playlist.length);
			else currentIndex = playlist.length === currentIndex + 1 ? 0 : currentIndex + 1;
		if (mode === 'prev') currentIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;

		currentTrack = playlist[currentIndex];
		track.src = currentTrack.source;
		currentTime = 0;
		duration = 0;
		saveStorage();

		!paused && (await track.play());

		return currentTrack;
	};

	const handleRepeat = () => {
		repeat = !repeat;
		track.loop = repeat;
		saveStorage();

		return repeat;
	};

	const handleShuffle = () => {
		shuffle = !shuffle;
		saveStorage();

		return shuffle;
	};

	const handleCurrentTime = (event: Event) => {
		const time = Number((event.target as HTMLInputElement).value);
		currentTime = (time * duration) / 100;
		track.currentTime = currentTime;
		saveStorage();

		return currentTime;
	};

	const handleVolume = (event: Event) => {
		volume = Number((event.target as HTMLInputElement).value) / 100;
		track.volume = volume;

		if (volume > 0) {
			muted = false;
			track.muted = muted;
		}

		saveStorage();

		return volume;
	};

	const handleMute = () => {
		muted = !muted;
		track.muted = muted;
		saveStorage();

		return muted;
	};

	const handleBeforeUnload = () => browser && saveStorage();

	onMount(() => {
		initAudio();
	});
</script>

<svelte:window on:beforeunload={handleBeforeUnload} />

<div class="player" in:fly={{ duration: 1000, y: 100, easing: expoOut }}>
	<div class="controls">
		<button
			class="btn__prev"
			title="Previous"
			aria-label="Previous track"
			on:click={() => handleChangeTrack('prev')}
		>
			<Icon icon="player-skip-back" small />
		</button>

		<button
			class="btn__play"
			class:loading={isLoading}
			title={paused ? 'Play' : 'Pause'}
			aria-label={`${paused ? 'Play' : 'Pause'} track`}
			on:click={handlePlay}
		>
			{#if !isLoading}
				{#if paused}
					<Icon icon="player-play" />
				{:else}
					<Icon icon="player-pause" />
				{/if}
			{/if}
		</button>

		<button
			class="btn__next"
			title="Next"
			aria-label="Next track"
			on:click={() => handleChangeTrack('next')}
		>
			<Icon icon="player-skip-forward" small />
		</button>

		<button
			class="btn__repeat"
			class:active={repeat}
			title="Repeat"
			aria-label="Repeat track"
			on:click={handleRepeat}
		>
			<Icon icon="repeat" small />
		</button>

		<button
			class="btn__shuffle"
			class:active={shuffle}
			title="Shuffle"
			aria-label="Shuffle tracks"
			on:click={handleShuffle}
		>
			<Icon icon="arrows-shuffle" small />
		</button>
	</div>

	<div class="progress__wrapper" class:loading={isLoading}>
		<span>{displayedCurrentTime}</span>

		<input
			class="progress__bar"
			type="range"
			min="0"
			max="100"
			step="0.01"
			value={currentProgress}
			on:input={handleCurrentTime}
		/>

		<span>{displayedDuration}</span>
	</div>

	<div class="dropdown dropdown-top dropdown-hover">
		<label class="btn__volume" tabindex="-1" title="Volume" aria-label="Volume">
			<input type="checkbox" hidden aria-hidden on:input={handleMute} />

			{#if muted}
				<Icon icon="volume-off" small />
			{:else if volumeStatus === 'high'}
				<Icon icon="volume" small />
			{:else if volumeStatus === 'low'}
				<Icon icon="volume-2" small />
			{:else if volumeStatus === 'off'}
				<Icon icon="volume-3" small />
			{/if}
		</label>

		<div class="dropdown-content h-40" tabindex="-1">
			<div class="volume__wrapper">
				<input
					class="volume"
					type="range"
					min="0"
					max="100"
					value={displayedVolume}
					on:input={handleVolume}
				/>
			</div>
		</div>
	</div>

	<a href={currentTrack.linkURL} target="_blank" rel="noopener noreferrer">
		<div class="info">
			<figure class="artwork">
				<img src={currentTrack.imageURL} alt={currentTrack.title} loading="lazy" />
			</figure>

			<div class="wrapper">
				<strong>{currentTrack.title}</strong>
				<span>{currentTrack.author}</span>
			</div>
		</div>
	</a>

	<label class="btn__playlist" title="Playlist" aria-label="Open playlist">
		<input type="checkbox" hidden aria-hidden bind:checked={openPlaylist} />

		{#if openPlaylist}
			<Icon icon="chevron-down" />
		{:else}
			<Icon icon="chevron-up" />
		{/if}
	</label>

	{#if openPlaylist}
		<div
			class="playlist"
			in:slide={{ duration: 300, easing: cubicOut }}
			out:slide={{ duration: 300, easing: cubicOut }}
		>
			<ul class="playlist__wrapper">
				{#each playlist as track, index}
					<li class="track">
						<button on:click={() => handleSelectTrack(index)}>
							<figure class="artwork">
								<img src={track.imageURL} alt={track.title} loading="lazy" />

								<div class="play__overlay">
									<Icon icon="player-play" />
								</div>
							</figure>

							<div class="wrapper">
								<strong>{track.title}</strong>
								<span>{track.author}</span>
							</div>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="scss">
	.player {
		@apply absolute z-50 left-0 right-0 bottom-0 flex items-center gap-4 p-4 bg-black/90 backdrop-blur-md border-solid border-white/10 select-none;
		border-top-width: 1px;

		& .controls {
			@apply flex items-center gap-2;

			& .btn__prev,
			& .btn__next {
				@apply btn btn-ghost btn-sm;
			}

			& .btn__play {
				@apply btn btn-circle btn-primary;

				&.loading {
					@apply before:m-0;
				}
			}

			& .btn__repeat,
			& .btn__shuffle {
				@apply btn btn-ghost btn-sm;

				&.active {
					@apply text-primary;
				}
			}
		}

		& .progress__wrapper {
			@apply flex items-center gap-2 w-full transition-opacity duration-300 ease-out;

			&:not(.loading):hover {
				& .progress__bar {
					@apply h-4;

					&::-webkit-slider-thumb {
						@apply bg-[hsl(var(--b1))];
					}
				}
			}

			&.loading {
				@apply opacity-50 pointer-events-none;

				& .progress__bar {
					&::-webkit-slider-thumb {
						@apply opacity-0;
					}
				}
			}

			& .progress__bar {
				@apply range range-primary range-xs w-full h-1;

				&::-webkit-slider-thumb {
					@apply bg-[hsl(var(--p))] opacity-100 transition-all ease-in-out;
				}
			}
		}

		& .btn__volume {
			@apply btn btn-ghost btn-sm;
		}

		& .volume__wrapper {
			@apply relative h-[9.25rem] w-12 bg-black/50 backdrop-blur-sm border-solid border-white/10;
			border-width: 1px;

			& .volume {
				@apply range range-primary range-xs absolute inset-0 w-28 h-4 -rotate-90 origin-center -translate-x-8 translate-y-16;
			}
		}

		& .info {
			@apply flex gap-2 items-center w-72 link link-hover;

			& .artwork {
				@apply w-12;
			}

			& .wrapper {
				@apply flex flex-col text-sm;
			}
		}

		& .btn__playlist {
			@apply btn btn-ghost;
		}
	}

	.playlist {
		@apply absolute -z-10 right-4 bottom-0 card card-bordered w-96 h-96 p-4 overflow-y-auto -translate-y-24 bg-black/90 backdrop-blur-md border-white/10;

		& .playlist__wrapper {
			@apply flex flex-col gap-2;

			& .track {
				@apply pb-2 border-white/10;
				border-bottom-width: 1px;

				&:hover {
					& button {
						& .artwork {
							& .play__overlay {
								@apply opacity-100;
							}
						}
					}
				}

				& button {
					@apply flex gap-2 items-center w-full link link-hover;

					& .artwork {
						@apply relative w-12;

						& .play__overlay {
							@apply absolute inset-0 grid place-items-center bg-black/75 opacity-0 transition-opacity ease-out;
						}
					}

					& .wrapper {
						@apply flex flex-col text-sm text-left;
					}
				}
			}
		}
	}
</style>
