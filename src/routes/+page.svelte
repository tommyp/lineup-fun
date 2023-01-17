<script>
	import Footer from '$lib/components/Footer.svelte';
	import LoginButton from '$lib/components/LoginButton.svelte';

	export let data;

	$: uuid = data.uuid;
</script>

<div class="container">
	<div class="hero">
		<h1>lineup.fun</h1>
		<h2>a spotify playlist generator</h2>
		<LoginButton {uuid} />
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

	h1 {
		font-size: 10rem;
		letter-spacing: 0;
		font-weight: bold;
	}

	h2 {
		font-size: 4rem;
		letter-spacing: 0;
	}
	@media (min-width: 576px) {
		h1 {
			font-size: 20rem;
		}
		h2 {
			line-height: auto;
			margin-bottom: 1rem;
			font-size: 10rem;
		}
	}
</style>
