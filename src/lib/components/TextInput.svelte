<script>
	export let name;
	export let placeholder;
	export let required = false;
	export let value;
</script>

<input {name} type="text" autoComplete="off" {required} {placeholder} bind:value />

<style>
	input {
		font-family: 'Commune_Nuit_Debout';
		font-size: 4rem;
		background: none;
		border: 2px solid var(--highlight);
		transition: border-color 0.2s ease-in-out;
		padding: 0.25rem;
	}

	input:focus {
		border-color: var(--active);
	}

	@media screen and (min-width: 576px) {
		input {
			font-size: 5rem;
		}
	}
</style>
