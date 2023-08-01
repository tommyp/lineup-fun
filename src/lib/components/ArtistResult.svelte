<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import Button from './Button.svelte';

	export let result;

	const removeResult = () => {
		dispatch('removeResult', { result });
	};

	$: image = result.images[2]?.url;
</script>

<div class="result">
	<div class="artist">
		{#if image}
			<img src={image} alt={result.name} />
		{/if}
		<div class="text">
			<h2>{result.name}</h2>
			<p>{result.genres.slice(0, 2).join(', ')}</p>
		</div>
	</div>

	<div class="button">
		<Button handleClick={removeResult} square={true}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</Button>
	</div>
</div>

<style>
	.result {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
		min-height: 100px;
		position: relative;
	}

	.artist {
		display: flex;
		gap: 1rem;
	}

	.button {
		display: none;
		appearance: none;
		border: 0;
		background: 0;
		position: absolute;
		right: 20px;

		align-items: center;
	}

	svg {
		height: 20px;
		width: 20px;
	}

	.result:hover .button {
		display: flex;
	}

	h2 {
		font-size: 4rem;
	}

	p {
		line-height: 0.75;
		font-size: 2.5rem;
	}

	img {
		width: 75px;
		height: 75px;
	}

	@media (min-width: 576px) {
		img {
			width: 100px;
			height: 100px;
		}
	}
</style>
