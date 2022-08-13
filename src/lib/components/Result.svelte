<script>
	import Button from './Button.svelte';

	export let result;
	export let removeResult = null;

	$: image = result.images[2]?.url;
</script>

<div class="result">
	<div>
		{#if image}
			<img width="100px" height="100px" src={image} alt={result.name} />
		{/if}

		<p>{result.name}</p>
	</div>

	<div class="button">
		<Button on:click={() => removeResult(result)}>
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
	}

	div {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.button {
		display: none;
		appearance: none;
		border: 0;
		background: 0;
		color: #fff;
		background: var(--neon-orange);

		align-items: center;
		padding: 1rem;
	}

	svg {
		height: 20px;
		width: 20px;
	}

	.result:hover .button {
		display: flex;
	}

	p {
		font-size: 4rem;
	}
</style>
