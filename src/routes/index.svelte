<script>
	import { browser } from '$app/env';
	import Footer from '$lib/components/Footer.svelte';
	import LoginButton from '$lib/components/LoginButton.svelte';
</script>

<div class="container">
	<div class="hero">
		<h1>lineup.fun</h1>
		<h2>a spotify playlist generator</h2>
		<LoginButton />
	</div>
	<Footer />
</div>

<style>
	h2 {
		line-height: 0.9;
		margin-bottom: 0rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
		padding-bottom: 2rem;
	}
	@media (min-width: 576px) {
		h2 {
			line-height: auto;
			margin-bottom: 1rem;
		}
	}
</style>
