<script>
	import Button from './Button.svelte';

	export let query;
</script>

<div class="result notFound">
	<div>
		<p>{query}</p>
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

	p {
		font-size: 4rem;
	}

	.notFound {
		color: #aaa;
	}
</style>
