<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
	import { tweened } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { Dropdown, Icon } from '$lib/components';
	import { ACHIEVEMENTS, LANG } from '$lib/stores';
	import { containerElement, durationFormatter, getMinDiff, HOST } from '$lib/utils';
	import Portal from 'svelte-portal';
	import type { IPlaylistTrack } from '$lib/ts';

	export let playlist: IPlaylistTrack[] = [];

	const MAX_IDLE_MINUTES = 3;
	const INITIAL_STATE = {
		showPlayer: false,
		currentTrack: playlist.at(0) as IPlaylistTrack,
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
	$: displayedDuration = durationFormatter({ lang: $LANG.code, date: new Date(duration * 1000) });
	$: displayedCurrentTime = durationFormatter({
		lang: $LANG.code,
		date: new Date(currentTime * 1000)
	});
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
			handleSongAchievement();
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
		if (ACHIEVEMENTS.unlocked('GMD_SONG')) return;

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
			in:fly|global={{ duration: 1000, y: 100, easing: expoOut }}
			out:fly|global={{ duration: 1000, y: 100, easing: expoOut }}
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
					<div class="dropdown-hover dropdown dropdown-top">
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
		<div
			id="miniplayer"
			in:fade|global={{ duration: 300, easing: cubicOut }}
			out:fade|global={{ duration: 100 }}
		>
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
			in:fade|global={{ duration: 300, easing: cubicOut }}
			out:fade|global={{ duration: 100 }}
		>
			<Icon icon="music" />
		</button>
	{/if}
</Portal>

<style lang="scss" global>
	#player {
		@apply fixed bottom-0 left-0 right-0 z-40 bg-base-100/75 shadow-lg backdrop-blur-md backdrop-saturate-200;

		& .player__wrapper {
			@apply flex items-center justify-between px-4 pb-4 pt-5 sm:gap-2;

			& .progress__wrapper {
				@apply absolute left-0 right-0 top-0 flex w-full items-center gap-2 transition-opacity duration-300 ease-out;

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
					@apply pointer-events-none opacity-50;
				}

				& .progress__bar {
					@apply range range-primary range-xs h-1 w-full;

					&::-webkit-slider-thumb {
						@apply rounded-none bg-[hsl(var(--p))] opacity-100 transition ease-out;
					}
				}
			}

			& .info {
				@apply hidden w-48 sm:flex;

				@media (hover: hover) {
					&:hover {
						& .artwork__overlay {
							@apply opacity-100;
						}
					}
				}

				& .info__wrapper {
					@apply flex items-center gap-4;

					& .artwork {
						@apply rounded-box relative aspect-square w-14 overflow-hidden;
					}

					& .wrapper {
						@apply flex flex-col text-sm;

						& strong {
							@apply truncate;
						}

						& .duration {
							@apply inline-block whitespace-nowrap text-xs tabular-nums text-gray-400;
						}
					}
				}
			}

			& .controls {
				@apply flex w-full items-center sm:w-fit sm:-translate-x-7;

				& .btn__prev,
				& .btn__next {
					@apply btn btn-ghost btn-sm;
				}

				& .btn__prev {
					@apply order-3 ml-auto sm:order-2 sm:ml-0;
				}
				& .btn__next {
					@apply order-5 mr-auto sm:order-4 sm:mr-0;
				}

				& .btn__play {
					@apply btn btn-circle btn-primary order-4 mx-2 sm:order-3;

					&.loading {
						@apply before:m-0;
					}
				}

				& .btn__repeat,
				& .btn__shuffle {
					@apply btn btn-ghost btn-sm;

					&.active {
						@apply text-primary shadow-primary text-shadow-glow;
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
					@apply btn btn-ghost btn-sm hidden sm:inline-flex;
				}

				& .volume__wrapper {
					@apply relative z-50 h-[9.25rem] w-12 border border-solid border-base-200 bg-base-100;

					& .volume {
						@apply range range-primary range-xs absolute inset-0 h-4 w-28 origin-center -translate-x-8 translate-y-16 -rotate-90;

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
				@apply text-primary shadow-primary text-shadow-glow;
			}
		}
	}

	#playlist__content {
		@apply card card-bordered scrollbar__theme -bottom-3 left-0 right-0 z-30 h-96 -translate-y-24 overflow-y-auto border-x-0 border-b-0 border-white/10 bg-base-100/75 shadow-md backdrop-blur-md backdrop-saturate-200 sm:bottom-3 sm:left-4 sm:right-4 md:left-auto md:w-96 md:border;

		& .playlist__wrapper {
			@apply flex flex-col;

			& .track {
				@apply border-white/10 p-2 transition-colors ease-out;

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
					@apply link-hover link flex w-full items-center gap-2;

					& .artwork {
						@apply rounded-box relative aspect-square w-12 overflow-hidden;
					}

					& .wrapper {
						@apply flex flex-col text-left text-sm;
					}
				}
			}
		}
	}

	#miniplayer {
		@apply rounded-box fixed bottom-20 right-0 z-40 hidden overflow-hidden bg-base-200 p-px shadow-lg md:right-8 md:block;

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
			@apply absolute inset-0 grid place-items-center bg-black/50 opacity-0 backdrop-blur-sm backdrop-saturate-150 transition-opacity duration-300 ease-out;

			&.show {
				@apply opacity-100;
			}

			& .btn__bar {
				@apply btn btn-square btn-ghost grid h-full w-full place-items-center hover:border-transparent hover:bg-transparent;

				&::before {
					margin: 0 !important;
				}
			}
		}

		& .progress__bar {
			@apply absolute bottom-0 left-0 right-0 h-[2px] bg-primary transition-opacity duration-300 ease-out;
		}
	}

	.btn__player {
		@apply btn btn-primary btn-sm fixed bottom-24 right-0 z-40 inline-flex rounded-l-full shadow-md outline outline-black md:btn-circle md:right-8 md:hidden lg:hover:before:text-primary-focus;

		&::before {
			content: '';
			@apply pointer-events-none absolute -top-4 -z-20 h-8 w-9 select-none bg-no-repeat text-primary opacity-0 transition-all duration-200;

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
		@apply absolute inset-0 grid place-items-center bg-black/50 opacity-0 backdrop-blur-sm backdrop-saturate-150 transition-opacity ease-out;
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
				@apply bg-base-100 backdrop-blur-none backdrop-saturate-0;
			}
		}

		& #playlist__content {
			@apply bg-black backdrop-blur-none backdrop-saturate-0;
		}
	}
</style>
