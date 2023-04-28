<script lang="ts">
	import { IMAGES_SVG } from '$lib/images';
	import { LANG } from '$lib/stores';
	import { balancer } from 'svelte-action-balancer';
</script>

<section id="newsletter" style="--polygon-scatter: url({IMAGES_SVG.bgPolygonScatter});">
	<div class="card-body">
		<h2>{$LANG.post.newsletter.title}</h2>

		<p use:balancer>
			{$LANG.post.newsletter.paragraph}
		</p>

		<div class="form-control">
			<label class="input-group">
				<input
					class="input"
					type="text"
					name="term"
					id="term"
					placeholder={$LANG.post.newsletter.form.placeholder}
				/>

				<button>{$LANG.post.newsletter.form.subscribe}</button>
			</label>
		</div>
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
			@apply place-items-center text-center;

			& > h2 {
				@apply text-4xl mb-4 font-futuristic text-shadow-rgb;
			}

			& > p {
				@apply text-lg mb-4;
			}

			& > div.form-control {
				@apply w-full md:w-auto;

				& > label.input-group {
					@apply flex-col md:flex-row;

					& > input.input {
						@apply input-bordered md:w-80;
					}

					& > button {
						@apply btn btn-primary rounded-t-none md:rounded-tr-box md:rounded-l-none;
					}
				}
			}
		}
	}
</style>
