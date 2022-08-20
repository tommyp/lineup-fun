<script>
	export let type = '';
	export let big = false;
	export let disabled = false;
	export let handleClick = () => {};
</script>

<button on:click={handleClick} {disabled} class:big {type}> <slot /> </button>

<style>
	button {
		background: var(--highlight);

		color: #fff;

		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		text-decoration: none;
		outline: none;
		border: none;
		cursor: pointer;
		font-family: 'Commune_Nuit_Debout';
	}

	button:disabled {
		background-color: #ddd;
	}

	.big {
		padding: 1rem 4rem;
		font-size: 4rem;
	}

	button:hover {
		background: var(--active);
		color: var(--background);
	}
</style>
