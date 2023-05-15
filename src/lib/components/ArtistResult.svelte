<script>
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	export let results;
	export let dropdownOpen = false;

	let selectedResultIndex = 0;
	$: selectedResult = results[selectedResultIndex];

	let index;

	const removeResult = () => {
		dispatch('removeResult', { index });
	};

	const openResults = () => {
		dispatch('openResults', { index });
	};

	$: selectedImage = selectedResult.images[2]?.url;
</script>

<div class="result">
	<div class="selected-result">
		<div class="artist">
			{#if selectedImage}
				<img src={selectedImage} alt={selectedResult.name} />
			{/if}
			<div class="text">
				<h2>{selectedResult.name}</h2>
				<p>{selectedResult.genres.slice(0, 2).join(', ')}</p>
			</div>
		</div>

		<div class="buttons">
			<Button handleClick={() => (dropdownOpen = !dropdownOpen)} square>
				{#if dropdownOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
					</svg>
				{/if}
			</Button>

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
	{#if dropdownOpen}
		<div class="dropdown">
			{#each results as result, i}
				<div class="result">
					<div class="artist">
						<img src={result.images[2]?.url} alt={result.name} />

						<div class="text">
							<h2>{result.name}</h2>
							<p>{result.genres.slice(0, 2).join(', ')}</p>
						</div>
					</div>
					<div class="buttons">
						<Button handleClick={removeResult} square={true}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</Button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.selected-result {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
		min-height: 100px;
		position: relative;
		width: 100%;
	}

	.artist {
		display: flex;
		gap: 1rem;
	}

	.buttons {
		display: flex;
		appearance: none;
		border: 0;
		background: 0;
		gap: 0.5rem;
		align-items: center;
	}

	.dropdown .result {
		display: flex;
		justify-content: space-between;
	}

	svg {
		height: 20px;
		width: 20px;
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
