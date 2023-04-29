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
				<label class="input-group">
					<input
						class="input"
						type="email"
						name="email"
						id="email"
						placeholder={$LANG.post.newsletter.form.placeholder}
					/>
					<button class:loading type="submit">
						{#if loading}
							{$LANG.post.newsletter.form.loading}
						{:else}
							{$LANG.post.newsletter.form.subscribe}
						{/if}
					</button>
				</label>
			</div>
		</form>

		{#if showFeedback}
			<div class="alert" class:success class:error transition:fade={{ duration: 300 }}>
				<div>
					{#if success}
						<Icon icon="mail-check" />
						<span>{$LANG.post.newsletter.form.success}</span>
					{:else}
						<Icon icon="mail-x" />
						<span>{$LANG.post.newsletter.form.error}</span>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>

<style lang="scss" global>
	section#newsletter {
		@apply card card-bordered mb-16 bg-primary/5;

		&::before {
			content: '';
			@apply absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat blur-sm;
			background-image: var(--polygon-scatter);
		}

		& > .card-body {
			@apply max-w-2xl place-items-center text-center mx-auto;

			& > h2 {
				@apply text-4xl mb-4 font-futuristic text-shadow-rgb;
			}

			& > p {
				@apply text-lg mb-4;
			}

			& > form {
				@apply w-full md:w-auto;

				& > div.form-control {
					@apply w-full md:w-auto;

					& > label.input-group {
						@apply flex-col md:flex-row;

						& > input.input {
							@apply input-bordered md:w-80;
						}

						& > button {
							@apply btn btn-primary min-w-[10rem] rounded-t-none md:rounded-tr-box md:rounded-l-none;
						}
					}
				}
			}

			& > div.alert {
				&.success {
					@apply alert-success;
				}
				&.error {
					@apply alert-error;
				}
			}
		}
	}
</style>
