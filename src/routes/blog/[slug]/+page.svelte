<script lang="ts">
	import '$lib/styles/prism.scss';

	export let data;
	const { post } = data;
</script>

<section class="content">
	{@html post.content}
</section>

<style lang="scss" global>
	section.content {
		@apply md:col-span-8 md:pr-4 pb-16 md:border-r md:border-base-200;

		@for $i from 1 through 6 {
			& > h#{$i} {
				@apply text-primary font-bold mb-4;

				& > a.heading-link {
					@apply font-normal no-underline -ml-7 mr-2 opacity-0 transition duration-300 ease-out;
				}

				@media (hover: hover) {
					&:hover {
						& > a.heading-link {
							@apply opacity-50 hover:opacity-100;
						}
					}
				}
			}
		}

		& > h2 {
			@apply text-2xl md:text-3xl mt-12 mb-4;
		}

		& > h3 {
			@apply text-xl md:text-2xl mt-8;
		}

		& > h4 {
			@apply text-lg md:text-xl mt-8;
		}

		& > h5 {
			@apply text-base md:text-lg mt-8;
		}

		& > h6 {
			@apply text-base mt-8;
		}

		& p {
			@apply md:text-lg;
		}

		p:not(:last-child),
		dl:not(:last-child),
		ol:not(:last-child),
		ul:not(:last-child),
		blockquote:not(:last-child),
		pre:not(:last-child),
		table:not(:last-child),
		img:not(:last-child) {
			@apply mb-8;
		}

		& a {
			@apply link-primary link-hover;
		}

		& > ul {
			@apply list-disc;

			&,
			& > ul,
			& > ul > ul {
				@apply list-inside marker:text-primary mb-8;
			}

			& > ul {
				list-style-type: circle;

				& > ul {
					list-style-type: square;
				}
			}
		}

		& > ol {
			@apply list-decimal;

			&,
			& > ol,
			& > ol > ol {
				@apply list-inside marker:text-primary mb-8;
			}

			& > ol {
				list-style-type: lower-alpha;

				& > ol {
					list-style-type: lower-roman;
				}
			}
		}

		& li {
			@apply md:text-lg;
		}

		& li + li {
			@apply mt-2;
		}

		& > blockquote {
			@apply block p-4 md:p-8 mb-8 rounded-box bg-base-100/75 border-l-4 border-primary;

			& > p {
				@apply block;
			}
		}

		& dd {
			@apply ml-8;
		}

		& kbd {
			@apply kbd-sm;
		}

		& figure {
			@apply text-center mx-auto;

			&:not(:first-child) {
				@apply mt-8;
			}
			&:not(:last-child) {
				@apply mb-8;
			}

			& > img {
				@apply inline-block;
			}

			& > figcaption {
				@apply italic;
			}
		}

		img,
		video {
			@apply card-bordered rounded-box mx-auto;
		}

		sup,
		sub {
			@apply text-sm;
		}

		& table {
			@apply table-auto w-full text-left border-collapse card-bordered rounded-box;

			& > thead {
				@apply bg-base-200/75;

				& > tr {
					@apply border-b border-base-200;

					& > th {
						@apply px-4 py-2;
					}
				}
			}

			& > tbody {
				& > tr {
					@apply odd:bg-base-100/75 even:bg-base-100/50;

					& > td {
						@apply px-4 py-2;
					}
				}
			}
		}

		& code:not([class]) {
			@apply inline px-1 rounded-box card-bordered bg-base-200/75 text-sm md:text-base text-primary;
		}

		& .file-title {
			@apply py-2 px-4 text-sm md:text-base font-bold text-base-content bg-base-200/75 rounded-t-box card-bordered;
			margin-bottom: 0 !important;

			& + pre {
				@apply mt-0 rounded-t-none border-t-0;
			}
		}
	}
</style>
