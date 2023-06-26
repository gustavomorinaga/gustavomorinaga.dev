<script lang="ts">
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
</script>

<div class="spinner {size}">
	<div />
	<div />
	<div />
	<div />
	<div />
	<div />
</div>

<style lang="scss">
	$sizes: (
		'xs': 6,
		'sm': 10,
		'md': 14,
		'lg': 20,
		'xl': 24
	);

	.spinner {
		--half-size: 0;
		--border-size: 0;

		@apply relative;
		animation: spinner-cube 2s infinite ease;
		transform-style: preserve-3d;

		@each $size, $value in $sizes {
			&.#{$size} {
				@apply w-#{$value} h-#{$value};
				--half-size: #{calc(($value * 4) / 2)}px;
				--borders-size: #{calc((($value * 4) / 2) * 0.1)}px;
			}
		}

		& > div {
			@apply absolute h-full w-full border-solid border-primary bg-primary/20;
			border-width: var(--borders-size);

			&:nth-of-type(1) {
				transform: translateZ(calc(0px - var(--half-size))) rotateY(180deg);
			}
			&:nth-of-type(2) {
				transform: rotateY(-270deg) translateX(50%);
				transform-origin: top right;
			}
			&:nth-of-type(3) {
				transform: rotateY(270deg) translateX(-50%);
				transform-origin: center left;
			}
			&:nth-of-type(4) {
				transform: rotateX(90deg) translateY(-50%);
				transform-origin: top center;
			}
			&:nth-of-type(5) {
				transform: rotateX(-90deg) translateY(50%);
				transform-origin: bottom center;
			}
			&:nth-of-type(6) {
				transform: translateZ(var(--half-size));
			}
		}
	}

	@keyframes spinner-cube {
		0% {
			transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
		}

		50% {
			transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
		}

		100% {
			transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
		}
	}
</style>
