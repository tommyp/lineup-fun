<script>
	export let htmlFor = '';
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label for={htmlFor}>
	<slot />
</label>

<style>
	label {
		font-size: 4em;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	@media screen and (min-width: 576px) {
		label {
			font-size: 5rem;
		}
	}
</style>
