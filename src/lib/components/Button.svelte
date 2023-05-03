<script>
	export let type = '';
	export let big = false;
	export let square = false;
	export let disabled = false;
	export let handleClick = () => {};
	export let altText = '';
</script>

<button on:click={handleClick} aria-label={altText} {disabled} class:big class:square {type}>
	<slot />
</button>

<style>
	button {
		align-items: center;
		background: var(--highlight);
		border: none;
		color: #fff;
		cursor: pointer;
		display: flex;
		font-family: 'Commune_Nuit_Debout';
		justify-content: center;
		outline: none;
		transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
		text-decoration: none;
		width: 100%;
	}

	button:disabled {
		background-color: #ddd;
	}

	.big {
		font-size: 3rem;
	}

	.square {
		padding: 2rem;
	}

	button:hover {
		background: var(--active);
		color: var(--background);
	}

	@media screen and (min-width: 576px) {
		.big {
			padding: 1rem 4rem;
			font-size: 4rem;
		}
	}
</style>
