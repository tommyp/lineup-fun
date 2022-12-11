<script>
	export let name;
	export let placeholder;
	export let required = false;
	export let value;
</script>

<textarea {name} {required} {placeholder} bind:value />

<style>
	textarea {
		font-family: 'Commune_Nuit_Debout';
		font-size: 4rem;
		background: none;
		border: 2px solid var(--highlight);
		transition: border-color 0.2s ease-in-out;
		padding: 0.25rem;
		flex-grow: 1;
		display: flex;
	}

	textarea:focus {
		border-color: var(--active);
	}

	@media screen and (min-width: 576px) {
		textarea {
			font-size: 5rem;
		}
	}
</style>
