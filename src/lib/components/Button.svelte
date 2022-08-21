<script>
	export let type = '';
	export let big = false;
	export let disabled = false;
	export let handleClick = () => {};
</script>

<button on:click={handleClick} {disabled} class:big {type}> <slot /> </button>

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
		padding: 1rem 4rem;
		font-size: 4rem;
	}

	button:hover {
		background: var(--active);
		color: var(--background);
	}
</style>
