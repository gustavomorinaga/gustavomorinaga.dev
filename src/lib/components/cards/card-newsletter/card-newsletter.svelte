<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Icon } from '$lib/components';
	import { IMAGES_SVG } from '$lib/images';
	import { LANG } from '$lib/stores';
	import { getForm } from '$lib/utils';
	import { balancer } from 'svelte-action-balancer';

	export let loading = false;
	export let success = false;
	export let error = false;
	export let showFeedback = false;

	const handleSubmit = async (event: SubmitEvent) => {
		const { email } = getForm<{ email: string }>(event);
		if (!email) return;

		loading = true;

		const response = await fetch('/api/newsletter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, language: $LANG.code })
		});

		if (response.ok) {
			(event.target as HTMLFormElement).reset();
			success = true;
		} else error = true;

		loading = false;
		showFeedback = true;

		setTimeout(() => {
			showFeedback = false;
		}, 3000);
	};
</script>

<section id="newsletter" style="--polygon-scatter: url({IMAGES_SVG.bgPolygonScatter});">
	<div class="card-body">
		<h2>{$LANG.post.newsletter.title}</h2>

		<p use:balancer>
			{$LANG.post.newsletter.paragraph}
		</p>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-control">
				<label class="join join-vertical md:join-horizontal">
					<input
						class="input join-item"
						type="email"
						name="email"
						id="email"
						placeholder={$LANG.post.newsletter.form.placeholder}
					/>
					<button class="join-item" class:loading type="submit">
						{#if loading}
							{$LANG.post.newsletter.form.loading}
						{:else}
							{$LANG.post.newsletter.form.subscribe}
						{/if}
					</button>
				</label>
			</div>

			{#if showFeedback}
				<div class="alert" class:success class:error transition:fade|global={{ duration: 300 }}>
					<div>
						{#if success}
							<div>
								<strong>
									<Icon icon="mail-check" />
									{$LANG.post.newsletter.form.success.title}
								</strong>
								<p>{$LANG.post.newsletter.form.success.paragraph}</p>
							</div>
						{:else}
							<div>
								<strong>
									<Icon icon="mail-x" />
									{$LANG.post.newsletter.form.error.title}
								</strong>
								<p>{$LANG.post.newsletter.form.error.paragraph}</p>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</form>
	</div>
</section>

<style lang="scss" global>
	section#newsletter {
		@apply card card-bordered card-compact mb-16 bg-primary/5 md:card-normal;

		&::before {
			content: '';
			@apply absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat blur-sm;
			background-image: var(--polygon-scatter);
		}

		& > .card-body {
			@apply mx-auto max-w-2xl place-items-center text-center;

			& > h2 {
				@apply mb-4 font-futuristic text-xl text-shadow-rgb md:text-4xl;
			}

			& > p {
				@apply mb-4 text-base md:text-lg;
			}

			& > form {
				@apply w-full md:max-w-lg;

				& > div.form-control {
					@apply w-full md:w-auto;

					& > label.join {
						@apply flex-col md:flex-row;

						& > input.input {
							@apply input-bordered w-full;
						}

						& > button {
							@apply btn btn-primary min-w-[10rem] rounded-t-none md:rounded-tr-box md:rounded-l-none;
						}
					}
				}

				& > div.alert {
					@apply mt-4 text-left;

					&.success {
						@apply alert-success;
					}
					&.error {
						@apply alert-error;
					}

					& strong {
						@apply flex items-center gap-1;
					}
				}
			}
		}
	}
</style>
