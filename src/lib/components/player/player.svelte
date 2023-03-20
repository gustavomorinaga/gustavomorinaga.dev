<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { PUBLIC_CMS_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
	import { tweened } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { Dropdown, Icon } from '$lib/components';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';
	import { containerElement, durationFormatter, getMinDiff } from '$lib/utils';
	import Portal from 'svelte-portal';
	import type { IPlaylist } from '$lib/types';

	export let playlist: IPlaylist[] = [];

	const HOST = dev ? PUBLIC_CMS_URL : '';
	const MAX_IDLE_MINUTES = 3;
	const INITIAL_STATE = {
		showPlayer: false,
		currentTrack: playlist[0],
		currentTime: 0,
		muted: false,
		volume: 0.1,
		repeat: false,
		shuffle: false
	};
	const playerOffset = tweened(0, { duration: 1000, easing: expoOut });
	const currentProgress = tweened(0, { duration: 300, easing: expoOut });

	let playerRef: HTMLElement;
	let trackElementRef: HTMLAudioElement;
	let playerOffsetRef: HTMLElement;
	let playerStorage = browser
		? persist(writable(INITIAL_STATE), createLocalStorage(), 'player')
		: writable(INITIAL_STATE);

	let showPlayer = $playerStorage.showPlayer;
	let currentTrack = $playerStorage.currentTrack;
	let currentTime = $playerStorage.currentTime;
	let muted = $playerStorage.muted;
	let volume = $playerStorage.volume;
	let repeat = $playerStorage.repeat;
	let shuffle = $playerStorage.shuffle;
	let duration = 0;
	let paused = true;
	let isLoading = false;
	let showPlaylist = false;
	let idleTime = new Date();
	let songsPlayed = 1;

	$: currentIndex = playlist.findIndex(({ title }) => title === currentTrack.title);
	$: currentProgress.set(Math.min((10 / duration) * currentTime * 10, 100) || 0);
	$: displayedDuration = durationFormatter.format(duration * 1000);
	$: displayedCurrentTime = durationFormatter.format(currentTime * 1000);
	$: displayedVolume = muted ? 0 : volume * 100;
	$: volumeStatus =
		volume >= 0.5 ? 'high' : volume !== 0 ? 'low' : ('off' as 'high' | 'low' | 'off');
	$: playerOffset.set(showPlayer ? playerRef?.offsetHeight || 0 : 0);
	$: if (browser) {
		if (!paused) window.addEventListener('beforeunload', handleBeforeUnload);
		else window.removeEventListener('beforeunload', handleBeforeUnload);
	}
	$: if (playerOffsetRef && containerElement) {
		playerOffsetRef.style.height = `${$playerOffset}px`;

		if (
			containerElement.scrollTop + containerElement.clientHeight >
			containerElement.scrollHeight - 100
		)
			containerElement.scrollTo(0, containerElement.scrollTop + $playerOffset);
	}

	const saveStorage = async () => {
		$playerStorage = { showPlayer, currentTrack, currentTime, muted, volume, repeat, shuffle };

		return Promise.resolve($playerStorage);
	};

	const initAudio = () => {
		trackElementRef = new Audio(HOST + currentTrack.source.url);
		trackElementRef.preload = 'auto';
		trackElementRef.currentTime = currentTime;
		trackElementRef.volume = volume;
		trackElementRef.muted = muted;
		trackElementRef.loop = repeat;
		trackElementRef.onloadstart = () => (isLoading = true);
		trackElementRef.onloadedmetadata = () => (isLoading = false);
		trackElementRef.ondurationchange = () => (duration = trackElementRef.duration);
		trackElementRef.ontimeupdate = () => (currentTime = trackElementRef.currentTime);
		trackElementRef.onended = () => {
			handleChangeTrack('next');
			!ACHIEVEMENTS.unlocked('GMD_SONG') && handleSongAchievement();
		};

		return Promise.resolve(trackElementRef);
	};

	const handlePlay = async () => {
		if (paused) {
			if (getMinDiff(idleTime) >= MAX_IDLE_MINUTES) {
				trackElementRef.load();
				trackElementRef.currentTime = currentTime;
			}

			await trackElementRef.play();
		} else {
			trackElementRef.pause();
			idleTime = new Date();
		}

		paused = !paused;
		paused && (await saveStorage());

		return paused;
	};

	const handleSelectTrack = async (index: number) => {
		currentTrack = playlist[index];
		trackElementRef.src = HOST + currentTrack.source.url;
		currentTime = 0;
		duration = 0;

		await saveStorage();

		await trackElementRef.play();
		paused = false;

		return currentTrack;
	};

	const handleChangeTrack = async (mode: 'prev' | 'next') => {
		if (mode === 'next')
			if (shuffle) currentIndex = Math.floor(Math.random() * playlist.length);
			else currentIndex = playlist.length === currentIndex + 1 ? 0 : currentIndex + 1;
		if (mode === 'prev') currentIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;

		currentTrack = playlist[currentIndex];
		trackElementRef.src = HOST + currentTrack.source.url;
		currentTime = 0;
		duration = 0;

		await saveStorage();

		!paused && (await trackElementRef.play());

		return currentTrack;
	};

	const handleRepeat = async () => {
		repeat = !repeat;
		trackElementRef.loop = repeat;

		await saveStorage();

		return repeat;
	};

	const handleShuffle = async () => {
		shuffle = !shuffle;

		await saveStorage();

		return shuffle;
	};

	const handleCurrentTime = async (event: Event) => {
		const time = Number((event.target as HTMLInputElement).value);
		currentTime = (time * duration) / 100;
		trackElementRef.currentTime = currentTime;

		await saveStorage();

		return currentTime;
	};

	const handleVolume = async (event: Event) => {
		volume = Number((event.target as HTMLInputElement).value) / 100;
		trackElementRef.volume = volume;

		if (volume > 0) {
			muted = false;
			trackElementRef.muted = muted;
		}

		await saveStorage();

		return volume;
	};

	const handleMute = async () => {
		muted = !muted;
		trackElementRef.muted = muted;

		await saveStorage();

		return muted;
	};

	const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
		event.preventDefault();
		paused = true;
		await saveStorage();

		window.removeEventListener('beforeunload', handleBeforeUnload);
	};

	const handleShowPlayer = () => {
		showPlayer = !showPlayer;
		saveStorage();
	};

	const handleSongAchievement = () => {
		songsPlayed++;
		songsPlayed === 3 && ACHIEVEMENTS.unlock('GMD_SONG');
	};

	onMount(async () => {
		await initAudio();

		playerOffsetRef = document.querySelector('#player-offset') as HTMLElement;
	});
</script>

<Portal>
	{#if showPlayer}
		<div
			id="player"
			bind:this={playerRef}
			in:fly={{ duration: 1000, y: 100, easing: expoOut }}
			out:fly={{ duration: 1000, y: 100, easing: expoOut }}
		>
			<div class="player__wrapper">
				<div class="progress__wrapper" class:refreshing={isLoading}>
					<input
						class="progress__bar"
						type="range"
						min="0"
						max="100"
						step="0.01"
						value={$currentProgress}
						on:input={handleCurrentTime}
					/>
				</div>

				<a
					class="info"
					href={currentTrack.url}
					title={$LANG.player.link}
					aria-label={$LANG.player.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div class="info__wrapper">
						<figure class="artwork">
							<img
								src={HOST + currentTrack.cover.formats.thumbnail.url}
								alt={currentTrack.title}
								width="56"
								height="56"
								loading="lazy"
							/>

							<div class="artwork__overlay">
								<Icon icon="brand-soundcloud" />
							</div>
						</figure>

						<div class="wrapper">
							<strong>{currentTrack.title}</strong>
							<span>{currentTrack.author}</span>

							<div class="duration">
								{displayedCurrentTime} / {displayedDuration}
							</div>
						</div>
					</div>
				</a>

				<div class="controls">
					<button
						class="btn__shuffle"
						class:active={shuffle}
						title={$LANG.player.shuffle}
						aria-label={$LANG.player.shuffle}
						on:click={handleShuffle}
					>
						<Icon icon="arrows-shuffle" size="sm" />
					</button>

					<button
						class="btn__prev"
						title={$LANG.player.prev}
						aria-label={$LANG.player.prev}
						on:click={() => handleChangeTrack('prev')}
					>
						<Icon icon="player-skip-back" size="sm" />
					</button>

					<button
						class="btn__play"
						class:loading={isLoading}
						title={paused ? $LANG.player.play : $LANG.player.pause}
						aria-label={`${paused ? $LANG.player.play : $LANG.player.pause}`}
						on:click={handlePlay}
					>
						{#if !isLoading}
							<Icon icon={paused ? 'player-play' : 'player-pause'} />
						{/if}
					</button>

					<button
						class="btn__next"
						title={$LANG.player.next}
						aria-label={$LANG.player.next}
						on:click={() => handleChangeTrack('next')}
					>
						<Icon icon="player-skip-forward" size="sm" />
					</button>

					<button
						class="btn__repeat"
						class:active={repeat}
						title={$LANG.player.repeat}
						aria-label={$LANG.player.repeat}
						on:click={handleRepeat}
					>
						<Icon icon="repeat" size="sm" />
					</button>
				</div>

				<div class="right-controls">
					<div class="dropdown dropdown-top dropdown-hover">
						<label
							class="btn__volume"
							tabindex="-1"
							title={$LANG.player.volume}
							aria-label={$LANG.player.volume}
						>
							<input type="checkbox" hidden aria-hidden="true" on:input={handleMute} />

							<Icon
								icon={muted
									? 'volume-off'
									: volumeStatus === 'high'
									? 'volume'
									: volumeStatus === 'low'
									? 'volume-2'
									: 'volume-3'}
								size="sm"
							/>
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

					<Dropdown
						id="playlist"
						bind:showContent={showPlaylist}
						title={$LANG.player.playlist}
						label={$LANG.player.playlist}
					>
						<svelte:fragment slot="trigger">
							<Icon icon="playlist" size="sm" />
						</svelte:fragment>

						<svelte:fragment slot="content">
							<ul class="playlist__wrapper">
								{#each playlist as track, index}
									<li class="track" class:playing={currentIndex === index}>
										<button on:click={() => handleSelectTrack(index)}>
											<figure class="artwork">
												<img
													src={HOST + track.cover.formats.thumbnail.url}
													alt={track.title}
													width="48"
													height="48"
													loading="lazy"
												/>

												<div class="artwork__overlay">
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
						</svelte:fragment>
					</Dropdown>

					<button
						class="btn__collapse"
						title={$LANG.player.hide}
						aria-label={$LANG.player.hide}
						on:click={handleShowPlayer}
					>
						<Icon icon="caret-down" size="sm" />
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div id="miniplayer" in:fade={{ duration: 300, easing: cubicOut }} out:fade={{ duration: 100 }}>
			<figure class="artwork">
				<img
					src={HOST + currentTrack.cover.formats.thumbnail.url}
					alt={currentTrack.title}
					width="56"
					height="56"
					loading="lazy"
				/>
			</figure>

			<div class="overlay" class:show={isLoading}>
				<button
					class="btn__bar"
					class:loading={isLoading}
					title={$LANG.player.show}
					aria-label={$LANG.player.show}
					on:click={handleShowPlayer}
				>
					{#if !isLoading}
						<Icon icon="music" />
					{/if}
				</button>
			</div>

			<span class="progress__bar" class:hidden={paused} style="width: {$currentProgress}%;" />
		</div>

		<button
			class="btn__player"
			class:playing={!paused}
			class:refreshing={isLoading}
			title={$LANG.player.show}
			aria-label={$LANG.player.show}
			on:click={handleShowPlayer}
			in:fade={{ duration: 300, easing: cubicOut }}
			out:fade={{ duration: 100 }}
		>
			<Icon icon="music" />
		</button>
	{/if}
</Portal>

<style lang="scss" global>
	#player {
		@apply fixed z-40 left-0 right-0 bottom-0 bg-base-100/50 backdrop-blur-md shadow-lg;

		& .player__wrapper {
			@apply flex items-center justify-between sm:gap-2 pt-5 px-4 pb-4;

			& .progress__wrapper {
				@apply absolute top-0 left-0 right-0 flex items-center gap-2 w-full transition-opacity duration-300 ease-out;

				&:not(.refreshing):hover {
					@apply -top-[0.40rem];

					& .progress__bar {
						@apply h-4;

						&::-webkit-slider-thumb {
							@apply bg-white;
						}
					}
				}

				&.refreshing {
					@apply opacity-50 pointer-events-none;
				}

				& .progress__bar {
					@apply range range-primary range-xs w-full h-1;

					&::-webkit-slider-thumb {
						@apply bg-[hsl(var(--p))] rounded-none opacity-100 transition ease-out;
					}
				}
			}

			& .info {
				@apply hidden sm:flex w-48;

				@media (hover: hover) {
					&:hover {
						& .artwork__overlay {
							@apply opacity-100;
						}
					}
				}

				& .info__wrapper {
					@apply flex gap-4 items-center;

					& .artwork {
						@apply relative w-14 aspect-square overflow-hidden rounded-sm;
					}

					& .wrapper {
						@apply flex flex-col text-sm;

						& strong {
							@apply truncate;
						}

						& .duration {
							@apply inline-block text-xs whitespace-nowrap text-gray-400;
						}
					}
				}
			}

			& .controls {
				@apply flex items-center w-full sm:w-fit sm:-translate-x-7;

				& .btn__prev,
				& .btn__next {
					@apply btn btn-ghost btn-sm;
				}

				& .btn__prev {
					@apply order-3 sm:order-2 ml-auto sm:ml-0;
				}
				& .btn__next {
					@apply order-5 sm:order-4 mr-auto sm:mr-0;
				}

				& .btn__play {
					@apply btn btn-circle btn-primary order-4 sm:order-3 mx-2;

					&.loading {
						@apply before:m-0;
					}
				}

				& .btn__repeat,
				& .btn__shuffle {
					@apply btn btn-ghost btn-sm;

					&.active {
						@apply text-primary text-shadow-glow shadow-primary;
					}
				}

				& .btn__shuffle {
					@apply order-1;
				}
				& .btn__repeat {
					@apply order-2 sm:order-5;
				}
			}

			& .right-controls {
				@apply flex items-center;

				& .btn__volume {
					@apply hidden sm:inline-flex btn btn-ghost btn-sm;
				}

				& .volume__wrapper {
					@apply relative z-50 h-[9.25rem] w-12 bg-base-100 border border-solid border-base-200;

					& .volume {
						@apply range range-primary range-xs absolute inset-0 w-28 h-4 -rotate-90 origin-center -translate-x-8 translate-y-16;

						&::-webkit-slider-thumb {
							@apply rounded-none bg-white;
						}
					}
				}

				& .btn__collapse {
					@apply btn btn-ghost btn-sm;
				}
			}
		}
	}

	#playlist {
		& .dropdown__trigger {
			@apply btn btn-ghost btn-sm;

			&.active {
				@apply text-primary text-shadow-glow shadow-primary;
			}
		}
	}

	#playlist__content {
		@apply z-30 left-0 sm:left-4 md:left-auto right-0 sm:right-4 -bottom-3 sm:bottom-3 card card-bordered md:w-96 h-96 overflow-y-auto -translate-y-24 bg-base-100/50 border-x-0 border-b-0 md:border border-white/10 shadow-md backdrop-blur-md scrollbar__theme;

		& .playlist__wrapper {
			@apply flex flex-col;

			& .track {
				@apply p-2 border-white/10 transition-colors ease-out;

				&:not(:last-child) {
					border-bottom-width: 1px;
				}

				@media (hover: hover) {
					&:hover {
						& .artwork__overlay {
							@apply opacity-100;
						}
					}
				}

				&.playing {
					@apply bg-primary/10;
				}

				& button {
					@apply flex gap-2 items-center w-full link link-hover;

					& .artwork {
						@apply relative w-12 aspect-square overflow-hidden rounded-sm;
					}

					& .wrapper {
						@apply flex flex-col text-sm text-left;
					}
				}
			}
		}
	}

	#miniplayer {
		@apply hidden md:block fixed z-40 right-0 md:right-8 bottom-20 p-px overflow-hidden rounded-sm bg-base-200 shadow-lg;

		&:hover {
			& .overlay {
				@apply opacity-100;
			}

			& .progress__bar {
				@apply opacity-0;
			}
		}

		& .artwork {
			@apply relative aspect-square overflow-hidden;
		}

		& .overlay {
			@apply absolute inset-0 grid place-items-center bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 ease-out;

			&.show {
				@apply opacity-100;
			}

			& .btn__bar {
				@apply btn btn-square btn-ghost grid place-items-center w-full h-full hover:bg-transparent hover:border-transparent;

				&::before {
					margin: 0 !important;
				}
			}
		}

		& .progress__bar {
			@apply absolute left-0 right-0 bottom-0 h-[2px] bg-primary transition-opacity duration-300 ease-out;
		}
	}

	.btn__player {
		@apply inline-flex md:hidden fixed z-40 right-0 md:right-8 bottom-24 btn rounded-l-full md:btn-circle btn-primary outline outline-black shadow-md lg:hover:before:text-primary-focus;

		&::before {
			content: '';
			@apply absolute -z-20 -top-4 w-9 h-8 opacity-0 text-primary bg-no-repeat transition-all duration-200 pointer-events-none select-none;

			--c: linear-gradient(currentColor 0 0);
			background: var(--c) 0% 100%, var(--c) 50% 100%, var(--c) 100% 100%;
			background-size: 7.2px 100%;
			background-repeat: no-repeat;
			animation: bars 1s infinite linear;
		}

		&.playing {
			@apply before:opacity-100;

			&.refreshing {
				@apply before:opacity-0;
			}
		}
	}

	.artwork__overlay {
		@apply absolute inset-0 grid place-items-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity ease-out;
	}

	@keyframes bars {
		20% {
			background-size: 7.2px 60%, 7.2px 100%, 7.2px 100%;
		}

		40% {
			background-size: 7.2px 80%, 7.2px 60%, 7.2px 100%;
		}

		60% {
			background-size: 7.2px 100%, 7.2px 80%, 7.2px 60%;
		}

		80% {
			background-size: 7.2px 100%, 7.2px 100%, 7.2px 80%;
		}
	}

	html.low__end {
		& #player {
			& .player__wrapper {
				@apply bg-base-100 backdrop-blur-none;
			}
		}

		& #playlist__content {
			@apply bg-black backdrop-blur-none;
		}
	}
</style>
